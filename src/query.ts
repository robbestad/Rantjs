import type { QueryNode } from "./ast.ts";
import type { Dictionary, Entry, Table } from "./dictionary/types.ts";
import type { Rng } from "./rng.ts";

export interface QueryRuntime {
  dictionary: Dictionary;
  rng: Rng;
  nsfw: boolean;
  matchCarriers: Map<string, { value: string; classes: string[]; pron?: string }>;
  uniqueCarriers: Map<string, Set<string>>;
  rhymeMode: string;
}

const QUERY_ALIASES: Record<string, string> = {
  name: "firstname",
  pro: "pron",
  with: "preposition",
};

function tableOf(dictionary: Dictionary, name: string): Table | undefined {
  if (!name) return undefined;
  const mapped = QUERY_ALIASES[name] ?? name;
  const direct = dictionary.tables[mapped] ?? dictionary.tables[name];
  if (direct) return direct;
  const lower = mapped.toLowerCase();
  for (const [key, table] of Object.entries(dictionary.tables)) {
    if (key.toLowerCase() === lower) return table;
  }
  return undefined;
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

function rhymeKey(pron: string | undefined): string | undefined {
  if (!pron) return undefined;
  const i = pron.indexOf('"');
  const tail = (i >= 0 ? pron.slice(i) : pron).toLowerCase().replace(/[^a-z]/g, "");
  return tail || undefined;
}

export function resolveQuery(query: QueryNode, ctx: QueryRuntime): string {
  if (query.carrier && query.carrierKind !== "unique" && query.carrierKind !== "rhyme") {
    const hit = ctx.matchCarriers.get(query.carrier);
    if (hit) return hit.value;
  }
  if (query.carrier && !query.table && query.carrierKind !== "unique") {
    return ctx.matchCarriers.get(query.carrier)?.value ?? "";
  }

  if (!query.table) {
    return query.carrier ? "" : `<${query.raw}>`;
  }

  const table = tableOf(ctx.dictionary, query.table);
  if (!table) return `<${query.raw}>`;

  let formIndex = 0;
  const classes: string[] = [];
  for (const arg of query.args) {
    const subIdx = table.subs.findIndex((s) => s === arg);
    if (subIdx >= 0) formIndex = subIdx;
    else classes.push(arg);
  }

  const wantNsfw = ctx.nsfw || classes.includes("nsfw");
  let entries = table.entries;
  if (!wantNsfw) entries = entries.filter((e) => !e.classes.includes("nsfw"));
  for (const cls of classes) {
    if (cls === "nsfw") continue;
    entries = entries.filter((e) => matchesClass(e, cls));
  }
  for (const cls of query.exclude) {
    entries = entries.filter((e) => !matchesClass(e, cls));
  }

  if (query.carrier && query.carrierKind === "unique") {
    const used = ctx.uniqueCarriers.get(query.carrier) ?? new Set();
    entries = entries.filter((e) => !used.has(formOf(e, formIndex)));
  }

  if (query.carrier && query.carrierKind === "rhyme") {
    const prev = ctx.matchCarriers.get(query.carrier);
    if (prev?.pron) {
      const want = rhymeKey(prev.pron);
      entries = entries.filter((e) => rhymeKey(e.pron?.[formIndex] ?? e.pron?.[0]) === want);
    }
  }

  if (entries.length === 0) return `<${query.raw}>`;

  const entry = ctx.rng.pick(entries);
  const value = formOf(entry, formIndex);
  const pron = entry.pron?.[formIndex] ?? entry.pron?.[0];

  if (query.carrier) {
    if (query.carrierKind === "unique") {
      const used = ctx.uniqueCarriers.get(query.carrier) ?? new Set();
      used.add(value);
      ctx.uniqueCarriers.set(query.carrier, used);
    } else {
      ctx.matchCarriers.set(query.carrier, { value, classes: entry.classes, pron });
    }
  }
  return value;
}
