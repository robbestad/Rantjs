import { describe, expect, it } from "vitest";
import { main } from "../src/cli.ts";

describe("cli", () => {
  it("prints help", () => {
    const chunks: string[] = [];
    const orig = process.stdout.write.bind(process.stdout);
    process.stdout.write = ((chunk: string) => {
      chunks.push(String(chunk));
      return true;
    }) as typeof process.stdout.write;
    try {
      expect(main(["--help"])).toBe(0);
      expect(chunks.join("")).toMatch(/Usage: rantjs/);
    } finally {
      process.stdout.write = orig;
    }
  });

  it("generates a seeded pattern", () => {
    const chunks: string[] = [];
    const orig = process.stdout.write.bind(process.stdout);
    process.stdout.write = ((chunk: string) => {
      chunks.push(String(chunk));
      return true;
    }) as typeof process.stdout.write;
    try {
      expect(main(["--seed", "1", "[case:none]{ok}"])).toBe(0);
      expect(chunks.join("").trim()).toBe("ok");
    } finally {
      process.stdout.write = orig;
    }
  });
});
