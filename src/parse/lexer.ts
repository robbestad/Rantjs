import type { Token } from "../ast.ts";

function unescapeChar(ch: string): string {
  switch (ch) {
    case "n":
    case "N":
      return "\n";
    case "s":
    case "S":
      return " ";
    case "t":
      return "\t";
    default:
      return ch;
  }
}

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let text = "";

  const flushText = () => {
    if (text) {
      tokens.push({ kind: "text", value: text });
      text = "";
    }
  };

  const readUntil = (end: string): string => {
    let out = "";
    while (i < input.length) {
      const ch = input[i]!;
      if (ch === "\\" && i + 1 < input.length) {
        out += input[i + 1];
        i += 2;
        continue;
      }
      if (ch === end) {
        i += 1;
        return out;
      }
      out += ch;
      i += 1;
    }
    return out;
  };

  while (i < input.length) {
    const ch = input[i]!;
    if (ch === "\\" && i + 1 < input.length) {
      const next = input[i + 1]!;
      i += 2;
      if (next === "C") {
        flushText();
        tokens.push({ kind: "escape", code: "C" });
      } else {
        text += unescapeChar(next);
      }
      continue;
    }
    if (ch === "<") {
      flushText();
      i += 1;
      tokens.push({ kind: "query", value: readUntil(">") });
      continue;
    }
    if (ch === "[") {
      flushText();
      i += 1;
      tokens.push({ kind: "tag", value: readUntil("]") });
      continue;
    }
    if (ch === "{") {
      flushText();
      tokens.push({ kind: "lbrace" });
      i += 1;
      continue;
    }
    if (ch === "}") {
      flushText();
      tokens.push({ kind: "rbrace" });
      i += 1;
      continue;
    }
    if (ch === "|") {
      flushText();
      tokens.push({ kind: "pipe" });
      i += 1;
      continue;
    }
    text += ch;
    i += 1;
  }
  flushText();
  tokens.push({ kind: "eof" });
  return tokens;
}
