import {
  compile,
  createRant,
  enUS,
  explain,
  rant as run,
} from "./index.ts";

const api = Object.assign(run, { compile, createRant, explain, enUS, rant: run });

export default api;
