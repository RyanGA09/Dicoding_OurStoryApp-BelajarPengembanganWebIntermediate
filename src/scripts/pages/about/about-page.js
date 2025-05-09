// src/scripts/pages/about/about-page.js
import AboutPresenter from "./about-presenter.js";

export default class AboutPage {
  #presenter;

  async render() {
    return `
      <div class="content about-page__content">
        <h2 class="section-title">Tentang Aplikasi</h2>
        <p>Aplikasi ini dibuat untuk membagikan cerita inspiratif dari pengguna, dibangun menggunakan HTML, 
        CSS, JavaScript ES6, Webpack, dan API Story Dicoding.</p>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new AboutPresenter(this);
    await this.#presenter.showContent();
  }

  showAbout() {
    console.log("AboutPage ditampilkan.");
  }
}
