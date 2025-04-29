import HomePresenter from "./home-presenter.js";

export default class HomePage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1>Cerita Terbaru</h1>
        <div id="story-list" class="story-list"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter(this);
    await this.#presenter.showStories();
  }

  showStories(stories) {
    const container = document.getElementById("story-list");
    if (stories && stories.length > 0) {
      container.innerHTML = stories
        .map(
          (story) => `
        <div class="story-item">
          <img src="${story.photoUrl}" alt="${story.name}" />
          <h3>${story.name}</h3>
          <p class="date">${new Date(story.createdAt).toLocaleDateString(
            "id-ID"
          )}</p>
          <p>${story.description.slice(0, 100)}...</p>
          <a href="#/detail/${story.id}" class="btn-detail">Lihat Detail</a>
        </div>
      `
        )
        .join("");
    } else {
      container.innerHTML = `<p>Belum ada cerita yang diposting.</p>`;
    }
  }
}
