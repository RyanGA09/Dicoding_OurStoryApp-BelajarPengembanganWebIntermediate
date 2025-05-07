import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, "src"),
  // publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
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

// // vite.config.js
// import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";
// import path from "path";

// export default defineConfig({
//   plugins: [
//     VitePWA({
//       registerType: "autoUpdate",
//       manifest: {
//         name: "OurStoryApp",
//         short_name: "OurStory",
//         description: "Bagikan cerita dari manapun dengan lokasi dan foto",
//         theme_color: "#ffffff",
//         background_color: "#ffffff",
//         display: "standalone",
//         start_url: "/",
//         icons: [
//           {
//             src: "icons/icon-192x192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "icons/icon-512x512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//         ],
//       },
//       workbox: {
//         runtimeCaching: [
//           {
//             urlPattern: /^https:\/\/story-api\.dicoding\.dev\//,
//             handler: "NetworkFirst",
//             options: {
//               cacheName: "ourstory-api-cache",
//             },
//           },
//         ],
//       },
//       devOptions: {
//         enabled: true,
//         type: "module",
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
