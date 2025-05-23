// src/scripts/pages/home/home-presenter.js
import { storyMapper } from "../../data/api-mapper";
export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showStoriesListMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showStoriesListMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialGalleryAndMap() {
    this.#view.showLoading();
    try {
      await this.showStoriesListMap();

      const response = await this.#model.getAllStories();

      if (!response.ok) {
        console.error("initialGalleryAndMap: response:", response);
        this.#view.populateStoryListError(response.message);
        return;
      }

      // console.log("Response dari getAllStories:", response);

      // Mapping data untuk mendapatkan properti seperti lokasi
      // console.log(response.listStory);
      const mappedStories = await Promise.all(
        response.listStory.map(storyMapper)
      );
      // console.log(mappedStories);

      this.#view.populateStoryList(response.message, mappedStories);
    } catch (error) {
      console.error("initialGalleryAndMap: error:", error);
      this.#view.populateStoryListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
