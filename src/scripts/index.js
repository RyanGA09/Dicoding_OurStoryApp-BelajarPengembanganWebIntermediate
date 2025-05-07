// // CSS imports
// import "../styles/styles.css";
// import "leaflet/dist/leaflet.css";
// console.log("CSS Loaded!");

// import App from "./pages/app";

// document.addEventListener("DOMContentLoaded", async () => {
//   const app = new App({
//     content: document.querySelector("#main-content"),
//     drawerButton: document.querySelector("#drawer-button"),
//     navigationDrawer: document.querySelector("#navigation-drawer"),
//   });

//   // Fungsi untuk cek apakah user sudah login
//   const isLoggedIn = () => {
//     return !!localStorage.getItem("token");
//   };

//   // Event listener untuk brand link
//   const brandLink = document.querySelector(".brand-name");
//   brandLink.addEventListener("click", (event) => {
//     if (!isLoggedIn()) {
//       event.preventDefault();
//       window.location.hash = "#/login";
//     }
//   });

//   // Sembunyikan navbar dan tombol logout pada halaman login atau register
//   const currentRoute = window.location.hash;
//   if (currentRoute === "#/login" || currentRoute === "#/register") {
//     // Menyembunyikan navbar dan tombol logout, tetapi header tetap ada
//     document.querySelector(".navigation-drawer").style.display = "none"; // Menyembunyikan navbar
//     document.querySelector("#logout-button").style.display = "none"; // Menyembunyikan tombol logout
//   } else {
//     document.querySelector(".navigation-drawer").style.display = "block"; // Menampilkan navbar
//     document.querySelector("#logout-button").style.display = "block"; // Menampilkan tombol logout
//   }

//   await app.renderPage();

//   window.addEventListener("hashchange", async () => {
//     // Periksa ulang saat halaman berubah
//     const currentRoute = window.location.hash;
//     if (currentRoute === "#/login" || currentRoute === "#/register") {
//       document.querySelector(".navigation-drawer").style.display = "none"; // Menyembunyikan navbar
//       document.querySelector("#logout-button").style.display = "none"; // Menyembunyikan tombol logout
//     } else {
//       document.querySelector(".navigation-drawer").style.display = "block"; // Menampilkan navbar
//       document.querySelector("#logout-button").style.display = "block"; // Menampilkan tombol logout
//     }

//     await app.renderPage();
//   });
// });

// CSS imports
import "../styles/styles.css";
import "../styles/responsives.css";
<<<<<<< HEAD
import "tiny-slider/dist/tiny-slider.css";
=======
// import "tiny-slider/dist/tiny-slider.css";
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
import "leaflet/dist/leaflet.css";

// Components
import App from "./pages/app";
import Camera from "./utils/camera";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.getElementById("main-content"),
    drawerButton: document.getElementById("drawer-button"),
<<<<<<< HEAD
    navigationDrawer: document.getElementById("navigation-drawer"),
=======
    drawerNavigation: document.getElementById("navigation-drawer"),
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    skipLinkButton: document.getElementById("skip-link"),
  });
  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();

    // Stop all active media
    Camera.stopAllStreams();
  });
});
