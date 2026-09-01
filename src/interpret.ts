import type { BlockNode, CaseMode, Node } from "./ast.ts";
import { applyCase, parseCaseMode } from "./format/case.ts";
import { withArticle } from "./format/article.ts";
import type { Dictionary } from "./dictionary/types.ts";
import { resolveQuery } from "./query.ts";
import type { Rng } from "./rng.ts";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface InterpretContext {
  rng: Rng;
  dictionary: Dictionary;
  nsfw: boolean;
  carriers: Map<string, string>;
  caseMode: CaseMode;
}

function evalBlock(block: BlockNode, ctx: InterpretContext): string {
  if (block.alternatives.length === 0) return "";
  const alt = ctx.rng.pick(block.alternatives);
  return evalSequence(alt, ctx);
}

function evalNode(node: Node, ctx: InterpretContext): string {
  switch (node.type) {
    case "text":
      return node.value;
    case "escape":
      if (node.code === "C") return ctx.rng.pick(LETTERS.split(""));
      return node.code;
    case "query":
      return resolveQuery(node, ctx);
    case "block":
      return evalBlock(node, ctx);
    case "tag":
      return "";
  }
}

function isBlock(node: Node | undefined): node is BlockNode {
  return node?.type === "block";
}

export function evalSequence(nodes: Node[], ctx: InterpretContext): string {
  let out = "";
  let i = 0;
  let pendingRep = 1;
  let pendingSep: string | undefined;
  let pendingArticle = false;
  let pendingIf: string | undefined;

  const takeFollowingBlocks = (start: number): { nodes: Node[]; next: number } => {
    const taken: Node[] = [];
    let j = start;
    while (j < nodes.length && isBlock(nodes[j])) {
      taken.push(nodes[j]!);
      j += 1;
      if (taken.length >= 2) break;
    }
    return { nodes: taken, next: j };
  };

  while (i < nodes.length) {
    const node = nodes[i]!;
    if (node.type === "tag") {
      switch (node.name) {
        case "case":
          ctx.caseMode = parseCaseMode(node.arg);
          break;
        case "rep": {
          const n = Number.parseInt(node.arg, 10);
          pendingRep = Number.isFinite(n) && n > 0 ? n : 1;
          break;
        }
        case "sep":
          pendingSep = node.arg;
          break;
        case "a":
          pendingArticle = true;
          break;
        case "if":
          pendingIf = node.arg;
          break;
        default:
          break;
      }
      i += 1;
      continue;
    }

    if (
      (pendingRep !== 1 ||
        pendingSep !== undefined ||
        pendingArticle ||
        pendingIf !== undefined) &&
      node.type === "text" &&
      /^\s*$/.test(node.value)
    ) {
      if (!pendingArticle) out += node.value;
      i += 1;
      continue;
    }

    if (pendingIf !== undefined) {
      const carrier = pendingIf;
      pendingIf = undefined;
      const { nodes: branches, next } = isBlock(node)
        ? takeFollowingBlocks(i)
        : { nodes: [node], next: i + 1 };
      const thenNode = branches[0];
      const elseNode = branches[1];
      const chosen = ctx.carriers.has(carrier) ? thenNode : elseNode;
      if (chosen) out += evalNode(chosen, ctx);
      i = next;
      continue;
    }

    const reps = pendingRep;
    const sep = pendingSep;
    pendingRep = 1;
    pendingSep = undefined;

    const parts: string[] = [];
    for (let r = 0; r < reps; r++) {
      let piece = evalNode(node, ctx);
      if (pendingArticle) piece = withArticle(piece);
      parts.push(piece);
    }
    pendingArticle = false;
    out += parts.join(sep ?? "");
    i += 1;
  }

  return out;
}

export function interpret(nodes: Node[], ctx: InterpretContext): string {
  const raw = evalSequence(nodes, ctx);
  return applyCase(raw, ctx.caseMode);
}
