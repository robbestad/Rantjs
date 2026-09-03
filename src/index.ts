import { setDefaultDictionary } from "./engine.ts";
import { enUS } from "./dictionaries/en-US.ts";

setDefaultDictionary(enUS);

export {
  compile,
  createRant,
  explain,
  rant,
} from "./engine.ts";
export type {
  Compiled,
  ExplainResult,
  QueryPick,
  RantInstance,
  RantOptions,
} from "./engine.ts";
export type { Dictionary, Entry, Table } from "./dictionary/types.ts";
export { enUS };
