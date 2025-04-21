// CSS imports
import "../styles/styles.css";
console.log("CSS Loaded!");

import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  // Sembunyikan navbar dan tombol logout pada halaman login atau register
  const currentRoute = window.location.hash;
  if (currentRoute === "#/login" || currentRoute === "#/register") {
    // Menyembunyikan navbar dan tombol logout, tetapi header tetap ada
    document.querySelector(".navigation-drawer").style.display = "none"; // Menyembunyikan navbar
    document.querySelector("#logout-button").style.display = "none"; // Menyembunyikan tombol logout
  } else {
    document.querySelector(".navigation-drawer").style.display = "block"; // Menampilkan navbar
    document.querySelector("#logout-button").style.display = "block"; // Menampilkan tombol logout
  }

  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    // Periksa ulang saat halaman berubah
    const currentRoute = window.location.hash;
    if (currentRoute === "#/login" || currentRoute === "#/register") {
      document.querySelector(".navigation-drawer").style.display = "none"; // Menyembunyikan navbar
      document.querySelector("#logout-button").style.display = "none"; // Menyembunyikan tombol logout
    } else {
      document.querySelector(".navigation-drawer").style.display = "block"; // Menampilkan navbar
      document.querySelector("#logout-button").style.display = "block"; // Menampilkan tombol logout
    }

    await app.renderPage();
  });
});
