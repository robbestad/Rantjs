import type { CaseMode, Node } from "./ast.ts";
import type { Dictionary, Entry } from "./dictionary/types.ts";
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

export interface Subroutine {
  params: { name: string; lazy: boolean }[];
  body: Node[];
}

export interface QueryBuilder {
  table?: string;
  sub?: string;
  classes: string[];
  exclude: string[];
}

export interface InterpretContext {
  rng: Rng;
  dictionary: Dictionary;
  nsfw: boolean;
  matchCarriers: Map<string, { value: string; classes: string[]; pron?: string }>;
  uniqueCarriers: Map<string, Set<string>>;
  rhymeMode: string;
  caseMode: CaseMode;
  numfmt: string;
  outputs: Record<string, string>;
  channelVis: Record<string, "public" | "private">;
  channelStack: string[];
  capture: string[] | null;
  attrs: BlockAttrs;
  syncs: Map<string, SyncState>;
  subroutines: Map<string, Subroutine>;
  args: Map<string, string | Node[]>;
  builders: Map<string, QueryBuilder>;
  lastBuilder?: string;
  replacerMatch: string;
  targets: Map<string, string>;
  channels: Record<string, string>;
  pendingArticle: boolean;
  pendingIf?: string;
  repIndex: number;
}

export function defaultAttrs(): BlockAttrs {
  return { rep: 1, chance: 100 };
}

export function createContext(
  rng: Rng,
  dictionary: Dictionary,
  nsfw: boolean,
): InterpretContext {
  return {
    rng,
    dictionary,
    nsfw,
    matchCarriers: new Map(),
    uniqueCarriers: new Map(),
    rhymeMode: "perfect",
    caseMode: "default",
    numfmt: "normal",
    outputs: { main: "" },
    channelVis: { main: "public" },
    channelStack: ["main"],
    capture: null,
    attrs: defaultAttrs(),
    syncs: new Map(),
    subroutines: new Map(),
    args: new Map(),
    builders: new Map(),
    replacerMatch: "",
    targets: new Map(),
    channels: {},
    pendingArticle: false,
    repIndex: 0,
  };
}

export function write(ctx: InterpretContext, s: string): void {
  if (!s) return;
  if (ctx.capture) {
    ctx.capture[ctx.capture.length - 1] = (ctx.capture[ctx.capture.length - 1] ?? "") + s;
    return;
  }
  const ch = ctx.channelStack[ctx.channelStack.length - 1] ?? "main";
  ctx.outputs[ch] = (ctx.outputs[ch] ?? "") + s;
  if (ch !== "main" && ctx.channelVis[ch] === "public") {
    ctx.outputs.main += s;
  }
}

export function capture(ctx: InterpretContext, fn: () => void): string {
  ctx.capture = ctx.capture ?? [];
  ctx.capture.push("");
  fn();
  const s = ctx.capture.pop() ?? "";
  if (ctx.capture.length === 0) ctx.capture = null;
  return s;
}

export type { Entry };
