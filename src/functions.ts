import type { Node, TagNode } from "./ast.ts";
import { parseCaseMode } from "./format/case.ts";
import { formatNumber } from "./format/number.ts";
import { decodeSepArg } from "./parse/parser.ts";
import { resolveQuery } from "./query.ts";
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

export function greedy(
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
): boolean {
  const name = tag.name.replace(/^:+/, "");
  const a = tag.args;
  const g = (nodes?: Node[]) => greedy(nodes, ctx, evalSequence);
  const num = (nodes: Node[] | undefined, fallback = 0) => {
    const n = Number(g(nodes).trim());
    return Number.isFinite(n) ? n : fallback;
  };

  if (name.startsWith("$[") && name.endsWith("]")) {
    const spec = name.slice(2, -1);
    const colon = spec.indexOf(":");
    const subName = (colon < 0 ? spec : spec.slice(0, colon)).trim();
    const rawParams = colon < 0 ? "" : spec.slice(colon + 1);
    const params = rawParams
      .split(/[,;]/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) =>
        p.startsWith("@")
          ? { name: p.slice(1), lazy: true }
          : { name: p, lazy: false },
      );
    ctx.subroutines.set(subName, { params, body: a[0] ?? [] });
    return true;
  }

  if (name.startsWith("$")) {
    const sub = ctx.subroutines.get(name.slice(1));
    if (!sub) return true;
    const saved = ctx.args;
    ctx.args = new Map(saved);
    sub.params.forEach((p, i) => {
      const arg = a[i] ?? [];
      ctx.args.set(p.name, p.lazy ? arg : g(arg));
    });
    evalSequence(sub.body, ctx);
    ctx.args = saved;
    return true;
  }

  switch (name) {
    case "case":
    case "caps":
      ctx.caseMode = parseCaseMode(tag.arg || g(a[0]));
      return true;
    case "rep":
    case "r": {
      const n = Math.trunc(num(a[0], 1));
      ctx.attrs.rep = n > 0 ? n : 1;
      return true;
    }
    case "repeach":
      ctx.attrs.rep = "each";
      return true;
    case "sep":
    case "s":
      ctx.attrs.sep = sepNodes(a[0]);
      return true;
    case "rs": {
      const n = Math.trunc(num(a[0], 1));
      ctx.attrs.rep = n > 0 ? n : 1;
      ctx.attrs.sep = sepNodes(a[1]);
      return true;
    }
    case "a":
      ctx.pendingArticle = true;
      return true;
    case "chance":
      ctx.attrs.chance = num(a[0], 100);
      return true;
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
      return true;
    }
    case "numfmt": {
      const mode = g(a[0]).trim().toLowerCase();
      if (a[1]) {
        const prev = ctx.numfmt;
        ctx.numfmt = mode;
        evalSequence(a[1], ctx);
        ctx.numfmt = prev;
      } else ctx.numfmt = mode;
      return true;
    }
    case "rn":
    case "repnum":
    case "index1":
    case "i1":
      write(ctx, formatNumber(ctx.repIndex + 1, ctx.numfmt));
      return true;
    case "index":
    case "i":
      write(ctx, formatNumber(ctx.repIndex, ctx.numfmt));
      return true;
    case "x":
    case "sync": {
      const id = g(a[0]).trim();
      const type = parseSyncType(g(a[1]));
      ensureSync(ctx, id, type);
      ctx.attrs.sync = id;
      return true;
    }
    case "xdel":
      ctx.syncs.delete(g(a[0]).trim());
      return true;
    case "protect": {
      const saved = ctx.attrs;
      ctx.attrs = defaultAttrs();
      evalSequence(a[0] ?? [], ctx);
      ctx.attrs = saved;
      return true;
    }
    case "chan": {
      const ch = g(a[0]).trim();
      const visRaw = g(a[1]).trim().toLowerCase();
      const vis = visRaw === "private" ? "private" : "public";
      ctx.outputs[ch] = ctx.outputs[ch] ?? "";
      ctx.channelVis[ch] = vis;
      ctx.channelStack.push(ch);
      evalSequence(a[2] ?? [], ctx);
      ctx.channelStack.pop();
      return true;
    }
    case "target":
    case "t":
      ctx.targets.set(g(a[0]).trim(), "");
      return true;
    case "send":
    case "sendover":
      ctx.targets.set(g(a[0]).trim(), g(a[1]));
      return true;
    case "targetval":
      write(ctx, ctx.targets.get(g(a[0]).trim()) ?? "");
      return true;
    case "clrt":
      ctx.targets.set(g(a[0]).trim(), "");
      return true;
    case "len":
      write(ctx, String(g(a[0]).length));
      return true;
    case "quote":
    case "quot":
      write(ctx, `"${g(a[0])}"`);
      return true;
    case "arg": {
      const key = g(a[0]).trim();
      const v = ctx.args.get(key);
      if (typeof v === "string") write(ctx, v);
      else if (Array.isArray(v)) evalSequence(v, ctx);
      return true;
    }
    case "rhyme":
      ctx.rhymeMode = g(a[0]).trim().toLowerCase() || "perfect";
      return true;
    case "qname": {
      const id = g(a[0]).trim();
      const b = ctx.builders.get(id) ?? { classes: [], exclude: [] };
      b.table = g(a[1]).trim();
      ctx.builders.set(id, b);
      ctx.lastBuilder = id;
      return true;
    }
    case "qsub": {
      const id = g(a[0]).trim();
      const b = ctx.builders.get(id) ?? { classes: [], exclude: [] };
      b.sub = g(a[1]).trim();
      ctx.builders.set(id, b);
      return true;
    }
    case "qcf": {
      const id = g(a[0]).trim();
      const b = ctx.builders.get(id) ?? { classes: [], exclude: [] };
      for (let i = 1; i < a.length; i++) {
        const c = g(a[i]).trim();
        if (c) b.classes.push(...c.split(/\s+/));
      }
      ctx.builders.set(id, b);
      return true;
    }
    case "qcfn": {
      const id = g(a[0]).trim();
      const b = ctx.builders.get(id) ?? { classes: [], exclude: [] };
      for (let i = 1; i < a.length; i++) {
        const c = g(a[i]).trim();
        if (c) b.exclude.push(...c.split(/\s+/));
      }
      ctx.builders.set(id, b);
      return true;
    }
    case "q":
    case "query": {
      const id = (g(a[0]).trim() || ctx.lastBuilder) ?? "";
      const b = ctx.builders.get(id);
      if (!b?.table) return true;
      write(
        ctx,
        resolveQuery(
          {
            type: "query",
            table: b.table,
            args: [...b.classes, ...(b.sub ? [b.sub] : [])],
            exclude: b.exclude,
            raw: b.table,
          },
          ctx,
        ),
      );
      return true;
    }
    case "replacer": {
      let source = tag.arg;
      let reFlags = "";
      const trail = source.match(/([imsu]+)$/);
      if (trail && !source.endsWith("]")) {
        reFlags = trail[1] ?? "";
        source = source.slice(0, source.length - reFlags.length);
      }
      let re: RegExp;
      try {
        re = new RegExp(source, reFlags);
      } catch {
        re = /(?:)/;
      }
      const input = g(a[0]);
      const m = input.match(re);
      if (m) {
        ctx.replacerMatch = m[0] ?? input;
        write(ctx, input);
      } else {
        ctx.replacerMatch = input;
        evalSequence(a[1] ?? [], ctx);
      }
      return true;
    }
    case "match":
      write(ctx, ctx.replacerMatch);
      return true;
    case "capsinfer": {
      const sample = g(a[0]);
      if (sample && sample === sample.toUpperCase()) ctx.caseMode = "upper";
      else if (sample && sample === sample.toLowerCase()) ctx.caseMode = "lower";
      else ctx.caseMode = "word";
      return true;
    }
    case "if": {
      if (a.length >= 2) {
        const cond = g(a[0]).trim();
        const ok = cond === "true" || cond === "1" || ctx.matchCarriers.has(cond);
        evalSequence(ok ? a[1]! : a[2] ?? [], ctx);
        return true;
      }
      ctx.pendingIf = tag.arg;
      return true;
    }
    default:
      return false;
  }
}
