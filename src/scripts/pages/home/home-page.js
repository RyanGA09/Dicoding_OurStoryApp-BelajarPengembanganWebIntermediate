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
      <article class="story-item">
        <img src="${story.photoUrl}" alt="${story.name}" />
        <h2>${story.name}</h2>
        <p>${story.description}</p>
        <a href="#/detail/${story.id}">Baca Selengkapnya</a>
      </article>
    `
      )
      .join("");
  }
}
