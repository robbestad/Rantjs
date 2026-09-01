import { rant } from "rantjs";

const patternEl = document.querySelector<HTMLTextAreaElement>("#pattern")!;
const outputEl = document.querySelector<HTMLTextAreaElement>("#output")!;
const seedEl = document.querySelector<HTMLInputElement>("#seed")!;
const statusEl = document.querySelector<HTMLParagraphElement>("#status")!;
const examplesEl = document.querySelector<HTMLDivElement>("#examples")!;

const examples = [
  "<firstname male> likes to <verb-transitive> <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.",
  "[case:title][sep:\\n][rep:3]{I like <noun animal plural> but not <noun animal plural>}",
  "{heads|tails} — the coin says {heads|tails}.",
  "<firstname male :: hero> walked into the <place> with <pron poss male> <noun-animal>. <::hero> did not knock.",
  "A random string: [rep:8]{\\C}",
  "[a] <adj> <noun-animal> <verb.ed> [a] <noun>.",
];

patternEl.value = examples[0] ?? "";

function parseSeed(value: string): number | string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function run(): void {
  statusEl.hidden = true;
  const pattern = patternEl.value;
  if (!pattern.trim()) {
    outputEl.value = "";
    statusEl.hidden = false;
    statusEl.textContent = "Write a pattern first.";
    return;
  }
  try {
    outputEl.value = rant(pattern, { seed: parseSeed(seedEl.value) });
  } catch (err) {
    outputEl.value = "";
    statusEl.hidden = false;
    statusEl.textContent = err instanceof Error ? err.message : String(err);
  }
}

function newSeed(): void {
  seedEl.value = String(Math.floor(Math.random() * 1_000_000_000));
  run();
}

document.querySelector("#run")!.addEventListener("click", run);
document.querySelector("#reseed")!.addEventListener("click", newSeed);
document.querySelector("#copy")!.addEventListener("click", async () => {
  if (!outputEl.value) return;
  try {
    await navigator.clipboard.writeText(outputEl.value);
    statusEl.hidden = false;
    statusEl.textContent = "Copied.";
  } catch {
    outputEl.select();
    statusEl.hidden = false;
    statusEl.textContent = "Select the output and copy it.";
  }
});

for (const example of examples) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = example;
  button.addEventListener("click", () => {
    patternEl.value = example;
    run();
  });
  examplesEl.append(button);
}

run();
