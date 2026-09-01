# Rantjs

Procedural text for JavaScript. Write a pattern, get a sentence.

Inspired by [Rant](https://github.com/TheBerkin/rant3). This is the Rantjs dialect (`<noun>`, `[rep:3]{...}`), not a Rant 4 VM.

```js
import { rant } from "rantjs";

const sentence = rant(
  "<firstname male> likes to <verb-transitive> <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.",
);

console.log(sentence);
// 'Sean likes to chop parrots with his pet cat on Saturdays.'
```

```bash
npm install rantjs
npx rantjs --seed 42 '<firstname male> found [a] <noun-animal>.'
```

## Patterns

**Queries** pull a random dictionary entry. Filters and inflections can be separated with a space, dash, or dot:

```
<firstname male>
<noun-animal plural>
<verb.ed>
<pron poss male>
<yn yes>
```

**Blocks** choose an alternative. A block with no repeater runs once. `|` splits options. Nested braces work.

```
{heads|tails}
{Example text}
[rep:3][sep:\s]{click|clack}
```

**Tags**

| Tag | Effect |
| --- | --- |
| `[case:none\|default\|first\|word\|title\|upper\|lower\|sentence]` | Casing for the finished string |
| `[rep:n]` | Repeat the next block `n` times |
| `[sep:\s\|\n\|literal]` | Join those repetitions |
| `[a]` | Insert *a* or *an* before the next word |
| `[if:name]{then}{else}` | Branch on whether carrier `name` is set |

**Carriers** remember a result so a character stays the same person:

```
<firstname male :: hero> saw <::hero> in the <place>.
```

**Escapes:** `\C` is a random A–Z letter.

NSFW entries are omitted unless the query asks (`<noun nsfw>`) or you pass `{ nsfw: true }`.

## API

```ts
import { rant, createRant, enUS } from "rantjs";

rant(pattern);
rant(pattern, { seed: 42 });
rant(pattern, { seed: "chapter-1", nsfw: false, dictionary: enUS });
rant(pattern, customDictionary); // 1.x-compatible second argument

const r = createRant({ seed: 42 });
r.run(pattern);
r.run(pattern, { seed: 99 });
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
  import { rant } from "https://cdn.jsdelivr.net/npm/rantjs@2.0.0/+esm";
  document.body.textContent = rant("<greet> <firstname>.");
</script>
```

Script tag (cdnjs / jsDelivr):

```html
<script src="https://cdn.jsdelivr.net/npm/rantjs@2.0.0/dist/rant.min.js"></script>
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
npm run demo          # playground at http://localhost:5173
```

Dictionary sources live in `vocab/` (Rantionary plus a few custom tables). `npm run build:dict` compiles them into `src/dictionaries/en-US.ts`.

The playground is `npm run demo`. After GitHub Pages is enabled it will live at `https://robbestad.github.io/Rantjs/`.

## Migrating from 1.x

- Node 18+.
- `import { rant } from "rantjs"` (or `require("rantjs").rant`).
- `window.rant` is only set by the IIFE browser file, not by `require("rantjs")`.
- `String.prototype` is no longer patched.
- Some dictionary words changed; the query syntax did not.

## License

ISC
