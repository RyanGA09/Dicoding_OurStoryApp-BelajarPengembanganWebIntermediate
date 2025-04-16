import { postStory } from "../../data/api";

export default class AddStoryPage {
  async render() {
    return `
      <section class="container">
        <h1>Tambah Cerita</h1>
        <form class="storyform" id="storyForm">
          <textarea id="description" placeholder="Tulis ceritamu..." required></textarea>
          <input type="file" id="photo" accept="image/*" required />
          <button type="submit">Kirim</button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    // ✅ Tambah pengecekan token di sini
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.hash = "#/login";
      return;
    }

    const form = document.querySelector("#storyForm");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const photo = document.querySelector("#photo").files[0];
      const description = document.querySelector("#description").value;

      if (!photo || !description) {
        alert("Harap lengkapi form!");
        return;
      }

      try {
        await postStory(photo, description);
        alert("Cerita berhasil ditambahkan!");
        window.location.hash = "/";
      } catch (error) {
        alert("Gagal menambahkan cerita!");
        console.error(error);
      }
    });
  }
}
