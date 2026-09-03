import type { Node, TagNode } from "./ast.ts";
import { parseCaseMode } from "./format/case.ts";
import { formatNumber } from "./format/number.ts";
import { decodeSepArg } from "./parse/parser.ts";
import {
  capture,
  defaultAttrs,
  write,
  type InterpretContext,
} from "./runtime.ts";
import { ensureSync, parseSyncType } from "./sync.ts";

export type EvalSeq = (nodes: Node[], ctx: InterpretContext) => void;

function sepNodes(nodes: Node[] | undefined): Node[] | undefined {
  if (!nodes || nodes.length === 0) return nodes;
  if (nodes.length === 1 && nodes[0]?.type === "text") {
    const v = nodes[0].value;
    if (v === " " || v === "\n" || v === "\t") return nodes;
    return [{ type: "text", value: decodeSepArg(v) }];
  }
  return nodes;
}

function greedy(
  nodes: Node[] | undefined,
  ctx: InterpretContext,
  evalSequence: EvalSeq,
): string {
  if (!nodes || nodes.length === 0) return "";
  return capture(ctx, () => evalSequence(nodes, ctx));
}

export function runTag(
  tag: TagNode,
  ctx: InterpretContext,
  evalSequence: EvalSeq,
): void {
  const name = tag.name.replace(/^:+/, "");
  const a = tag.args;
  const g = (nodes?: Node[]) => greedy(nodes, ctx, evalSequence);
  const num = (nodes: Node[] | undefined, fallback = 0) => {
    const n = Number(g(nodes).trim());
    return Number.isFinite(n) ? n : fallback;
  };

  switch (name) {
    case "case":
    case "caps":
      ctx.caseMode = parseCaseMode(tag.arg || g(a[0]));
      return;
    case "rep":
    case "r": {
      const n = Math.trunc(num(a[0], 1));
      ctx.attrs.rep = n > 0 ? n : 1;
      return;
    }
    case "repeach":
      ctx.attrs.rep = "each";
      return;
    case "sep":
    case "s":
      ctx.attrs.sep = sepNodes(a[0]);
      return;
    case "rs": {
      const n = Math.trunc(num(a[0], 1));
      ctx.attrs.rep = n > 0 ? n : 1;
      ctx.attrs.sep = sepNodes(a[1]);
      return;
    }
    case "a":
      ctx.pendingArticle = true;
      return;
    case "chance":
      ctx.attrs.chance = num(a[0], 100);
      return;
    case "n":
    case "num": {
      if (a.length >= 2) {
        const min = num(a[0], 0);
        const max = num(a[1], min);
        const lo = Math.min(min, max);
        const hi = Math.max(min, max);
        const v = lo + ctx.rng.int(Math.floor(hi - lo + 1) || 1);
        write(ctx, formatNumber(v, ctx.numfmt));
      } else {
        const v = Number(g(a[0]));
        write(ctx, Number.isFinite(v) ? formatNumber(v, ctx.numfmt) : g(a[0]));
      }
      return;
    }
    case "numfmt": {
      const mode = g(a[0]).trim().toLowerCase();
      if (a[1]) {
        const prev = ctx.numfmt;
        ctx.numfmt = mode;
        evalSequence(a[1], ctx);
        ctx.numfmt = prev;
      } else ctx.numfmt = mode;
      return;
    }
    case "rn":
    case "repnum":
    case "index1":
    case "i1":
      write(ctx, formatNumber(ctx.repIndex + 1, ctx.numfmt));
      return;
    case "index":
    case "i":
      write(ctx, formatNumber(ctx.repIndex, ctx.numfmt));
      return;
    case "x":
    case "sync": {
      const id = g(a[0]).trim();
      const type = parseSyncType(g(a[1]));
      ensureSync(ctx, id, type);
      ctx.attrs.sync = id;
      return;
    }
    case "xdel":
      ctx.syncs.delete(g(a[0]).trim());
      return;
    case "protect": {
      const saved = ctx.attrs;
      ctx.attrs = defaultAttrs();
      evalSequence(a[0] ?? [], ctx);
      ctx.attrs = saved;
      return;
    }
    case "if": {
      if (a.length >= 2) {
        const cond = g(a[0]).trim();
        const ok = cond === "true" || cond === "1" || ctx.matchCarriers.has(cond);
        evalSequence(ok ? a[1]! : a[2] ?? [], ctx);
        return;
      }
      ctx.pendingIf = tag.arg;
      return;
    }
    default:
      throw new Error(`Unknown tag: [${name}]`);
  }
}
