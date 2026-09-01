import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { main } from "../src/cli-main.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

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

  it("prints when spawned as a process (npx-style)", () => {
    const r = spawnSync(
      "npx",
      ["tsx", "src/cli.ts", "--seed", "1", "[case:none]{ok}"],
      { encoding: "utf8", cwd: root },
    );
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe("ok");
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
