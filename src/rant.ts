import { parse } from "./parse/parser.ts";
import { interpret } from "./interpret.ts";
import { createRng, type Rng } from "./rng.ts";
import {
  fromLegacy,
  isDictionary,
  isLegacyDictionary,
  type Dictionary,
} from "./dictionary/types.ts";
import { enUS } from "./dictionaries/en-US.ts";
import { createContext } from "./runtime.ts";

export interface RantOptions {
  seed?: number | string;
  dictionary?: Dictionary;
  nsfw?: boolean;
}

export interface RantInstance {
  run(pattern: string, options?: RantOptions): string;
  channels: Record<string, string>;
}

function resolveDictionary(value: Dictionary | undefined): Dictionary {
  return value ?? enUS;
}

function optionsFromSecond(
  second?: RantOptions | Dictionary | unknown,
): RantOptions {
  if (second == null) return {};
  if (isDictionary(second)) return { dictionary: second };
  if (isLegacyDictionary(second)) {
    return { dictionary: fromLegacy(second) };
  }
  if (typeof second === "object") {
    return second as RantOptions;
  }
  return {};
}

export function createRant(options: RantOptions = {}): RantInstance {
  const defaultRng = createRng(options.seed);
  const baseDict = resolveDictionary(options.dictionary);
  const baseNsfw = options.nsfw ?? false;
  const instance: RantInstance = {
    channels: {},
    run(pattern: string, runOptions: RantOptions = {}): string {
      const rng: Rng =
        runOptions.seed !== undefined ? createRng(runOptions.seed) : defaultRng;
      const ctx = createContext(
        rng,
        runOptions.dictionary ?? baseDict,
        runOptions.nsfw ?? baseNsfw,
      );
      const out = interpret(parse(pattern), ctx);
      instance.channels = ctx.channels;
      return out;
    },
  };
  return instance;
}

export function rant(
  pattern: string,
  second?: RantOptions | Dictionary | unknown,
): string {
  const options = optionsFromSecond(second);
  return createRant(options).run(pattern);
}

export type { Dictionary };
export { enUS };
