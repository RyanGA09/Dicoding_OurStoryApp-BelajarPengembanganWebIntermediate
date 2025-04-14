import { getAllStories } from "../../data/api";
import CONFIG from "../../config";
import { showFormattedDate } from "../../utils/date-formatter";

export default class HomePage {
  async render() {
    return `
      <section class="container">
        <div class="home-header">
          <h1>Cerita Terbaru</h1>
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
            <img src="${story.photoUrl}" alt="${story.name}">
            <h3>${story.name}</h3>
            <p class="date">${showFormattedDate(story.createdAt)}</p>
            <p>${story.description.slice(0, 100)}...</p>
            <a href="#/detail/${story.id}" class="btn-detail">Lihat Detail</a>
          </div>
        `
      )
      .join("");

    // Event listener for logout
    const logoutButton = document.querySelector("#logout-button");
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.hash = "#/login";
    });
  }
}
