import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { compileDictionaries } from "../src/dictionary/compile-dic.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const vocabDir = join(root, "vocab");

function collectDicFiles(dir: string): { name: string; source: string }[] {
  const out: { name: string; source: string }[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith(".")) continue;
      out.push(...collectDicFiles(full));
      continue;
    }
    if (!entry.name.endsWith(".dic")) continue;
    out.push({
      name: relative(vocabDir, full),
      source: readFileSync(full, "utf8"),
    });
  }
  return out;
}

const files = collectDicFiles(vocabDir);
const dictionary = compileDictionaries(files);

const destDir = join(root, "src", "dictionaries");
mkdirSync(destDir, { recursive: true });
const dest = join(destDir, "en-US.ts");
const json = JSON.stringify(dictionary);
const banner = `/* Generated from vocab/*.dic — do not edit. */\n`;
const body = `${banner}import type { Dictionary } from "../dictionary/types.ts";\n\nexport const enUS: Dictionary = ${json};\n`;
writeFileSync(dest, body);
const tables = Object.keys(dictionary.tables).length;
const entries = Object.values(dictionary.tables).reduce(
  (n, t) => n + t.entries.length,
  0,
);
process.stdout.write(
  `Wrote ${relative(root, dest)} (${tables} tables, ${entries} entries)\n`,
);
