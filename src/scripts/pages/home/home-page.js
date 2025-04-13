import { getAllStories } from "../../data/api";

export default class HomePage {
  async render() {
    return `
      <section class="container">
        <h1>Cerita Terbaru</h1>
        <div id="story-list"></div>
      </section>
    `;
  }

  async afterRender() {
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
  }
}
