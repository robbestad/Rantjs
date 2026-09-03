import { describe, expect, it } from "vitest";
import { compile, createRant, explain, rant } from "../src/index.ts";

describe("rant()", () => {
  it("returns a non-empty sentence for the classic example", () => {
    const sentence = rant(
      "<firstname male> likes to <verb-transitive> <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.",
    );
    expect(sentence).not.toMatch(/<|>|undefined/);
    expect(sentence.length).toBeGreaterThan(20);
  });

  it("is repeatable with a seed", () => {
    const a = rant("{A|B|C}<noun>", { seed: 7 });
    const b = rant("{A|B|C}<noun>", { seed: 7 });
    expect(a).toBe(b);
  });

  it("does not touch window", () => {
    expect(typeof (globalThis as { window?: unknown }).window).toBe("undefined");
  });

  it("leaves unknown queries in place instead of printing undefined", () => {
    const out = rant("[case:none]<notatoken xyz>", { seed: 1 });
    expect(out).toContain("<notatoken xyz>");
    expect(out).not.toContain("undefined");
  });

  it("filters by class and sub", () => {
    const r = createRant({ seed: 99 });
    for (let i = 0; i < 20; i++) {
      expect(r.run("[case:none]<yn yes>")).toMatch(/yes|yep|ya|affirm|absolute|certain|definite|hell|indeed|obvious|undeni|undoubt|without|agree/i);
      expect(r.run("[case:none]<yn no>")).toMatch(/no|not|negative|impossible/i);
    }
  });

  it("returns plural nouns", () => {
    const word = rant("[case:none]<noun-animal plural>", { seed: 3 });
    expect(word).not.toMatch(/<|>/);
    expect(word.length).toBeGreaterThan(1);
  });

  it("recalls a carrier", () => {
    const out = rant(
      "[case:none]<firstname male :: hero> and <::hero>",
      { seed: 11 },
    );
    const [a, b] = out.split(" and ");
    expect(a).toBe(b);
    expect(a).toBeTruthy();
  });

  it("uses [if] with a carrier", () => {
    const hit = rant("[case:none]<firstname :: x>[if:x]{yes}{no}", { seed: 1 });
    expect(hit.endsWith("yes")).toBe(true);
    const miss = rant("[case:none][if:x]{yes}{no}", { seed: 1 });
    expect(miss).toBe("no");
  });

  it("prefixes [a] on a query", () => {
    const out = rant("[case:none][a]<noun animal>", { seed: 2 });
    expect(out).toMatch(/^(a|an) /);
  });

  it("accepts a custom dictionary", () => {
    const out = rant("[case:none]<pet>", {
      dictionary: {
        tables: {
          pet: {
            name: "pet",
            subs: ["default"],
            entries: [{ forms: ["capybara"], classes: [] }],
          },
        },
      },
    });
    expect(out).toBe("capybara");
  });

  it("omits nsfw entries unless the flag is set", () => {
    const dict = {
      tables: {
        pet: {
          name: "pet",
          subs: ["default"],
          entries: [
            { forms: ["capybara"], classes: [] },
            { forms: ["forbidden"], classes: ["nsfw"] },
          ],
        },
      },
    };
    for (let i = 0; i < 20; i++) {
      expect(rant("[case:none]<pet>", { seed: i, dictionary: dict })).toBe(
        "capybara",
      );
    }
    const wild = new Set(
      Array.from({ length: 40 }, (_, i) =>
        rant("[case:none]<pet>", { seed: i, dictionary: dict, nsfw: true }),
      ),
    );
    expect(wild.has("forbidden")).toBe(true);
  });

  it("throws on an unknown tag", () => {
    expect(() => rant("[nope]hi", { seed: 1 })).toThrow(/Unknown tag/);
  });

  it("does not repeat unique carrier forms", () => {
    const out = rant(
      "[case:none]<yn yes ::!a> <yn yes ::!a> <yn yes ::!a>",
      { seed: 4 },
    );
    const words = out.split(/\s+/);
    expect(new Set(words).size).toBe(words.length);
  });
});

describe("compile and explain", () => {
  it("compile().run matches rant() for a seed", () => {
    const pattern =
      "<firstname male> likes to <verb-transitive> <noun.plural>.";
    const a = rant(pattern, { seed: 42 });
    const b = compile(pattern).run({ seed: 42 });
    expect(b).toBe(a);
  });

  it("keeps seeded goldens stable", () => {
    expect(
      rant(
        "<firstname male> likes to <verb-transitive> <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.",
        { seed: 42 },
      ),
    ).toBe("Elias likes to crush fans with his pet bat on Sundays.");
    expect(
      rant(
        "[case:none]<firstname male :: hero> walked into the <place> with <pron poss male> <noun-animal>. <::hero> did not knock.",
        { seed: 42 },
      ),
    ).toBe("Elias walked into the alley with his peacock. Elias did not knock.");
  });

  it("explain lists dictionary picks", () => {
    const { text, picks } = explain(
      "[case:none]<firstname male :: hero> and <::hero>",
      { seed: 11 },
    );
    expect(text.split(" and ")[0]).toBe(text.split(" and ")[1]);
    expect(picks.length).toBeGreaterThanOrEqual(1);
    expect(picks[0]?.table).toBe("firstname");
    expect(picks[0]?.carrier).toBe("hero");
  });
});

describe("createRant", () => {
  it("shares a stream across runs when unseeded per call", () => {
    const r = createRant({ seed: 5 });
    const a = r.run("{A|B|C|D|E|F|G|H}");
    const b = r.run("{A|B|C|D|E|F|G|H}");
    // Same instance, advancing rng — may or may not differ; reseeding must match:
    expect(r.run("{A|B|C|D|E|F|G|H}", { seed: 5 })).toBe(
      createRant({ seed: 5 }).run("{A|B|C|D|E|F|G|H}"),
    );
    expect(a.length).toBe(1);
    expect(b.length).toBe(1);
  });
});

const oldPatterns = [
  "<verb>",
  "<verb-transitive>",
  "<verb.ed>",
  "<pron.poss-male>",
  "<title>",
  "<firstname male>",
  "<firstname female>",
  "<yn yes>",
  "<yn no>",
  "<timenoun month>",
  "<timenoun dayofweek>",
  "<adv>",
  "<adv-sexy>",
  "<adv-emotion>",
  "<adj>",
  "<noun>",
  "<noun.plural>",
  "<noun-animal>",
  "<noun-tool>",
  "<noun-surface>",
  "<noun-furniture>",
  "<noun-body>",
  "<noun-liquid>",
  "<noun-insect>",
  "<noun-clothes>",
  "<noun-plant>",
  "<noun-person>",
  "<noun-ball>",
  "<noun-fruit>",
  "<noun-container>",
  "<noun-job>",
  "<noun-weapon>",
  "<noun-food>",
  "<noun-vehicle>",
  "<noun-shape>",
  "<color>",
  "<rel>",
  "<rel female>",
  "<rel male>",
  "<conj>",
  "<face>",
  "The <adj> <noun> <adv> <verb.ed> the <adj> <noun> on the <noun-surface>",
  "I like my <noun-shape>-shaped <noun-body.plural>",
  "[case:title][sep:n][rep:3]{I like <noun animal plural> but not <noun animal plural>}",
];

describe("legacy pattern fixtures", () => {
  it.each(oldPatterns)("does not leave tokens or undefined in %s", (pattern) => {
    const result = rant(pattern, { seed: 123 });
    expect(result, result).not.toMatch(/undefined/);
    expect(result, result).not.toMatch(/<|>/);
    expect(result.trim().length).toBeGreaterThan(0);
  });
});
