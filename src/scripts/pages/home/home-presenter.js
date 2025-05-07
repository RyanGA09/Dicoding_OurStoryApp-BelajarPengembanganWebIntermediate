<<<<<<< HEAD
// src/scripts/pages/home/home-presenter.js
=======
// import { getAllStories } from "../../data/api";

// export default class HomePresenter {
//   #view;

//   constructor(view) {
//     this.#view = view;
//   }

//   async showStories() {
//     try {
//       const stories = await getAllStories();
//       this.#view.showStories(stories);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

<<<<<<< HEAD
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
=======
  async showReportsListMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showReportsListMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialGalleryAndMap() {
    this.#view.showLoading();
    try {
      await this.showReportsListMap();

      const response = await this.#model.getAllReports();

      if (!response.ok) {
        console.error("initialGalleryAndMap: response:", response);
        this.#view.populateReportsListError(response.message);
        return;
      }

      this.#view.populateReportsList(response.message, response.data);
    } catch (error) {
      console.error("initialGalleryAndMap: error:", error);
      this.#view.populateReportsListError(error.message);
    } finally {
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      this.#view.hideLoading();
    }
  }
}
