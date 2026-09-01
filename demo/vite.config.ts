import { defineConfig } from "vite";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  base: "./",
  resolve: {
    alias: {
      rantjs: join(root, "..", "src", "index.ts"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
