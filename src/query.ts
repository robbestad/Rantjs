import type { QueryNode } from "./ast.ts";
import type { Dictionary, Entry, Table } from "./dictionary/types.ts";
import type { Rng } from "./rng.ts";

export interface QueryContext {
  dictionary: Dictionary;
  rng: Rng;
  nsfw: boolean;
  carriers: Map<string, string>;
}

const QUERY_ALIASES: Record<string, string> = {
  name: "firstname",
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

export function resolveQuery(query: QueryNode, ctx: QueryContext): string {
  if (query.carrier && ctx.carriers.has(query.carrier)) {
    return ctx.carriers.get(query.carrier)!;
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
  if (!wantNsfw) {
    entries = entries.filter((e) => !e.classes.includes("nsfw"));
  }
  for (const cls of classes) {
    if (cls === "nsfw") continue;
    entries = entries.filter((e) => matchesClass(e, cls));
  }

  if (entries.length === 0) return `<${query.raw}>`;

  const entry = ctx.rng.pick(entries);
  const value = formOf(entry, formIndex);
  if (query.carrier) ctx.carriers.set(query.carrier, value);
  return value;
}
