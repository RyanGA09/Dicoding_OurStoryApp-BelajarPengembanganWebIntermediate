// // src/public/sw.js
// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
// );

// // Set configuration for workbox
// workbox.setConfig({
//   debug: false,
// });

// // PRECACHING
// const { precacheAndRoute } = workbox.precaching;

// precacheAndRoute([
//   { url: "/", revision: null },
//   { url: "/index.html", revision: null },
//   { url: "/app.webmanifest", revision: null },
//   { url: "/src/styles/style.css", revision: null },
//   // Tambahkan gambar/icon jika diperlukan
//   // { url: "/src/images/icon.png", revision: null },
// ]);

// // const fileToCaches = [
// //   "/",
// //   "/index.html",
// //   "/app.webmanifest",
// //   "/src/styles/style.css",
// //   //   "/src/images/favicon.png",
// //   //   "/src/images/calm-hero.png",
// //   //   "/src/images/calm-logo.png",
// //   //   "/src/images/icons/icon-48.png",
// //   //   "/src/images/icons/icon-72.png",
// //   //   "/src/images/icons/icon-96.png",
// //   //   "/src/images/icons/icon-144.png",
// //   //   "/src/images/icons/icon-192.png",
// // ];

// // import App from "../src/scripts/pages/app";
// // import { registerSW } from "../src/scripts/utils";

// // const drawerNavigation = document.querySelector("#navlist");
// // const drawerButton = document.querySelector("#drawerbutton");
// // const content = document.querySelector("#maincontent");

// const app = new App({
//   content,
//   drawerButton,
//   drawerNavigation,
// });

// document.addEventListener("DOMContentLoaded", async () => {
//   await app.renderPage();

//   await registerSW();
// });

// window.addEventListener("hashchange", async () => {
//   await app.renderPage();
// });

// export async function registerSW() {
//   // if (!("serviceWorker" in navigator)) {
//   //   console.warn("Service worker not supported");
//   //   return;
//   // }

//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then((reg) => console.log("SW registered", reg))
//       .catch((err) => console.error("SW failed", err));
//   }

//   try {
//     // Caching strategies from scratch
//     const registration = await navigator.serviceWorker.register("/sw.js");

//     // Caching strategies with workbox
//     // const registration = await navigator.serviceWorker.register('/sw-workbox.js');

//     registration.onupdatefound = () => {
//       // Jika event handler ini dijalankan, itu artinya ada
//       // pembaruan service worker yang sedang dipasang.
//       const installingWorker = registration.installing;
//       console.log("A new service worker is being installed:", installingWorker);
//     };
//   } catch (error) {
//     console.log("Failed to register service worker", error);
//   }
// }

// src/public/sw.js
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";
import { BASE_URL } from "./config";

// Do precaching
const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);

// Runtime caching
registerRoute(
  ({ url }) => {
    return (
      url.origin === "https://fonts.googleapis.com" ||
      url.origin === "https://fonts.gstatic.com"
    );
  },
  new CacheFirst({
    cacheName: "google-fonts",
  })
);

registerRoute(
  ({ url }) => {
    return (
      url.origin === "https://cdnjs.cloudflare.com" ||
      url.origin.includes("fontawesome")
    );
  },
  new CacheFirst({
    cacheName: "fontawesome",
  })
);
registerRoute(
  ({ url }) => {
    return url.origin === "https://ui-avatars.com";
  },
  new CacheFirst({
    cacheName: "avatars-api",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
registerRoute(
  ({ request, url }) => {
    const baseUrl = new URL(BASE_URL);
    return baseUrl.origin === url.origin && request.destination !== "image";
  },
  new NetworkFirst({
    cacheName: "ourstory-api",
  })
);
registerRoute(
  ({ request, url }) => {
    const baseUrl = new URL(BASE_URL);
    return baseUrl.origin === url.origin && request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "ourstory-api-images",
  })
);
registerRoute(
  ({ url }) => {
    return url.origin.includes("maptiler");
  },
  new CacheFirst({
    cacheName: "maptiler-api",
  })
);

self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");

  async function chainPromise() {
    const data = await event.data.json();
    await self.registration.showNotification(data.title, {
      body: data.options.body,
    });
  }

  event.waitUntil(chainPromise());
});
