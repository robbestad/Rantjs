import type { BlockNode, Node } from "./ast.ts";
import { applyCase } from "./format/case.ts";
import { withArticle } from "./format/article.ts";
import { resolveQuery } from "./query.ts";
import { runTag } from "./functions.ts";
import {
  capture,
  defaultAttrs,
  finish,
  write,
  type InterpretContext,
} from "./runtime.ts";
import { pickSynced } from "./sync.ts";

const LETTERS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
];
const DIGITS = ["0","1","2","3","4","5","6","7","8","9"];

function pickWeighted(block: BlockNode, ctx: InterpretContext): number {
  const n = block.alternatives.length;
  if (n === 0) return 0;
  const weights = block.alternatives.map((alt) => {
    if (!alt.weight) return 1;
    const s = capture(ctx, () => evalSequence(alt.weight!, ctx)).trim();
    const v = Number(s);
    return Number.isFinite(v) && v >= 0 ? v : 1;
  });
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0) return ctx.rng.int(n);
  let r = ctx.rng.next() * sum;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i]!;
    if (r <= 0) return i;
  }
  return n - 1;
}

function evalBlock(block: BlockNode, ctx: InterpretContext): void {
  const attrs = ctx.attrs;
  ctx.attrs = defaultAttrs();
  if (attrs.chance < 100 && ctx.rng.next() * 100 >= attrs.chance) return;
  const times = attrs.rep === "each" ? Math.max(1, block.alternatives.length) : attrs.rep;
  const savedIndex = ctx.repIndex;
  const parts: string[] = [];
  for (let r = 0; r < times; r++) {
    ctx.repIndex = r;
    const idx = attrs.sync
      ? pickSynced(ctx, attrs.sync, block.alternatives.length)
      : pickWeighted(block, ctx);
    const alt = block.alternatives[idx];
    const piece = capture(ctx, () => {
      if (alt) evalSequence(alt.nodes, ctx);
    });
    parts.push(piece);
  }
  ctx.repIndex = savedIndex;
  const sep = attrs.sep
    ? capture(ctx, () => evalSequence(attrs.sep!, ctx))
    : "";
  write(ctx, parts.join(sep));
}

function evalNode(node: Node, ctx: InterpretContext): void {
  switch (node.type) {
    case "text":
      write(ctx, node.value);
      return;
    case "escape":
      if (node.code === "C") write(ctx, ctx.rng.pick(LETTERS));
      else if (node.code === "d") write(ctx, ctx.rng.pick(DIGITS));
      else write(ctx, node.code);
      return;
    case "query":
      write(ctx, resolveQuery(node, ctx));
      return;
    case "block":
      evalBlock(node, ctx);
      return;
    case "tag":
      runTag(node, ctx, evalSequence);
      return;
  }
}

function isBlock(node: Node | undefined): node is BlockNode {
  return node?.type === "block";
}

function needsCapture(ctx: InterpretContext): boolean {
  return (
    ctx.pendingArticle ||
    ctx.attrs.rep !== 1 ||
    Boolean(ctx.attrs.sep) ||
    ctx.attrs.chance < 100 ||
    Boolean(ctx.attrs.sync)
  );
}

export function evalSequence(nodes: Node[], ctx: InterpretContext): void {
  let i = 0;
  while (i < nodes.length) {
    const node = nodes[i]!;

    if (node.type === "tag") {
      runTag(node, ctx, evalSequence);
      i += 1;
      continue;
    }

    if (
      needsCapture(ctx) &&
      node.type === "text" &&
      /^\s*$/.test(node.value)
    ) {
      if (!ctx.pendingArticle) write(ctx, node.value);
      i += 1;
      continue;
    }

    if (ctx.pendingIf !== undefined) {
      const carrier = ctx.pendingIf;
      ctx.pendingIf = undefined;
      const taken: Node[] = [];
      let j = i;
      if (isBlock(node)) {
        while (j < nodes.length && isBlock(nodes[j]) && taken.length < 2) {
          taken.push(nodes[j]!);
          j += 1;
        }
      } else {
        taken.push(node);
        j = i + 1;
      }
      const chosen = ctx.matchCarriers.has(carrier) ? taken[0] : taken[1];
      if (chosen) evalNode(chosen, ctx);
      i = j;
      continue;
    }

    if (node.type === "block") {
      evalBlock(node, ctx);
      i += 1;
      continue;
    }

    if (ctx.pendingArticle) {
      const piece = capture(ctx, () => evalNode(node, ctx));
      write(ctx, withArticle(piece));
      ctx.pendingArticle = false;
    } else {
      evalNode(node, ctx);
    }
    i += 1;
  }
}

export function interpret(nodes: Node[], ctx: InterpretContext): string {
  evalSequence(nodes, ctx);
  return applyCase(finish(ctx), ctx.caseMode);
}
