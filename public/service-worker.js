const CACHE_NAME = "my-app-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/public/favicon.png",
  "/scripts/pages/app.js",
  "/scripts/routes/routes.js",
  "/scripts/routes/url-parser.js",
  "/styles/styles.css",
];

// Install event: caching assets saat service worker di-install
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Memaksa service worker untuk segera aktif
});

// Activate event: membersihkan cache lama
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        )
      )
      .then(() => self.clients.claim()) // Memastikan Service Worker aktif untuk seluruh aplikasi
  );
});

// Fetch event: menangkap request dan menerapkan cache-first strategy
self.addEventListener("fetch", (event) => {
  // Hanya tangani GET request saja
  if (event.request.method !== "GET") {
    return;
  }

  // Kalau halaman login, bypass cache
  if (event.request.url.includes("/login")) {
    return fetch(event.request);
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log(
            "[Service Worker] Serving from cache:",
            event.request.url
          );
          return response;
        }

        console.log(
          "[Service Worker] Fetching from network:",
          event.request.url
        );
        return fetch(event.request).then((networkResponse) => {
          // Hanya cache GET request yang berhasil (status 200)
          if (
            event.request.method === "GET" &&
            networkResponse.status === 200
          ) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          } else {
            return networkResponse;
          }
        });
      })
      .catch((error) => {
        console.error("[Service Worker] Fetch failed:", error);
      })
  );
});
