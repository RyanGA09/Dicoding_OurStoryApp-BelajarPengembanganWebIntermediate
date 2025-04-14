import { getAllStories } from "../../data/api";
import CONFIG from "../../config";
import { showFormattedDate } from "../../utils/date-formatter";

export default class HomePage {
  async render() {
    return `
      <section class="container">
        <div class="home-header">
          <h1>Cerita Terbaru</h1>
          <button id="logout-button" class="btn-logout">Logout</button>
        </div>
        <div id="story-list"></div>
      </section>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.hash = "#/login";
      return;
    }

    const stories = await getAllStories();
    const container = document.querySelector("#story-list");
    container.innerHTML = stories
      .map(
        (story) => `
        <div class="story-item">
          <img src="${CONFIG.BASE_IMAGE_URL + story.photoUrl}" alt="${
          story.name
        }">
          <h3>${story.name}</h3>
          <p class="date">${showFormattedDate(story.createdAt)}</p>
          <p>${story.description.slice(0, 100)}...</p>
          <a href="#/detail?id=${story.id}" class="btn-detail">Lihat Detail</a>
        </div>
      `
      )
      .join("");

    // === Tambahkan event listener untuk logout ===
    const logoutButton = document.querySelector("#logout-button");
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token"); // hapus token
      window.location.hash = "#/login"; // redirect ke login
    });
  }
}
