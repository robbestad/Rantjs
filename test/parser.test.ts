import { describe, expect, it } from "vitest";
import { parse } from "../src/parse/parser.ts";
import { tokenize } from "../src/parse/lexer.ts";

describe("lexer", () => {
  it("tokenizes queries, tags, braces, and pipes", () => {
    const kinds = tokenize("{a|b}<noun>").map((t) => t.kind);
    expect(kinds).toEqual([
      "lbrace",
      "text",
      "pipe",
      "text",
      "rbrace",
      "query",
      "eof",
    ]);
  });

  it("treats \\C as an escape", () => {
    const tokens = tokenize("\\C");
    expect(tokens[0]).toEqual({ kind: "escape", code: "C" });
  });
});

describe("parser", () => {
  it("parses plain text", () => {
    expect(parse("Hello world")).toEqual([{ type: "text", value: "Hello world" }]);
  });

  it("parses a query with filter, sub, and carrier", () => {
    const nodes = parse("<firstname male :: hero>");
    expect(nodes).toEqual([
      {
        type: "query",
        table: "firstname",
        args: ["male"],
        carrier: "hero",
        raw: "firstname male :: hero",
      },
    ]);
  });

  it("parses dotted and dashed queries like 1.x", () => {
    expect(parse("<noun.plural>")[0]).toMatchObject({
      table: "noun",
      args: ["plural"],
    });
    expect(parse("<verb-transitive>")[0]).toMatchObject({
      table: "verb",
      args: ["transitive"],
    });
    expect(parse("<pron.poss-male>")[0]).toMatchObject({
      table: "pron",
      args: ["poss", "male"],
    });
  });

  it("parses a recall-only carrier", () => {
    expect(parse("<::hero>")[0]).toMatchObject({
      table: "",
      carrier: "hero",
    });
  });

  it("parses a block with multiple alternatives (issue #4)", () => {
    const nodes = parse("{<noun>|<adj>|<verb>}");
    expect(nodes[0]).toMatchObject({ type: "block" });
    if (nodes[0]?.type !== "block") throw new Error("expected block");
    expect(nodes[0].alternatives).toHaveLength(3);
  });

  it("parses plain text in a block (issue #4)", () => {
    const nodes = parse("{Example text}");
    expect(nodes[0]).toMatchObject({ type: "block" });
    if (nodes[0]?.type !== "block") throw new Error("expected block");
    expect(nodes[0].alternatives[0]).toEqual([
      { type: "text", value: "Example text" },
    ]);
  });

  it("parses nested blocks", () => {
    const nodes = parse("{a {b|c} d}");
    expect(nodes[0]?.type).toBe("block");
    if (nodes[0]?.type !== "block") throw new Error("expected block");
    const inner = nodes[0].alternatives[0]?.find((n) => n.type === "block");
    expect(inner).toBeTruthy();
  });

  it("parses tags with separator escapes", () => {
    const nodes = parse("[rep:3][sep:\\n][case:title]");
    expect(nodes).toEqual([
      { type: "tag", name: "rep", arg: "3" },
      { type: "tag", name: "sep", arg: "\n" },
      { type: "tag", name: "case", arg: "title" },
    ]);
  });
});
