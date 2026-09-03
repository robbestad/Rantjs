import { resolveTableName } from "./aliases.ts";
import { buildTableIndex } from "./dictionary/index-table.ts";
import type { Entry, Table } from "./dictionary/types.ts";
import type { QueryNode } from "./ast.ts";
import type { QueryPick } from "./runtime.ts";
import type { Rng } from "./rng.ts";

export interface QueryRuntime {
  dictionary: { tables: Record<string, Table> };
  rng: Rng;
  nsfw: boolean;
  matchCarriers: Map<string, string>;
  uniqueCarriers: Map<string, Set<string>>;
  trace: QueryPick[] | null;
}

function tableOf(
  dictionary: QueryRuntime["dictionary"],
  name: string,
): Table | undefined {
  if (!name) return undefined;
  const mapped = resolveTableName(name);
  return dictionary.tables[mapped] ?? dictionary.tables[name];
}

function matchesClass(entry: Entry, cls: string): boolean {
  const classes = entry.classes;
  if (classes.includes(cls)) return true;
  if (cls === "male" && classes.includes("male?")) return true;
  if (cls === "female" && classes.includes("female?")) return true;
  if (cls === "neutral") {
    return (
      classes.includes("neutral") ||
      (classes.includes("male?") && classes.includes("female?"))
    );
  }
  return false;
}

function formOf(entry: Entry, index: number): string {
  if (entry.forms.length === 0) return "";
  return entry.forms[index] ?? entry.forms[0] ?? "";
}

function intersectSorted(a: number[], b: number[]): number[] {
  const out: number[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    const av = a[i]!;
    const bv = b[j]!;
    if (av === bv) {
      out.push(av);
      i += 1;
      j += 1;
    } else if (av < bv) i += 1;
    else j += 1;
  }
  return out;
}

function indexOf(table: Table): { byClass: Record<string, number[]>; hasNsfw: boolean } {
  if (table.byClass && table.hasNsfw !== undefined) {
    return { byClass: table.byClass, hasNsfw: table.hasNsfw };
  }
  return buildTableIndex(table.entries);
}

function selectEntries(
  table: Table,
  classes: string[],
  exclude: string[],
  nsfw: boolean,
): Entry[] {
  const { byClass, hasNsfw } = indexOf(table);
  const wantNsfw = nsfw || classes.includes("nsfw");
  let idxs: number[] | undefined;

  for (const cls of classes) {
    if (cls === "nsfw") continue;
    const bucket = byClass[cls];
    if (!bucket || bucket.length === 0) return [];
    idxs = idxs ? intersectSorted(idxs, bucket) : bucket;
  }

  let list: Entry[];
  if (idxs) list = idxs.map((i) => table.entries[i]!);
  else list = table.entries;

  if (hasNsfw && !wantNsfw) {
    list = list.filter((e) => !e.classes.includes("nsfw"));
  }
  for (const cls of exclude) {
    list = list.filter((e) => !matchesClass(e, cls));
  }
  return list;
}

export function resolveQuery(query: QueryNode, ctx: QueryRuntime): string {
  if (query.carrier && query.carrierKind !== "unique") {
    const hit = ctx.matchCarriers.get(query.carrier);
    if (hit) return hit;
  }
  if (query.carrier && !query.table && query.carrierKind !== "unique") {
    return ctx.matchCarriers.get(query.carrier) ?? "";
  }

  if (!query.table) {
    return query.carrier ? "" : `<${query.raw}>`;
  }

  const table = tableOf(ctx.dictionary, query.table);
  if (!table) return `<${query.raw}>`;

  let formIndex = 0;
  const classes: string[] = [];
  for (const arg of query.args) {
    const subIdx = table.subs.indexOf(arg);
    if (subIdx >= 0) formIndex = subIdx;
    else classes.push(arg);
  }

  let entries = selectEntries(table, classes, query.exclude, ctx.nsfw);

  if (query.carrier && query.carrierKind === "unique") {
    const used = ctx.uniqueCarriers.get(query.carrier) ?? new Set();
    entries = entries.filter((e) => !used.has(formOf(e, formIndex)));
  }

  if (entries.length === 0) return `<${query.raw}>`;

  const entry = ctx.rng.pick(entries);
  const value = formOf(entry, formIndex);

  if (query.carrier) {
    if (query.carrierKind === "unique") {
      const used = ctx.uniqueCarriers.get(query.carrier) ?? new Set();
      used.add(value);
      ctx.uniqueCarriers.set(query.carrier, used);
    } else {
      ctx.matchCarriers.set(query.carrier, value);
    }
  }

  if (ctx.trace) {
    ctx.trace.push({
      table: table.name,
      args: query.args,
      value,
      carrier: query.carrier,
    });
  }

  return value;
}
