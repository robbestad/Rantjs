import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
      engine: "src/engine.ts",
      dic: "src/dic.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    treeshake: true,
    target: "es2022",
  },
  {
    entry: { cli: "src/cli.ts" },
    format: ["esm"],
    splitting: false,
    sourcemap: true,
    clean: false,
    target: "es2022",
    banner: { js: "#!/usr/bin/env node" },
  },
  {
    entry: { "rant.min": "src/browser.ts" },
    format: ["iife"],
    globalName: "rant",
    minify: true,
    sourcemap: true,
    platform: "browser",
    target: "es2018",
    clean: false,
    footer: {
      js: "if (typeof rant !== 'undefined' && rant.default) { rant = rant.default; }",
    },
    outExtension() {
      return { js: ".js" };
    },
  },
]);
