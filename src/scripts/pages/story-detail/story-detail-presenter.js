// src/scripts/pages/story-detail/story-detail-presenter.js
export default class StoryDetailPresenter {
  #id;
  #view;
  #apiModel;

  constructor(id, { view, apiModel }) {
    this.#id = id;
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async loadStoryDetail() {
    this.#view.showStoryDetailLoading();
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
      const response = await this.#apiModel.getStoryById(this.#id);

      if (!response.ok) {
        this.#view.populateStoryDetailError(response.message);
        return;
      }

      this.#view.populateStoryDetail(response.message, response.story);
    } catch (error) {
      console.error("loadStoryDetail error:", error);
      this.#view.populateStoryDetailError(error.message);
    } finally {
      this.#view.hideStoryDetailLoading();
      this.#view.hideMapLoading();
    }
  }
}
