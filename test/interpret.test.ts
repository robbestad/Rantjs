import { describe, expect, it } from "vitest";
import { parse } from "../src/parse/parser.ts";
import { interpret } from "../src/interpret.ts";
import { createRng } from "../src/rng.ts";
import type { Dictionary } from "../src/dictionary/types.ts";

const emptyDict: Dictionary = { tables: {} };

function run(pattern: string, seed = 1): string {
  return interpret(parse(pattern), {
    rng: createRng(seed),
    dictionary: emptyDict,
    nsfw: false,
    carriers: new Map(),
    caseMode: "none",
  });
}

describe("blocks and repeaters", () => {
  it("prints plain text in a block once by default (issue #4)", () => {
    expect(run("{Example text}")).toBe("Example text");
  });

  it("repeats plain text with [rep]", () => {
    expect(run("[rep:3]{x}")).toBe("xxx");
  });

  it("joins repetitions with a space separator", () => {
    expect(run("[sep:\\s][rep:3]{x}")).toBe("x x x");
  });

  it("joins repetitions with a newline", () => {
    expect(run("[sep:\\n][rep:2]{x}")).toBe("x\nx");
  });

  it("picks one alternative from a block", () => {
    const a = run("{alpha|alpha|alpha}");
    expect(a).toBe("alpha");
  });

  it("selects independently each repetition", () => {
    const out = run("[rep:5]{A|B}");
    expect(out).toMatch(/^[AB]{5}$/);
  });

  it("expands \\C", () => {
    expect(run("[rep:8]{\\C}")).toMatch(/^[A-Z]{8}$/);
  });
});

describe("case", () => {
  it("uppercases", () => {
    expect(run("[case:upper]hello")).toBe("HELLO");
  });

  it("lowercases", () => {
    expect(run("[case:lower]HELLO")).toBe("hello");
  });

  it("title-cases small words", () => {
    expect(run("[case:title]i like all the big butts")).toBe(
      "I Like All the Big Butts",
    );
  });

  it("sentence-cases", () => {
    expect(run("[case:sentence]i. like. big. butts")).toBe("I. Like. Big. Butts");
  });

  it("word-cases", () => {
    expect(run("[case:word]I LIKE BIG BUTTS")).toBe("I Like Big Butts");
  });
});

describe("rng", () => {
  it("is deterministic for a given seed", () => {
    expect(run("[rep:12]{A|B|C|D}", 42)).toBe(run("[rep:12]{A|B|C|D}", 42));
    expect(run("[rep:12]{A|B|C|D}", 42)).not.toBe(run("[rep:12]{A|B|C|D}", 43));
  });
});

describe("articles", () => {
  it("prefixes a/an based on the next word", () => {
    expect(run("[case:none][a]ogre")).toBe("an ogre");
    expect(run("[case:none][a]turtle")).toBe("a turtle");
    expect(run("[case:none][a] <noun>", 1)).toMatch(/^(a|an) /);
  });
});

describe("conditionals and carriers without a dictionary", () => {
  it("takes the else branch when a carrier is missing", () => {
    expect(run("[case:none][if:hero]{yes}{no}")).toBe("no");
  });
});
