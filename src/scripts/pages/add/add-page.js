export default class AddStoryPage {
  async render() {
    return `
      <section class="container">
        <h1>Tambah Cerita</h1>
        <form id="storyForm">
          <textarea id="description" placeholder="Tulis ceritamu..." required></textarea>
          <input type="file" id="photo" accept="image/*" required />
          <button type="submit">Kirim</button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    const form = document.querySelector("#storyForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Kirim ke API
    });
  }
}
