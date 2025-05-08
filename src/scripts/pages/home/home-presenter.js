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

  // async loadStoriesAndMap() {
  //   this.#view.showMapLoading();
  //   try {
  //     await this.#view.initialMap();
  //     const response = await this.#model.getAllStories({ location: 1 });

  //     if (!response.ok) {
  //       this.#view.populateStoryListError(response.message);
  //       return;
  //     }

  //     this.#view.populateStoryList(response.message, response.listStory);
  //   } catch (error) {
  //     console.error("loadStoriesAndMap: error:", error);
  //     this.#view.populateStoryListError(error.message);
  //   } finally {
  //     this.#view.hideMapLoading();
  //     this.#view.hideLoading();
  //   }
  // }

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

      // Mapping data untuk mendapatkan properti seperti lokasi
      const mappedStories = await Promise.all(response.data.map(storyMapper));

      this.#view.populateStoryList(response.message, mappedStories);
    } catch (error) {
      console.error("initialGalleryAndMap: error:", error);
      this.#view.populateStoryListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
