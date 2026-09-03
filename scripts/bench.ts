import { gzipSync } from "node:zlib";
import { readFileSync, existsSync } from "node:fs";
import { rant, compile } from "../src/index.ts";

const CLASSIC =
  "<firstname male> likes to <verb-transitive> <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.";
const QUERY = "<noun-animal>";
const REPEAT = "[rep:50][sep:\\s]{<adj> <noun>}";

function time(label: string, n: number, fn: () => void): void {
  fn();
  const start = performance.now();
  for (let i = 0; i < n; i++) fn();
  const ms = performance.now() - start;
  process.stdout.write(
    `${label.padEnd(36)} ${(ms / n * 1e6).toFixed(0)} ns/op  (${n} × ${ms.toFixed(1)} ms)\n`,
  );
}

function gzipSize(path: string): string {
  if (!existsSync(path)) return "missing";
  return `${gzipSync(readFileSync(path)).length} B gzip`;
}

const compiled = compile(CLASSIC, { seed: 1 });

time("classic rant()", 2000, () => {
  rant(CLASSIC, { seed: 1 });
});
time("classic compile().run()", 2000, () => {
  compiled.run({ seed: 1 });
});
time("<noun-animal>", 5000, () => {
  rant(QUERY, { seed: 1 });
});
time("[rep:50] adj noun", 500, () => {
  rant(REPEAT, { seed: 1 });
});

process.stdout.write("\n");
process.stdout.write(`dist/index.js     ${gzipSize("dist/index.js")}\n`);
process.stdout.write(`dist/engine.js    ${gzipSize("dist/engine.js")}\n`);
process.stdout.write(`dist/rant.min.js  ${gzipSize("dist/rant.min.js")}\n`);
