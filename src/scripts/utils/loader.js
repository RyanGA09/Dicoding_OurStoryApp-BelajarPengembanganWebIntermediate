const Loader = {
  show() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="loader-overlay">
        <div class="loader"></div>
      </div>
    `
    );
  },
  hide() {
    document.querySelector(".loader-overlay")?.remove();
  },
};

export default Loader;
