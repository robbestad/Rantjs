import type { Node, QueryNode, TagNode, Token } from "../ast.ts";
import { tokenize } from "./lexer.ts";

class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

function decodeSepArg(arg: string): string {
  const trimmed = arg.trim();
  if (trimmed === "n" || trimmed === "N" || trimmed === "\\n" || trimmed === "\\N") {
    return "\n";
  }
  if (trimmed === "s" || trimmed === "S" || trimmed === "\\s" || trimmed === "\\S") {
    return " ";
  }
  return trimmed
    .replace(/\\n/gi, "\n")
    .replace(/\\s/gi, " ")
    .replace(/\\t/g, "\t");
}

export function parseQueryInner(inner: string): QueryNode {
  const carrierIdx = inner.indexOf("::");
  let body = inner;
  let carrier: string | undefined;
  if (carrierIdx !== -1) {
    body = inner.slice(0, carrierIdx);
    carrier = inner.slice(carrierIdx + 2).trim() || undefined;
  }
  const words = body.match(/[A-Za-z0-9_]+/g) ?? [];
  return {
    type: "query",
    table: (words[0] ?? "").toLowerCase(),
    args: words.slice(1).map((w) => w.toLowerCase()),
    carrier,
    raw: inner.trim(),
  };
}

function parseTagInner(inner: string): TagNode {
  const colon = inner.indexOf(":");
  if (colon === -1) {
    return { type: "tag", name: inner.trim().toLowerCase(), arg: "" };
  }
  const name = inner.slice(0, colon).trim().toLowerCase();
  const rawArg = inner.slice(colon + 1);
  const arg = name === "sep" ? decodeSepArg(rawArg) : rawArg.trim();
  return { type: "tag", name, arg };
}

class Parser {
  private i = 0;
  constructor(private readonly tokens: Token[]) {}

  private peek(): Token {
    return this.tokens[this.i] ?? { kind: "eof" };
  }

  private advance(): Token {
    const t = this.peek();
    if (t.kind !== "eof") this.i += 1;
    return t;
  }

  parsePattern(): Node[] {
    return this.parseSequence("top");
  }

  private parseSequence(mode: "top" | "block"): Node[] {
    const nodes: Node[] = [];
    while (true) {
      const t = this.peek();
      if (t.kind === "eof") {
        if (mode === "block") {
          throw new ParseError("Unclosed block");
        }
        break;
      }
      if (t.kind === "rbrace" || t.kind === "pipe") {
        if (mode === "top") {
          this.advance();
          nodes.push({ type: "text", value: t.kind === "rbrace" ? "}" : "|" });
          continue;
        }
        break;
      }
      nodes.push(this.parseNode());
    }
    return nodes;
  }

  private parseNode(): Node {
    const t = this.advance();
    switch (t.kind) {
      case "text":
        return { type: "text", value: t.value };
      case "query":
        return parseQueryInner(t.value);
      case "tag":
        return parseTagInner(t.value);
      case "escape":
        return { type: "escape", code: t.code };
      case "lbrace":
        return this.parseBlock();
      default:
        throw new ParseError(`Unexpected token ${t.kind}`);
    }
  }

  private parseBlock(): Node {
    const alternatives: Node[][] = [];
    while (true) {
      alternatives.push(this.parseSequence("block"));
      const t = this.peek();
      if (t.kind === "pipe") {
        this.advance();
        continue;
      }
      if (t.kind === "rbrace") {
        this.advance();
        break;
      }
      throw new ParseError("Unclosed block");
    }
    return { type: "block", alternatives };
  }
}

export function parse(input: string): Node[] {
  return new Parser(tokenize(input)).parsePattern();
}

export { ParseError };
