import { getStoryById } from "../../data/api";
import { parseActivePathname } from "../../routes/url-parser";

export default class DetailPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async showStory() {
    const { id } = parseActivePathname();
    try {
      const story = await getStoryById(id);
      this.#view.showStory(story);
    } catch (error) {
      console.error(error);
    }
  }
}
