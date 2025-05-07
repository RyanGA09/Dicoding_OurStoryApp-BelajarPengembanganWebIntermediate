import { getAllStories } from "../../data/api";

export default class HomePresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async showStories() {
    try {
      const stories = await getAllStories();
      this.#view.showStories(stories);
    } catch (error) {
      console.error(error);
    }
  }
}
