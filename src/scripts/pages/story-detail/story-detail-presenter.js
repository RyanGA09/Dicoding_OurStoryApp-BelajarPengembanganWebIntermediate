import { storyMapper } from "../../data/api-mapper";

export default class StoryDetailPresenter {
  #storyId;
  #view;
  #apiModel;
  #dbModel;

  constructor(storyId, { view, apiModel, dbModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
    this.#dbModel = dbModel;
  }

  async showStoryDetailMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showStoryDetailMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async showStoryDetail() {
    this.#view.showStoryDetailLoading();
    try {
      const response = await this.#apiModel.getStoryById(this.#storyId);

      if (!response.ok) {
        console.error("showStoryDetail: response:", response);
        this.#view.populateStoryDetailError(response.message);
        return;
      }

      const story = await storyMapper(response.story);
      console.log(story); // untuk debugging sementara

      this.#view.populateStoryDetailAndInitialMap(response.message, story);
    } catch (error) {
      console.error("showStoryDetailAndMap: error:", error);
      this.#view.populateStoryDetailError(error.message);
    } finally {
      this.#view.hideStoryDetailLoading();
    }
  }

  async notifyMe() {
    try {
      const response = await this.#apiModel.sendStoryToMeViaNotification(
        this.#storyId
      );
      if (!response.ok) {
        console.error("notifyMe: response:", response);
        return;
      }
      console.log("notifyMe:", response.message);
    } catch (error) {
      console.error("notifyMe: error:", error);
    }
  }

  async notifyStoryOwner(commentId) {
    try {
      const response =
        await this.#apiModel.sendCommentToStoryOwnerViaNotification(
          this.#storyId,
          commentId
        );
      if (!response.ok) {
        console.error("notifyStoryOwner: response:", response);
        return;
      }
      console.log("notifyStoryOwner:", response.message);
    } catch (error) {
      console.error("notifyStoryOwner: error:", error);
    }
  }

  async saveStory() {
    try {
      const story = await this.#apiModel.getStoryById(this.#storyId);

      const mapped = await storyMapper(story.data); // ← ✅ Tambahkan ini
      await this.#dbModel.putStory(mapped); // ← Simpan hasil mapping

      this.#view.saveToBookmarkSuccessfully("Success to save to bookmark");
    } catch (error) {
      console.error("saveStory: error:", error);
      this.#view.saveToBookmarkFailed(error.message);
    }
  }

  async removeStory() {
    try {
      await this.#dbModel.removeStory(this.#storyId);
      this.#view.removeFromBookmarkSuccessfully(
        "Success to remove from bookmark"
      );
    } catch (error) {
      console.error("removeStory: error:", error);
      this.#view.removeFromBookmarkFailed(error.message);
    }
  }

  showSaveButton() {
    if (this.#isStorySaved()) {
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  }

  #isStorySaved() {
    return false;
  }
}
