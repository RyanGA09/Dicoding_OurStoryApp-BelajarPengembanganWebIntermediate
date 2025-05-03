// src/scripts/pages/home/home-presenter.js
export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async loadStoriesAndMap() {
    this.#view.showLoading();
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
      const response = await this.#model.getAllStories({ location: 1 });

      if (!response.ok) {
        this.#view.populateStoryListError(response.message);
        return;
      }

      this.#view.populateStoryList(response.message, response.listStory);
    } catch (error) {
      console.error("loadStoriesAndMap: error:", error);
      this.#view.populateStoryListError(error.message);
    } finally {
      this.#view.hideMapLoading();
      this.#view.hideLoading();
    }
  }
}
