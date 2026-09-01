import type { CaseMode } from "../ast.ts";

const TITLE_SMALL = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "for",
  "nor",
  "as",
  "at",
  "by",
  "from",
  "in",
  "into",
  "near",
  "of",
  "on",
  "onto",
  "to",
  "with",
]);

const TITLE_UPPER = new Set(["id", "tv", "lsd"]);

function capitalizeWord(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function applyCase(input: string, mode: CaseMode): string {
  if (!input) return input;
  switch (mode) {
    case "none":
      return input;
    case "upper":
      return input.toUpperCase();
    case "lower":
      return input.toLowerCase();
    case "word":
      return input.replace(/\w\S*/g, (w) => capitalizeWord(w));
    case "title": {
      const parts = input.split(/(\s+)/);
      const wordIndexes = parts
        .map((part, i) => ({ part, i }))
        .filter(({ part }) => part !== "" && !/^\s+$/.test(part))
        .map(({ i }) => i);
      const first = wordIndexes[0];
      const last = wordIndexes[wordIndexes.length - 1];
      return parts
        .map((part, i) => {
          if (part === "" || /^\s+$/.test(part)) return part;
          const lower = part.toLowerCase();
          if (TITLE_UPPER.has(lower)) return part.toUpperCase();
          const isEdge = i === first || i === last;
          if (!isEdge && TITLE_SMALL.has(lower)) return lower;
          return capitalizeWord(part);
        })
        .join("");
    }
    case "sentence":
      return input.replace(/(^\s*\w|[.!?]\s*\w)/g, (m) => m.toUpperCase());
    case "first":
    case "default":
    default:
      return input.replace(/^(\s*)(\S)/, (_all, ws: string, ch: string) => ws + ch.toUpperCase());
  }
}

export function parseCaseMode(arg: string): CaseMode {
  const v = arg.trim().toLowerCase();
  switch (v) {
    case "none":
    case "default":
    case "first":
    case "word":
    case "title":
    case "upper":
    case "lower":
    case "sentence":
      return v;
    case "case":
      return "default";
    default:
      return "default";
  }
}
