import HomePresenter from "./home-presenter.js";
import Map from "../../utils/map";
import { showFormattedDate } from "../../utils/date-formatter"; // Pastikan ini diimpor jika diperlukan

export default class HomePage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section class="container">
        <!-- Peta dipisahkan sebagai elemen khusus -->
        <div class="map-fixed-footer">
          <div class="map-header">Peta Lokasi Cerita</div>
          <div id="map"></div>
        </div>

        <h1 class="section-title">Cerita Terbaru</h1>
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

    this.#presenter = new HomePresenter(this);
    await this.initialMap();
    await this.#presenter.showStories();

    // Menambahkan event listener untuk tombol logout
    const logoutButton = document.querySelector("#logout-button");
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.hash = "#/login";
    });
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 10,
      locate: true,
    });
  }

  showStories(stories) {
    const container = document.getElementById("story-list");

    if (this.#map && stories && stories.length > 0) {
      container.innerHTML = stories
        .map((story) => {
          if (story.lat && story.lon) {
            // Gunakan metode addMarker untuk menambahkan marker ke peta
            this.#map.addMarker(
              [story.lat, story.lon],
              {},
              {
                content: `<b>${story.name}</b><br>${story.description.slice(
                  0,
                  50
                )}...`,
              }
            );
          }

          return `
          <div class="story-item">
            <img src="${story.photoUrl}" alt="${story.name}" />
            <h3>${story.name}</h3>
            <p class="date">${showFormattedDate(story.createdAt)}</p>
            <p>${story.description.slice(0, 100)}...</p>
            ${
              story.lat && story.lon
                ? `
              <a href="https://maps.google.com?q=${story.lat},${story.lon}" target="_blank" class="map-link">
                Lihat Lokasi di Google Maps
              </a>`
                : ""
            }
            <a href="#/detail/${story.id}" class="btn-detail">Lihat Detail</a>
          </div>
        `;
        })
        .join("");
    } else {
      container.innerHTML = `<p>Belum ada cerita yang diposting.</p>`;
    }
  }
}
