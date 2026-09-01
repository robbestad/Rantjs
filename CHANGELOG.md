# Changelog

## 2.1.0

Rant 3 generator kit so official-style samples can run.

- Fix `npx rantjs` (CLI always runs; no more silent no-op)
- Weighted blocks `(20)common|(1)rare`
- `[n:min;max]`, `[numfmt:verbal|roman|hex]`, `[rs]`, `[rn]`
- Synchronizers `[x:name;locked|deck|forward|no-repeat]`
- Unique / rhyme carriers (`::!id`, `::&id`) plus `::=id`
- Channels, `[protect]`, `[chance]`, `[len]`, `[quote]`
- Query builders, replacers, subroutines (initial)
- Rant 3 aliases: `name`→firstname, `pl`→plural, `pro`→pron
- Node 20+ (Vitest 4 / Vite 8 need `util.styleText`; Node 18 is EOL)

## 2.0.0

Rantjs is rewritten in TypeScript. The pattern dialect is the same; the engine, package, and demo are new.

### Added
- Seeded generation (`{ seed }` or `createRant({ seed })`)
- Real blocks: plain text, `{a|b|c}` choice, nesting, default one evaluation
- Indefinite article `[a]`
- Query carriers (`<firstname male :: hero>`, `<::hero>`)
- Conditionals `[if:carrier]{then}{else}`
- Dual ESM/CJS package with types
- Browser IIFE at `dist/rant.js` / `dist/rant.min.js` (no `window` access in Node)
- CLI: `npx rantjs '<pattern>'`
- `.dic` compiler for Rantionary
- Vite playground

### Fixed
- Node usage crashed on `window.rant` (#12)
- Blocks ignored plain text, alternatives, and missing `[rep]` (#4)
- Dictionary parser could not build current Rantionary (#9)
- Prototype pollution (`String.prototype`)
- Dictionary rebuilt and mutated on every call

### Breaking
- Node 18+
- No `window.rant` in the Node/ESM build
- No Gulp demo server
- Default dictionary is recompiled from Rantionary, so some words differ
- Bower is not supported; use npm or a CDN

### Removed
- Gulp, Browserify, Karma, Istanbul, Perl parsers, jQuery demo, ZeroClipboard
