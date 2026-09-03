import { defineConfig } from "vite";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  base: "./",
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "svenjs",
  },
  resolve: {
    alias: {
      rantjs: join(root, "..", "src", "index.ts"),
    },
  },
  optimizeDeps: {
    exclude: ["svenjs"],
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
