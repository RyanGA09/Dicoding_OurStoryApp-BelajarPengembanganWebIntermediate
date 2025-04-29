import AddStoryPresenter from "./add-presenter.js";

export default class AddStoryPage {
  #presenter;

  async render() {
    return `
      <section class="container">
        <h1>Tambah Cerita</h1>
        <form id="storyForm" class="storyform">
          <textarea id="description" placeholder="Tulis ceritamu..." required></textarea>
          <input type="file" id="photo" accept="image/*" capture="environment" required />
          <div id="map" style="height: 300px; margin-top: 20px;"></div>
          <input type="hidden" id="latitude" />
          <input type="hidden" id="longitude" />
          <button type="submit">Kirim</button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AddStoryPresenter(this);
    await this.#presenter.init();
  }
}
