import { parse } from "./parse/parser.ts";
import { interpret, type InterpretContext } from "./interpret.ts";
import { createRng, type Rng } from "./rng.ts";
import {
  fromLegacy,
  isDictionary,
  isLegacyDictionary,
  type Dictionary,
} from "./dictionary/types.ts";
import { enUS } from "./dictionaries/en-US.ts";

export interface RantOptions {
  seed?: number | string;
  dictionary?: Dictionary;
  nsfw?: boolean;
}

export interface RantInstance {
  run(pattern: string, options?: RantOptions): string;
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

function makeContext(
  options: RantOptions,
  rng: Rng,
  carriers?: Map<string, string>,
): InterpretContext {
  return {
    rng,
    dictionary: resolveDictionary(options.dictionary),
    nsfw: options.nsfw ?? false,
    carriers: carriers ?? new Map(),
    caseMode: "default",
  };
}

export function createRant(options: RantOptions = {}): RantInstance {
  const defaultRng = createRng(options.seed);
  const baseDict = resolveDictionary(options.dictionary);
  const baseNsfw = options.nsfw ?? false;

  return {
    run(pattern: string, runOptions: RantOptions = {}): string {
      const rng =
        runOptions.seed !== undefined ? createRng(runOptions.seed) : defaultRng;
      const ctx = makeContext(
        {
          dictionary: runOptions.dictionary ?? baseDict,
          nsfw: runOptions.nsfw ?? baseNsfw,
        },
        rng,
      );
      return interpret(parse(pattern), ctx);
    },
  };
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
