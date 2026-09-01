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

  const readTag = (): string => {
    let out = "";
    let depth = 1;
    let inTick = false;
    while (i < input.length && depth > 0) {
      const ch = input[i]!;
      if (ch === "\\" && i + 1 < input.length) {
        out += ch + input[i + 1];
        i += 2;
        continue;
      }
      if (ch === "`") {
        inTick = !inTick;
        out += ch;
        i += 1;
        continue;
      }
      if (!inTick) {
        if (ch === "[") depth += 1;
        else if (ch === "]") {
          depth -= 1;
          i += 1;
          if (depth === 0) return out;
          out += ch;
          continue;
        }
      }
      out += ch;
      i += 1;
    }
    return out;
  };

  while (i < input.length) {
    const ch = input[i]!;
    if (ch === "#" && !text.endsWith("\\")) {
      flushText();
      while (i < input.length && input[i] !== "\n") i += 1;
      continue;
    }
    if (ch === "\\" && i + 1 < input.length) {
      const next = input[i + 1]!;
      i += 2;
      if (next === "C" || next === "d") {
        flushText();
        tokens.push({ kind: "escape", code: next });
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
      tokens.push({ kind: "tag", value: readTag() });
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
