import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        sw: resolve(__dirname, "/public/sw.js"), // <- ini untuk service worker
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "sw") {
            return "sw.bundle.js";
          }
          return "[name].bundle.js";
        },
      },
    },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    // filename: "[name].bundle.js",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "localhost",
    port: 5173,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
  },
});
