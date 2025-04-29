import DetailPresenter from "./detail-presenter.js";

export default class DetailStoryPage {
  #presenter;

  async render() {
    return `
      <div class="content">
        <h2 class="section-title">Detail Cerita</h2>
        <div id="story-detail" class="story-detail"></div>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new DetailPresenter(this);
    await this.#presenter.showStory();
  }

  showStory(story) {
    const container = document.getElementById("story-detail");
    container.innerHTML = `
      <img src="${story.photoUrl}" alt="${story.name}" class="detail-img">
      <h3>${story.name}</h3>
      <p class="date">${new Date(story.createdAt).toLocaleDateString(
        "id-ID"
      )}</p>
      <p>${story.description}</p>
    `;
  }
}
