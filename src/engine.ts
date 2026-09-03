import { parse } from "./parse/parser.ts";
import { interpret } from "./interpret.ts";
import { createRng, type Rng } from "./rng.ts";
import { isDictionary, indexDictionary, type Dictionary } from "./dictionary/types.ts";
import { createContext, type QueryPick } from "./runtime.ts";
import type { Node } from "./ast.ts";

export interface RantOptions {
  seed?: number | string;
  dictionary?: Dictionary;
  nsfw?: boolean;
}

export interface Compiled {
  run(options?: RantOptions): string;
}

export interface ExplainResult {
  text: string;
  picks: QueryPick[];
}

export interface RantInstance {
  run(pattern: string, options?: RantOptions): string;
  compile(pattern: string): Compiled;
}

const CACHE_CAP = 32;

let defaultDictionary: Dictionary | undefined;

export function setDefaultDictionary(dict: Dictionary): void {
  defaultDictionary = indexDictionary(dict);
}

function resolveDictionary(value: Dictionary | undefined): Dictionary {
  const dict = value ?? defaultDictionary;
  if (!dict) {
    throw new Error(
      'rantjs: no dictionary. Pass { dictionary } or import from "rantjs".',
    );
  }
  return value ? indexDictionary(value) : dict;
}

function optionsFromSecond(second?: RantOptions | Dictionary): RantOptions {
  if (second == null) return {};
  if (isDictionary(second)) return { dictionary: second };
  return second;
}

function runAst(
  ast: Node[],
  options: RantOptions,
  rng: Rng,
  trace: QueryPick[] | null = null,
): string {
  const dict = resolveDictionary(options.dictionary);
  const ctx = createContext(rng, dict, options.nsfw ?? false, trace);
  return interpret(ast, ctx);
}

export function compile(
  pattern: string,
  defaults: RantOptions = {},
): Compiled {
  const ast = parse(pattern);
  return {
    run(options: RantOptions = {}): string {
      const merged: RantOptions = {
        dictionary: options.dictionary ?? defaults.dictionary,
        nsfw: options.nsfw ?? defaults.nsfw,
        seed: options.seed ?? defaults.seed,
      };
      return runAst(ast, merged, createRng(merged.seed));
    },
  };
}

export function createRant(options: RantOptions = {}): RantInstance {
  const defaultRng = createRng(options.seed);
  const baseDict = resolveDictionary(options.dictionary);
  const baseNsfw = options.nsfw ?? false;
  const cache = new Map<string, Node[]>();

  function astFor(pattern: string): Node[] {
    const hit = cache.get(pattern);
    if (hit) return hit;
    const ast = parse(pattern);
    if (cache.size >= CACHE_CAP) {
      const first = cache.keys().next().value;
      if (first !== undefined) cache.delete(first);
    }
    cache.set(pattern, ast);
    return ast;
  }

  const instance: RantInstance = {
    run(pattern: string, runOptions: RantOptions = {}): string {
      const rng: Rng =
        runOptions.seed !== undefined ? createRng(runOptions.seed) : defaultRng;
      return runAst(
        astFor(pattern),
        {
          dictionary: runOptions.dictionary ?? baseDict,
          nsfw: runOptions.nsfw ?? baseNsfw,
        },
        rng,
      );
    },
    compile(pattern: string): Compiled {
      const ast = astFor(pattern);
      return {
        run(runOptions: RantOptions = {}): string {
          const rng: Rng =
            runOptions.seed !== undefined
              ? createRng(runOptions.seed)
              : defaultRng;
          return runAst(
            ast,
            {
              dictionary: runOptions.dictionary ?? baseDict,
              nsfw: runOptions.nsfw ?? baseNsfw,
            },
            rng,
          );
        },
      };
    },
  };
  return instance;
}

export function rant(
  pattern: string,
  second?: RantOptions | Dictionary,
): string {
  const options = optionsFromSecond(second);
  return compile(pattern, options).run();
}

export function explain(
  pattern: string,
  second?: RantOptions | Dictionary,
): ExplainResult {
  const options = optionsFromSecond(second);
  const ast = parse(pattern);
  const picks: QueryPick[] = [];
  const text = runAst(ast, options, createRng(options.seed), picks);
  return { text, picks };
}

export type { QueryPick };
export type { Dictionary };
