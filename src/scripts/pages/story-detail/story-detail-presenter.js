<<<<<<< HEAD
import { storyMapper } from "../../data/api-mapper";

export default class StoryDetailPresenter {
=======
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
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
  #storyId;
  #view;
  #apiModel;

  constructor(storyId, { view, apiModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

<<<<<<< HEAD
  async showStoryDetailMap() {
=======
  async showstoryDetailMap() {
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
<<<<<<< HEAD
      console.error("showStoryDetailMap: error:", error);
=======
      console.error("showstoryDetailMap: error:", error);
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    } finally {
      this.#view.hideMapLoading();
    }
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    }
  }

  showSaveButton() {
<<<<<<< HEAD
    if (this.#isStorySaved()) {
=======
    if (this.#isstorySaved()) {
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  }

<<<<<<< HEAD
  #isStorySaved() {
=======
  #isstorySaved() {
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    return false;
  }
}
