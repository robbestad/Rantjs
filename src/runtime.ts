import type { CaseMode, Node } from "./ast.ts";
import type { Dictionary } from "./dictionary/types.ts";
import type { Rng } from "./rng.ts";

export type SyncType =
  | "none"
  | "locked"
  | "deck"
  | "cdeck"
  | "forward"
  | "reverse"
  | "no-repeat";

export interface SyncState {
  type: SyncType;
  index: number;
  order: number[];
  last: number;
}

export interface BlockAttrs {
  rep: number | "each";
  sep?: Node[];
  sync?: string;
  chance: number;
}

export interface QueryPick {
  table: string;
  args: string[];
  value: string;
  carrier?: string;
}

export interface InterpretContext {
  rng: Rng;
  dictionary: Dictionary;
  nsfw: boolean;
  matchCarriers: Map<string, string>;
  uniqueCarriers: Map<string, Set<string>>;
  caseMode: CaseMode;
  numfmt: string;
  chunks: string[];
  capture: string[] | null;
  attrs: BlockAttrs;
  syncs: Map<string, SyncState>;
  pendingArticle: boolean;
  pendingIf?: string;
  repIndex: number;
  trace: QueryPick[] | null;
}

export function defaultAttrs(): BlockAttrs {
  return { rep: 1, chance: 100 };
}

export function createContext(
  rng: Rng,
  dictionary: Dictionary,
  nsfw: boolean,
  trace: QueryPick[] | null = null,
): InterpretContext {
  return {
    rng,
    dictionary,
    nsfw,
    matchCarriers: new Map(),
    uniqueCarriers: new Map(),
    caseMode: "default",
    numfmt: "normal",
    chunks: [],
    capture: null,
    attrs: defaultAttrs(),
    syncs: new Map(),
    pendingArticle: false,
    repIndex: 0,
    trace,
  };
}

export function write(ctx: InterpretContext, s: string): void {
  if (!s) return;
  if (ctx.capture) {
    ctx.capture[ctx.capture.length - 1] =
      (ctx.capture[ctx.capture.length - 1] ?? "") + s;
    return;
  }
  ctx.chunks.push(s);
}

export function capture(ctx: InterpretContext, fn: () => void): string {
  ctx.capture = ctx.capture ?? [];
  ctx.capture.push("");
  fn();
  const s = ctx.capture.pop() ?? "";
  if (ctx.capture.length === 0) ctx.capture = null;
  return s;
}

export function finish(ctx: InterpretContext): string {
  return ctx.chunks.join("");
}
