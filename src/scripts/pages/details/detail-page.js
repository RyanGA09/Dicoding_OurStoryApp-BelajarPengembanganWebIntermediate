import CONFIG from "../../config";
import { getStoryById } from "../../data/api";
import { showFormattedDate } from "../../utils/date-formatter";

export default class DetailStoryPage {
  async render() {
    return `
        <div class="content">
          <h2 class="section-title">Detail Cerita</h2>
          <div id="story-detail" class="story-detail"></div>
        </div>
      `;
  }

  async afterRender() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.hash = "#/login";
      return;
    }

    const id = window.location.hash.split("/")[2];
    const story = await getStoryById(id);

    const detailContainer = document.querySelector("#story-detail");
    detailContainer.innerHTML = `
      <img src="${story.photoUrl}" alt="${story.name}" class="detail-img">
        <h3>${story.name}</h3>
        <p class="date">${showFormattedDate(story.createdAt)}</p>
        <p>${story.description}</p>
      `;
  }
}
