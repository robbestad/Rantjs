import { buildTableIndex } from "./index-table.ts";

export interface Entry {
  forms: string[];
  classes: string[];
}

export interface Table {
  name: string;
  subs: string[];
  entries: Entry[];
  byClass?: Record<string, number[]>;
  hasNsfw?: boolean;
}

export interface Dictionary {
  tables: Record<string, Table>;
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

export function indexDictionary(dict: Dictionary): Dictionary {
  let changed = false;
  const tables: Record<string, Table> = {};
  for (const [key, table] of Object.entries(dict.tables)) {
    if (table.byClass && table.hasNsfw !== undefined) {
      tables[key] = table;
      continue;
    }
    changed = true;
    const { byClass, hasNsfw } = buildTableIndex(table.entries);
    tables[key] = { ...table, byClass, hasNsfw };
  }
  return changed ? { tables } : dict;
}
