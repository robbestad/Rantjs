const AN_WORDS = new Set([
  "hour",
  "honest",
  "honor",
  "honour",
  "heir",
  "aunts",
  "aunt",
]);

const A_WORDS = new Set([
  "university",
  "user",
  "union",
  "one",
  "once",
  "european",
  "ewe",
  "uber",
]);

export function indefiniteArticle(word: string): "a" | "an" {
  const first = word.trim().split(/\s+/)[0] ?? "";
  const lower = first.toLowerCase().replace(/[^a-z]/g, "");
  if (!lower) return "a";
  if (AN_WORDS.has(lower)) return "an";
  if (A_WORDS.has(lower)) return "a";
  return /^[aeiou]/.test(lower) ? "an" : "a";
}

export function withArticle(word: string): string {
  const trimmed = word.replace(/^\s+/, "");
  if (!trimmed) return word;
  return `${indefiniteArticle(trimmed)} ${trimmed}`;
}
