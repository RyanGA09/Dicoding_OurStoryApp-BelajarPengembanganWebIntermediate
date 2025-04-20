import { getAllStories } from "../../data/api";
import CONFIG from "../../config";
import { showFormattedDate } from "../../utils/date-formatter";

export default class HomePage {
  async render() {
    return `
      <section class="container">
        <h1>Cerita Terbaru</h1>
        <div id="story-list" class="story-list"></div>
      </section>
    `;
  }

  async afterRender() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.hash = "#/login";
      return;
    }

    try {
      const stories = await getAllStories(); // Mengambil semua cerita dari API
      const container = document.querySelector("#story-list");

      if (stories && stories.length > 0) {
        container.innerHTML = stories
          .map(
            (story) => `
              <div class="story-item">
                <img src="${story.photoUrl}" alt="${story.name}">
                <h3>${story.name}</h3>
                <p class="date">${showFormattedDate(story.createdAt)}</p>
                <p>${story.description.slice(0, 100)}...</p>
                <a href="#/detail/${
                  story.id
                }" class="btn-detail">Lihat Detail</a>
              </div>
            `
          )
          .join("");
      } else {
        container.innerHTML = `<p>Belum ada cerita yang diposting.</p>`;
      }

      // Menambahkan event listener untuk tombol logout
      const logoutButton = document.querySelector("#logout-button");
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.hash = "#/login";
      });
    } catch (error) {
      console.error("Error fetching stories:", error);
      const container = document.querySelector("#story-list");
      container.innerHTML = `<p>Gagal memuat cerita, coba lagi nanti.</p>`;
    }
  }
}
