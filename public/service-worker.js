// const CACHE_NAME = "my-app-cache-v1";
// const ASSETS_TO_CACHE = [
//   "/",
//   "/index.html",
//   "/public/favicon.png",
//   "/scripts/pages/app.js",
//   "/scripts/routes/routes.js",
//   "/scripts/routes/url-parser.js",
//   "/styles/styles.css",
// ];

// // Install event: caching assets saat service worker di-install
// self.addEventListener("install", (event) => {
//   console.log("[Service Worker] Installing...");
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("[Service Worker] Caching app shell");
//       return cache.addAll(ASSETS_TO_CACHE);
//     })
//   );
//   self.skipWaiting(); // Memaksa service worker untuk segera aktif
// });

// // Activate event: membersihkan cache lama
// self.addEventListener("activate", (event) => {
//   console.log("[Service Worker] Activating...");
//   event.waitUntil(
//     caches
//       .keys()
//       .then((cacheNames) =>
//         Promise.all(
//           cacheNames.map((cacheName) => {
//             if (cacheName !== CACHE_NAME) {
//               console.log("[Service Worker] Deleting old cache:", cacheName);
//               return caches.delete(cacheName);
//             }
//           })
//         )
//       )
//       .then(() => self.clients.claim()) // Memastikan Service Worker aktif untuk seluruh aplikasi
//   );
// });

// // Fetch event: menangkap request dan menerapkan cache-first strategy
// self.addEventListener("fetch", (event) => {
//   // Jangan tangani request POST dalam cache
//   if (event.request.method === "POST") {
//     return fetch(event.request); // Langsung kirimkan request POST tanpa caching
//   }

//   // Hanya tangani GET request saja untuk caching
//   if (event.request.method !== "GET") {
//     return;
//   }

//   // Bypass cache untuk halaman login dan subscribe
//   if (
//     event.request.url.includes("/login") ||
//     event.request.url.includes("/notifications/subscribe")
//   ) {
//     return fetch(event.request);
//   }

//   // Bypass cache untuk endpoint cerita (selalu ambil fresh)
//   if (event.request.url.includes("/v1/stories")) {
//     console.log(
//       "[Service Worker] Fetching fresh stories from network:",
//       event.request.url
//     );
//     return fetch(event.request);
//   }

//   // Cache-first strategy untuk request GET lainnya
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((response) => {
//         if (response) {
//           console.log(
//             "[Service Worker] Serving from cache:",
//             event.request.url
//           );
//           return response;
//         }

//         console.log(
//           "[Service Worker] Fetching from network:",
//           event.request.url
//         );
//         return fetch(event.request).then((networkResponse) => {
//           // Simpan hasil response untuk request GET ke cache
//           return caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, networkResponse.clone());
//             return networkResponse;
//           });
//         });
//       })
//       .catch((error) => {
//         console.error("[Service Worker] Fetch failed:", error);
//       })
//   );
// });
