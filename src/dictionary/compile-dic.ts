import type { Dictionary, Entry, Table } from "./types.ts";

const NAME_ALIASES: Record<string, string> = {
  name: "firstname",
  with: "preposition",
};

export interface CompileOptions {
  aliases?: Record<string, string>;
}

function normalizeClass(name: string): string {
  return name.trim().toLowerCase();
}

function isDirective(line: string): boolean {
  return line.startsWith("#");
}

export function compileDic(source: string, fallbackName = "unknown"): Table {
  const lines = source.split(/\r?\n/);
  let name = fallbackName;
  let subs: string[] = ["default"];
  const classStack: string[] = [];
  const entries: Entry[] = [];
  let lastEntry: Entry | undefined;

  const activeClasses = (): string[] => {
    const out: string[] = [];
    const seen = new Set<string>();
    for (const c of classStack) {
      const n = c.toLowerCase();
      if (seen.has(n)) continue;
      seen.add(n);
      out.push(n);
    }
    return out;
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/^\s+/, "").replace(/\s+$/, "");
    if (!line) continue;

    if (isDirective(line)) {
      const body = line.slice(1).trim();
      const [cmd, ...rest] = body.split(/\s+/);
      const arg = rest.join(" ");
      switch ((cmd ?? "").toLowerCase()) {
        case "version":
          break;
        case "name":
          name = (arg || fallbackName).trim();
          break;
        case "subs":
          subs = rest.length ? rest : arg.split(/\s+/).filter(Boolean);
          if (subs.length === 0) subs = ["default"];
          break;
        case "class": {
          const op = rest[0]?.toLowerCase();
          const className = rest.slice(1).join(" ");
          if (!className) break;
          if (op === "add") classStack.push(className);
          else if (op === "remove") {
            const idx = classStack.lastIndexOf(className);
            if (idx >= 0) classStack.splice(idx, 1);
          }
          break;
        }
        case "nsfw":
          classStack.push("nsfw");
          break;
        case "sfw": {
          const idx = classStack.lastIndexOf("nsfw");
          if (idx >= 0) classStack.splice(idx, 1);
          break;
        }
        default:
          break;
      }
      continue;
    }

    if (line.startsWith(">")) {
      const word = line.replace(/^>\s?/, "").trim();
      if (!word || word === "|") continue;
      lastEntry = {
        forms: word.split("/").map((f) => f.trim()),
        classes: activeClasses().map(normalizeClass).map((c) => c.toLowerCase()),
      };
      entries.push(lastEntry);
      continue;
    }

    if (line.startsWith("|") && lastEntry) {
      const meta = line.replace(/^\|\s?/, "");
      if (/^pron\b/i.test(meta)) {
        lastEntry.pron = meta
          .replace(/^pron\s+/i, "")
          .split("/")
          .map((p) => p.trim())
          .filter(Boolean);
        continue;
      }
      if (/^weight\b/i.test(meta)) continue;
      const classMatch = meta.match(/^class\s+(.+)$/i);
      if (classMatch) {
        const extra = classMatch[1]!.split(/\s+/).map(normalizeClass).filter(Boolean);
        for (const c of extra) {
          const lower = c.toLowerCase();
          if (!lastEntry.classes.includes(lower)) lastEntry.classes.push(lower);
        }
      }
    }
  }

  const resolved = NAME_ALIASES[name] ?? name;
  return { name: resolved, subs: subs.map((s) => s.toLowerCase()), entries };
}

export function compileDictionaries(
  files: { name: string; source: string }[],
  options: CompileOptions = {},
): Dictionary {
  const aliases = { ...NAME_ALIASES, ...options.aliases };
  const tables: Record<string, Table> = {};
  for (const file of files) {
    const fallback = file.name.replace(/\.dic$/i, "").replace(/\s+/g, "_").toLowerCase();
    const table = compileDic(file.source, fallback);
    const aliased = aliases[table.name] ?? table.name;
    table.name = aliased;
    const existing = tables[aliased];
    if (existing) {
      existing.entries.push(...table.entries);
      if (existing.subs.length < table.subs.length) existing.subs = table.subs;
    } else {
      tables[aliased] = table;
    }
    if (table.name !== aliased && !(table.name in tables)) {
      tables[table.name] = tables[aliased]!;
    }
  }
  return { tables };
}
