export interface Entry {
  forms: string[];
  classes: string[];
}

export interface Table {
  name: string;
  subs: string[];
  entries: Entry[];
}

export interface Dictionary {
  tables: Record<string, Table>;
}

export interface LegacyTable {
  all?: string[];
  subs?: string[];
  filters?: string[];
  [className: string]: unknown;
}

export interface LegacyDictionary {
  tokens?: string[];
  [table: string]: unknown;
}

export function isLegacyDictionary(value: unknown): value is LegacyDictionary {
  if (!value || typeof value !== "object") return false;
  const rec = value as Record<string, unknown>;
  if ("tables" in rec && rec.tables && typeof rec.tables === "object") return false;
  return Array.isArray(rec.tokens) || Object.values(rec).some(
    (v) => v && typeof v === "object" && !Array.isArray(v) && "all" in (v as object),
  );
}

export function fromLegacy(legacy: LegacyDictionary): Dictionary {
  const tables: Record<string, Table> = {};
  const names = Array.isArray(legacy.tokens)
    ? legacy.tokens.filter((t): t is string => typeof t === "string")
    : Object.keys(legacy).filter((k) => k !== "tokens");

  for (const name of names) {
    const raw = legacy[name];
    if (!raw || typeof raw !== "object") continue;
    const table = raw as LegacyTable;
    const subs = Array.isArray(table.subs) ? table.subs.map(String) : ["default"];
    const classNames = Array.isArray(table.filters)
      ? table.filters.map(String)
      : Object.keys(table).filter((k) => k !== "all" && k !== "subs" && k !== "filters");
    const seen = new Set<string>();
    const entries: Entry[] = [];

    const addWords = (words: unknown, extra: string[]) => {
      if (!Array.isArray(words)) return;
      for (const word of words) {
        if (typeof word !== "string") continue;
        const key = `${word}::${extra.join(",")}`;
        if (seen.has(key)) continue;
        seen.add(key);
        entries.push({
          forms: word.split("/"),
          classes: extra,
        });
      }
    };

    for (const cls of classNames) {
      addWords(table[cls], [cls]);
    }
    addWords(table.all, []);
    tables[name] = { name, subs, entries };
  }
  return { tables };
}

export function isDictionary(value: unknown): value is Dictionary {
  return Boolean(
    value &&
      typeof value === "object" &&
      "tables" in value &&
      (value as Dictionary).tables &&
      typeof (value as Dictionary).tables === "object",
  );
}
