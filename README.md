# Rantjs

**Write a pattern. Get a sentence.** A seeded procedural-text engine for JavaScript — names, verbs, places, and the glue between them — without a template language, a model call, or a bag of `Math.random()`.

[Live demo](https://rantjs.vercel.app) · Inspired by [Rant](https://github.com/TheBerkin/rant3). This is the Rantjs dialect (`<noun>`, `[rep:3]{...}`), not a Rant 4 VM.

```js
import { rant } from "rantjs";

rant(
  "<firstname male> likes to <verb-transitive> <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.",
);
// 'Sean likes to chop parrots with his pet cat on Saturdays.'
```

```bash
npm install rantjs
npx rantjs --seed 42 '<firstname male> found [a] <noun-animal>.'
```

## Why Rantjs

- **One function.** `rant(pattern)` returns a string. Compile the pattern when you will run it more than once.
- **Repeatable.** The same pattern plus the same seed is the same sentence. That makes tests, save games, and LLM pipelines honest.
- **Characters stay themselves.** Name a result once (`<firstname male :: hero>`) and reuse it (`<::hero>`) so the hero does not change gender mid-paragraph.
- **A real dictionary.** Compiled from Rantionary, indexed by class. Queries do not scan the whole noun table to find animals.
- **A small language.** Queries, weighted blocks, repeaters, articles, case, synchronizers. You describe the *shape* of the text; the dictionary fills it.
- **Runs everywhere.** ESM, CommonJS, CLI, and a minified browser IIFE. The Node build does not touch `window`. Import `rantjs/engine` if you want the interpreter without English.
- **NSFW is a flag.** Entries tagged `nsfw` stay out unless you pass `{ nsfw: true }` or query that class. The shipped English dictionary has none.

Use it for NPC chatter, item flavor, test fixtures, prompt variation, worldbuilding, and any place a hardcoded string would go stale.

## Give it to an LLM

Paste the block below into ChatGPT, Codex, Claude, or another coding assistant, then replace the bracketed brief. It is enough for the model to call `rant()` and write valid patterns.

```text
Build [DESCRIBE THE FEATURE] using rantjs, a procedural text generator for JavaScript.

Install: npm install rantjs
Import: import { rant, compile, createRant, explain, enUS } from "rantjs";

API:
- rant(pattern, options?: { seed?: number | string, nsfw?: boolean, dictionary?: Dictionary }): string
- rant(pattern, customDictionary)
- compile(pattern, defaults?) -> { run(options?) }   // parse once, run many
- createRant(options) -> { run(pattern, options?), compile(pattern) }
  Unseeded run() calls on one instance share one RNG stream.
- explain(pattern, options?) -> { text, picks }      // which dictionary rows were chosen
- Engine only (no English dictionary): import { rant } from "rantjs/engine"
- .dic compiler: import { compileDic } from "rantjs/dic"

Rules:
- Do not concatenate random words yourself. Write a Rantjs pattern and call rant() or compile().
- Pass a seed when output must be repeatable (tests, saved content, screenshots).
- Do not invent dictionary tables. Use only the tables listed below.
- Filters and inflections go inside the query. Separators may be space, dash, or dot: <noun animal plural>, <noun-animal plural>, <verb.ed> are the same idea.
- Unknown tags throw. Do not use channels, subroutines, query builders, or replacers — those are gone in 3.0.
- this is NOT React. There is no component API in rantjs.

Pattern dialect:
- Query: <table filter inflection>
- Carrier (remember a value): <firstname male :: hero> … <::hero>
  Unique (no repeats in one run): <noun-animal ::!pet>
- Block (pick one): {heads|tails}     Weighted: {(80)common|(20)rare}
- Repeat next block: [rep:3]{x}       Join: [sep:\s] or [sep:\n] or [rs:3;.]
- Article: [a] next word becomes "a" or "an"
- Case for the finished string: [case:none|first|word|title|upper|lower|sentence]
- Integer: [n:min;max]     Format: [numfmt:verbal|roman|hex]
- Branch: [if:carrier]{then}{else}
- Chance the next block runs: [chance:50]{maybe}
- Lock two blocks to the same pick: [x:name;locked]{A|B}[x:name;locked]{A|B}
- Random A–Z letter: \C
- Nested braces are allowed. Unknown queries are left in the output; they do not print "undefined".

Dictionary tables (en-US):
abstract, activity, adj, adv, alien, amount, color, conj, country, em, emo,
face, faced, firstname (alias: name), greet, noun, place, prefix, prepos,
preposition (alias: with), pron (alias: pro), quality, rel, say, sconj,
sound, substance, surname, timeadv, timenoun, title, unit, verb, verbimg,
vocal, x, yn

Useful filters / inflections:
- firstname: male, female
- noun: plural (alias pl), animal, tool, surface, furniture, body, liquid,
  insect, clothes, plant, person, ball, fruit, container, job, weapon, food,
  vehicle, shape
- verb: transitive, intransitive, ed, ing, s
- pron: poss, male, female, acc, nom, self
- yn: yes, no
- timenoun: dayofweek, month, holiday, plural
- rel: male, female
- adj, adv, place, color, greet, title, country work as <table> with optional class filters

Custom dictionary shape if you must add words:
{
  tables: {
    pet: {
      name: "pet",
      subs: ["default", "plural"],
      entries: [{ forms: ["capybara", "capybaras"], classes: ["animal"] }],
    },
  },
}

Browser without a bundler:
<script type="module">
  import { rant } from "https://cdn.jsdelivr.net/npm/rantjs@3.0.0/+esm";
</script>
or
<script src="https://cdn.jsdelivr.net/npm/rantjs@3.0.0/dist/rant.min.js"></script>
<!-- IIFE assigns rant on globalThis. The Node/ESM build does not. -->

Return working code. Prefer one or two rich patterns over many tiny ones.
```

## Patterns

**Queries** pull a random dictionary entry:

```
<firstname male>
<noun-animal plural>
<verb.ed>
<pron poss male>
<yn yes>
```

**Blocks** choose an alternative. A block with no repeater runs once. `|` splits options. Nested braces work. Prefix an option with `(weight)` to bias it.

```
{heads|tails}
{Example text}
[rep:3][sep:\s]{click|clack}
{(80)common|(20)rare}
```

**Tags**

| Tag | Effect |
| --- | --- |
| `[case:none\|default\|first\|word\|title\|upper\|lower\|sentence]` | Casing for the finished string |
| `[rep:n]` | Repeat the next block `n` times |
| `[sep:\s\|\n\|literal]` | Join those repetitions |
| `[rs:n;sep]` | Repeat and join in one tag |
| `[n:min;max]` | Random integer in range |
| `[numfmt:verbal\|roman\|hex]` | How `[n]` / `[rn]` print |
| `[a]` | Insert *a* or *an* before the next word |
| `[if:name]{then}{else}` | Branch on whether carrier `name` is set |
| `[chance:p]{…}` | Run the next block with probability `p` (0–100) |
| `[x:name;locked\|deck\|forward\|no-repeat]` | Synchronize later blocks |

**Carriers** remember a result so a character stays the same person:

```
<firstname male :: hero> saw <::hero> in the <place>.
```

**Escapes:** `\C` is a random A–Z letter.

Entries tagged `nsfw` are omitted unless the query asks (`<noun nsfw>`) or you pass `{ nsfw: true }`. The shipped English dictionary does not include any.

Unknown tags throw. Unknown query tables are left in the output as `<raw>`.

## API

```ts
import { rant, compile, createRant, explain, enUS } from "rantjs";

rant(pattern);
rant(pattern, { seed: 42 });
rant(pattern, { seed: "chapter-1", dictionary: enUS });

const line = compile(pattern);
line.run({ seed: 1 });
line.run({ seed: 2 });

const r = createRant({ seed: 42 });
r.run(pattern);
r.compile(pattern).run();

explain(pattern, { seed: 1 });
// { text, picks: [{ table, args, value, carrier }] }
```

Custom dictionary shape:

```ts
const pets = {
  tables: {
    pet: {
      name: "pet",
      subs: ["default", "plural"],
      entries: [{ forms: ["capybara", "capybaras"], classes: ["animal"] }],
    },
  },
};
```

## Browser

ESM:

```html
<script type="module">
  import { rant } from "https://cdn.jsdelivr.net/npm/rantjs@3.0.0/+esm";
  document.body.textContent = rant("<greet> <firstname>.");
</script>
```

Script tag (cdnjs / jsDelivr):

```html
<script src="https://cdn.jsdelivr.net/npm/rantjs@3.0.0/dist/rant.min.js"></script>
<script>
  document.body.textContent = rant("<greet> <firstname>.");
</script>
```

The IIFE build assigns `rant` on `globalThis`. The Node/ESM build does not touch `window`.

## CLI

```bash
rantjs '<pattern>'
rantjs --seed 7 -f story.rant
rantjs --nsfw '<adj nsfw> <noun>'
```

## Development

```bash
npm install
npm test
npm run bench
npm run demo          # playground at http://localhost:5173
```

Dictionary sources live in `vocab/` (Rantionary plus a few custom tables). `npm run build:dict` compiles them into `src/dictionaries/en-US.ts`.

The playground is a [SvenJS 3.2.1](https://svenjs.vercel.app/) app (`npm run demo`). The live demo is at [rantjs.vercel.app](https://rantjs.vercel.app).

[![SvenJS](demo/svenjs-mark.svg)](https://svenjs.vercel.app/)

UI built with SvenJS 3.2.1.

## Migrating from 2.x

- Node 20+.
- `compile(pattern)` and `explain(pattern)` are new. `createRant().channels` is gone.
- Unknown tags throw instead of no-oping.
- 1.x-shaped dictionaries (`{ tokens, pet: { all: [...] } }`) are no longer accepted. Pass `{ dictionary: { tables } }`.
- Rhyme carriers (`::&id`), channels, subroutines, query builders, replacers, and targets are removed. Use match/unique carriers and JavaScript for the rest.
- Pronunciation strings are not in the shipped dictionary (they existed only for rhyme).
- `{ nsfw: true }` still admits `nsfw`-class entries in *your* dictionary. The shipped English tables have none.
- `parse`, `compileDic`, and `createRng` are not root exports. Use `rantjs/dic` for the `.dic` compiler.
- `import { rant } from "rantjs/engine"` is the interpreter without English.

## Migrating from 1.x

- Node 20+.
- `import { rant } from "rantjs"` (or `require("rantjs").rant`).
- `window.rant` is only set by the IIFE browser file, not by `require("rantjs")`.
- `String.prototype` is no longer patched.

## License

ISC
