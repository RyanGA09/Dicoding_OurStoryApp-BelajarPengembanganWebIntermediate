class AboutPage {
  async render() {
    return `
      <div class="content">
        <h2 class="section-title">Tentang Aplikasi</h2>
        <p>Aplikasi ini dibuat untuk membagikan cerita-cerita inspiratif dari pengguna. Dibangun menggunakan HTML, CSS, JavaScript ES6, Webpack, dan API Story Dicoding.</p>
      </div>
    `;
  }

  async afterRender() {
    // Kosong
  }
}

export default AboutPage;
