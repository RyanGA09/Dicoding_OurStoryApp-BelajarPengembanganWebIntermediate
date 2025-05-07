export default class BookmarkPage {
  async render() {
    return "";
  }

  async afterRender() {
    alert("Halaman Cerita tersimpan akan segera hadir!");

    location.hash = "/";
  }
}
