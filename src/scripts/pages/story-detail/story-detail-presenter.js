// import { getStoryById } from "../../data/api";
// import { parseActivePathname } from "../../routes/url-parser";

// export default class DetailPresenter {
//   #view;

//   constructor(view) {
//     this.#view = view;
//   }

//   async showStory() {
//     const { id } = parseActivePathname();
//     try {
//       const story = await getStoryById(id);
//       this.#view.showStory(story);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

import { storyMapper } from "../../data/api-mapper";

export default class storyDetailPresenter {
  #storyId;
  #view;
  #apiModel;

  constructor(storyId, { view, apiModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async showstoryDetailMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showstoryDetailMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async showstoryDetail() {
    this.#view.showstoryDetailLoading();
    try {
      const response = await this.#apiModel.getstoryById(this.#storyId);

      if (!response.ok) {
        console.error("showstoryDetailAndMap: response:", response);
        this.#view.populatestoryDetailError(response.message);
        return;
      }
      const story = await storyMapper(response.data);
      console.log(story); // for debugging purpose, remove after checking it

      this.#view.populatestoryDetailAndInitialMap(response.message, story);
    } catch (error) {
      console.error("showstoryDetailAndMap: error:", error);
      this.#view.populatestoryDetailError(error.message);
    } finally {
      this.#view.hidestoryDetailLoading();
    }
  }

  async getCommentsList() {
    this.#view.showCommentsLoading();
    try {
      const response = await this.#apiModel.getAllCommentsBystoryId(
        this.#storyId
      );
      this.#view.populatestoryDetailComments(response.message, response.data);
    } catch (error) {
      console.error("getCommentsList: error:", error);
      this.#view.populateCommentsListError(error.message);
    } finally {
      this.#view.hideCommentsLoading();
    }
  }

  async postNewComment({ body }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#apiModel.storeNewCommentBystoryId(
        this.#storyId,
        { body }
      );

      if (!response.ok) {
        console.error("postNewComment: response:", response);
        this.#view.postNewCommentFailed(response.message);
        return;
      }

      this.#view.postNewCommentSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("postNewComment: error:", error);
      this.#view.postNewCommentFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }

  showSaveButton() {
    if (this.#isstorySaved()) {
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  }

  #isstorySaved() {
    return false;
  }
}
