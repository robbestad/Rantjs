import type {
  BlockAlt,
  CarrierKind,
  Node,
  QueryNode,
  TagNode,
  Token,
} from "../ast.ts";
import { resolveArgName, resolveTableName } from "../aliases.ts";
import { tokenize } from "./lexer.ts";

class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}

export function decodeSepArg(arg: string): string {
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

function splitAtDepth(input: string, sep: string): string[] {
  const parts: string[] = [];
  let buf = "";
  let depthSq = 0;
  let depthCurly = 0;
  let depthPar = 0;
  let inTick = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i]!;
    if (ch === "\\" && i + 1 < input.length) {
      buf += ch + input[i + 1];
      i += 1;
      continue;
    }
    if (ch === "`") {
      inTick = !inTick;
      buf += ch;
      continue;
    }
    if (!inTick) {
      if (ch === "[") depthSq += 1;
      else if (ch === "]") depthSq = Math.max(0, depthSq - 1);
      else if (ch === "{") depthCurly += 1;
      else if (ch === "}") depthCurly = Math.max(0, depthCurly - 1);
      else if (ch === "(") depthPar += 1;
      else if (ch === ")") depthPar = Math.max(0, depthPar - 1);
      else if (
        ch === sep &&
        depthSq === 0 &&
        depthCurly === 0 &&
        depthPar === 0
      ) {
        parts.push(buf);
        buf = "";
        continue;
      }
    }
    buf += ch;
  }
  parts.push(buf);
  return parts;
}

export function parseQueryInner(inner: string): QueryNode {
  const carrierIdx = inner.indexOf("::");
  let body = inner;
  let carrier: string | undefined;
  let carrierKind: CarrierKind | undefined;
  if (carrierIdx !== -1) {
    body = inner.slice(0, carrierIdx);
    const rest = inner.slice(carrierIdx + 2).trim();
    if (rest.startsWith("&")) {
      carrierKind = "match";
      carrier = rest.slice(1).trim();
    } else if (rest.startsWith("!")) {
      carrierKind = "unique";
      carrier = rest.replace(/^!+/, "").trim();
    } else if (rest.startsWith("=")) {
      carrierKind = "match";
      carrier = rest.slice(1).trim();
    } else {
      carrierKind = "match";
      carrier = rest;
    }
    if (!carrier) carrier = undefined;
  }
  const tokens = body.match(/[A-Za-z0-9_]+|\?!?[A-Za-z0-9_]+/g) ?? [];
  const exclude: string[] = [];
  const args: string[] = [];
  let table = "";
  for (const raw of tokens) {
    const word = raw.toLowerCase();
    if (word.startsWith("?!")) {
      exclude.push(word.slice(2));
      continue;
    }
    if (!table) {
      table = resolveTableName(word);
      continue;
    }
    args.push(resolveArgName(word));
  }
  return {
    type: "query",
    table,
    args,
    exclude,
    carrier,
    carrierKind,
    raw: inner.trim(),
  };
}

function parseTagInner(inner: string): TagNode {
  const trimmed = inner.trim();
  if (trimmed.startsWith("`")) {
    const endTick = trimmed.indexOf("`", 1);
    const regex = endTick >= 0 ? trimmed.slice(1, endTick) : trimmed.slice(1);
    const after = endTick >= 0 ? trimmed.slice(endTick + 1).replace(/^:/, "") : "";
    const rawArgs = after ? splitAtDepth(after, ";") : [];
    return {
      type: "tag",
      name: "replacer",
      arg: regex,
      args: rawArgs.map((a) => parse(a)),
    };
  }
  const colon = splitAtDepth(trimmed, ":");
  const name = (colon[0] ?? "").trim().toLowerCase();
  const rest = colon.slice(1).join(":");
  const rawArgs = rest.length ? splitAtDepth(rest, ";") : [];
  const args = rawArgs.map((a) => parse(a));
  let arg = (rawArgs[0] ?? "").trim();
  if (name === "sep" || name === "s") arg = decodeSepArg(arg);
  return { type: "tag", name, arg, args };
}

function extractWeight(nodes: Node[]): BlockAlt {
  let i = 0;
  while (
    i < nodes.length &&
    nodes[i]?.type === "text" &&
    /^\s*$/.test((nodes[i] as { value: string }).value)
  ) {
    i += 1;
  }
  const first = nodes[i];
  if (!first || first.type !== "text") return { weight: null, nodes };
  const leading = first.value.match(/^\s*/)![0];
  const v = first.value.slice(leading.length);
  if (!v.startsWith("(")) return { weight: null, nodes };
  let depth = 0;
  let end = -1;
  for (let k = 0; k < v.length; k++) {
    if (v[k] === "(") depth += 1;
    else if (v[k] === ")") {
      depth -= 1;
      if (depth === 0) {
        end = k;
        break;
      }
    }
  }
  if (end < 0) return { weight: null, nodes };
  const inner = v.slice(1, end);
  const restText = v.slice(end + 1);
  const rest: Node[] = [];
  if (restText) rest.push({ type: "text", value: restText });
  rest.push(...nodes.slice(i + 1));
  return { weight: inner.trim() ? parse(inner) : null, nodes: rest };
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
        if (mode === "block") throw new ParseError("Unclosed block");
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
    const alternatives: BlockAlt[] = [];
    while (true) {
      alternatives.push(extractWeight(this.parseSequence("block")));
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
