import { storyMapper } from "../../data/api-mapper";

export default class BookmarkPresenter {
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
    this.#view.showStoriesListLoading();

    try {
      await this.showStoriesListMap();

      const listOfStorys = await this.#model.getAllStories();
      console.log("Raw from DB:", listOfStorys);

      const storys = await Promise.all(listOfStorys.map(storyMapper));
      console.log("Mapped storys:", storys);

      const message = "Berhasil mendapatkan daftar cerita tersimpan.";
      this.#view.populateBookmarkedStories(message, storys);
    } catch (error) {
      console.error("initialGalleryAndMap: error:", error);
      this.#view.populateBookmarkedStoriesError(error.message);
    } finally {
      this.#view.hideStorysListLoading();
    }
  }
}
