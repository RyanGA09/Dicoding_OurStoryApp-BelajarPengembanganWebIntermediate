// src/scripts/pages/not-found/not-found-page.js
import NotFoundPresenter from "./not-found-presenter.js";

export default class NotFoundPage {
  #presenter;

  async render() {
    return `
      <div class="content not-found-page__content" style="text-align: center; padding: 2rem;">
        <img src="https://i.imgur.com/qIufhof.png" alt="404 Not Found" style="max-width: 400px; width: 100%; margin-bottom: 1rem;">
        <h2 class="section-title">404 - Halaman Tidak Ditemukan</h2>
        <p>Maaf, halaman yang Anda cari tidak ditemukan.<br>Silakan kembali ke <a href="#/">beranda</a> atau periksa kembali URL Anda.</p>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new NotFoundPresenter(this);
    await this.#presenter.showContent();
  }

  showNotFound() {
    console.log("NotFoundPage ditampilkan - 404");
  }
}
