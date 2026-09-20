import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname),
  publicDir: resolve(__dirname, "../public"),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "../hostinger-dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        candidate: resolve(__dirname, "candidate-response/index.html"),
      },
    },
  },
});
