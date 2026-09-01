import { rant as run, createRant, enUS } from "./rant.ts";

const api = Object.assign(run, { createRant, enUS, rant: run });

export default api;
