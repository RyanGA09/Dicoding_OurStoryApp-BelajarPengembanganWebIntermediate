export default class AboutPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async showContent() {
    this.#view.showAbout();
  }
}
