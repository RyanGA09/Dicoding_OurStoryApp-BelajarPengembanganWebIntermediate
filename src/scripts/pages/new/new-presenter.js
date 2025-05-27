// src/scripts/pages/new/new-presenter.js
export default class NewPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showNewFormMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async postNewStory({ description, photo, lat, lon }) {
    this.#view.showSubmitLoadingButton();
    try {
      const data = {
        description: description,
        photo: photo,
        lat: lat,
        lon: lon,
      };
      const response = await this.#model.addNewStory(data);

      if (!response.ok) {
        console.error("postNewStory: response:", response);
        this.#view.storeFailed(response.message);
        return;
      }

      // No need to wait response
      // this.#notifyToAllUser(response.data.id);

      this.#view.storeSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("postNewStory: error:", error);
      this.#view.storeFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }

  // async #notifyToAllUser(storyId) {
  //   try {
  //     const response = await this.#model.sendStoryToAllUserViaNotification(
  //       storyId
  //     );
  //     if (!response.ok) {
  //       console.error("#notifyToAllUser: response:", response);
  //       return false;
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error("#notifyToAllUser: error:", error);
  //     return false;
  //   }
  // }
}
