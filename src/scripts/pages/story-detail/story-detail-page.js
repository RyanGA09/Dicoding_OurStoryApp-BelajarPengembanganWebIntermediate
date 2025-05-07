<<<<<<< HEAD
// src/scripts/pages/story-detail/story-detail-page.js
import {
  generateLoaderAbsoluteTemplate,
  generateStoryDetailErrorTemplate,
  generateStoryDetailTemplate,
} from "../../templates";
import { createCarousel } from "../../utils";
import StoryDetailPresenter from "./story-detail-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import Map from "../../utils/map";
import * as StoryAPI from "../../data/api";

export default class StoryDetailPage {
  #presenter = null;
=======
// import DetailPresenter from "./detail-presenter.js";

// export default class DetailStoryPage {
//   #presenter;

//   async render() {
//     return `
//       <div class="content">
//         <h2 class="section-title">Detail Cerita</h2>
//         <div id="story-detail" class="story-detail"></div>
//       </div>
//     `;
//   }

//   async afterRender() {
//     this.#presenter = new DetailPresenter(this);
//     await this.#presenter.showStory();
//   }

//   showStory(story) {
//     const container = document.getElementById("story-detail");
//     container.innerHTML = `
//       <img src="${story.photoUrl}" alt="${story.name}" class="detail-img">
//       <h3>${story.name}</h3>
//       <p class="date">${new Date(story.createdAt).toLocaleDateString(
//         "id-ID"
//       )}</p>
//       <p>${story.description}</p>
//     `;
//   }
// }

import {
  generateCommentsListEmptyTemplate,
  generateCommentsListErrorTemplate,
  generateLoaderAbsoluteTemplate,
  generateRemovestoryButtonTemplate,
  generatestoryCommentItemTemplate,
  generatestoryDetailErrorTemplate,
  generatestoryDetailTemplate,
  generateSavestoryButtonTemplate,
} from "../../templates";
import { createCarousel } from "../../utils";
import storyDetailPresenter from "./story-detail-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import Map from "../../utils/map";
import * as CityCareAPI from "../../data/api";

export default class storyDetailPage {
  #presenter = null;
  #form = null;
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
  #map = null;

  async render() {
    return `
<<<<<<< HEAD
    <section>
      <div class="story-detail__container">
        <div id="story-detail" class="story-detail"></div>
        <div id="story-detail-loading-container"></div>
      </div>
    </section>
  `;
  }

  async afterRender() {
    this.#presenter = new StoryDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: StoryAPI,
    });

    this.#presenter.showStoryDetail();
  }

  populateStoryDetail(message, story) {
    document.getElementById("story-detail").innerHTML = `
      <div class="story-card-detail">
        <img src="${story.photoStory}" alt="Story Image"/>
        <div class="story-info">
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <small>${new Date(story.createdAt).toLocaleString()}</small>
        </div>
      </div>
    `;

    if (this.#map && story.lat && story.lon) {
      const coordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.name };
      const popupOptions = { content: story.description };
      this.#map.changeCamera(coordinate);
      this.#map.addMarker(coordinate, markerOptions, popupOptions);
    }
  }

  showStoryDetailLoading() {
=======
      <section>
        <div class="story-detail__container">
          <div id="story-detail" class="story-detail"></div>
          <div id="story-detail-loading-container"></div>
        </div>
      </section>
      
      <section class="container">
        <hr>
        <div class="story-detail__comments__container">
          <div class="story-detail__comments-form__container">
            <h2 class="story-detail__comments-form__title">Beri Tanggapan</h2>
            <form id="comments-list-form" class="story-detail__comments-form__form">
              <textarea name="body" placeholder="Beri tanggapan terkait laporan."></textarea>
              <div id="submit-button-container">
                <button class="btn" type="submit">Tanggapi</button>
              </div>
            </form>
          </div>
          <hr>
          <div class="story-detail__comments-list__container">
            <div id="story-detail-comments-list"></div>
            <div id="comments-list-loading-container"></div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new storyDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: CityCareAPI,
    });

    this.#setupForm();

    this.#presenter.showstoryDetail();
    this.#presenter.getCommentsList();
  }

  async populatestoryDetailAndInitialMap(message, story) {
    document.getElementById("story-detail").innerHTML =
      generatestoryDetailTemplate({
        title: story.title,
        description: story.description,
        damageLevel: story.damageLevel,
        storyImages: story.storyImages,
        location: story.location,
        storyerName: story.storyer.name,
        createdAt: story.createdAt,
      });

    // Carousel images
    createCarousel(document.getElementById("images"));

    // Map
    await this.#presenter.showstoryDetailMap();
    if (this.#map) {
      const storyCoordinate = [
        story.location.latitude,
        story.location.longitude,
      ];
      const markerOptions = { alt: story.title };
      const popupOptions = { content: story.title };

      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    }

    // Actions buttons
    this.#presenter.showSaveButton();
    this.addNotifyMeEventListener();
  }

  populatestoryDetailError(message) {
    document.getElementById("story-detail").innerHTML =
      generatestoryDetailErrorTemplate(message);
  }

  populatestoryDetailComments(message, comments) {
    if (comments.length <= 0) {
      this.populateCommentsListEmpty();
      return;
    }

    const html = comments.reduce(
      (accumulator, comment) =>
        accumulator.concat(
          generatestoryCommentItemTemplate({
            photoUrlCommenter: comment.commenter.photoUrl,
            nameCommenter: comment.commenter.name,
            body: comment.body,
          })
        ),
      ""
    );

    document.getElementById("story-detail-comments-list").innerHTML = `
      <div class="story-detail__comments-list">${html}</div>
    `;
  }

  populateCommentsListEmpty() {
    document.getElementById("story-detail-comments-list").innerHTML =
      generateCommentsListEmptyTemplate();
  }

  populateCommentsListError(message) {
    document.getElementById("story-detail-comments-list").innerHTML =
      generateCommentsListErrorTemplate(message);
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 15,
    });
  }

  #setupForm() {
    this.#form = document.getElementById("comments-list-form");
    this.#form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = {
        body: this.#form.elements.namedItem("body").value,
      };
      await this.#presenter.postNewComment(data);
    });
  }

  postNewCommentSuccessfully(message) {
    console.log(message);

    this.#presenter.getCommentsList();
    this.clearForm();
  }

  postNewCommentFailed(message) {
    alert(message);
  }

  clearForm() {
    this.#form.reset();
  }

  renderSaveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateSavestoryButtonTemplate();

    document
      .getElementById("story-detail-save")
      .addEventListener("click", async () => {
        alert("Fitur simpan laporan akan segera hadir!");
      });
  }

  renderRemoveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateRemovestoryButtonTemplate();

    document
      .getElementById("story-detail-remove")
      .addEventListener("click", async () => {
        alert("Fitur simpan laporan akan segera hadir!");
      });
  }

  addNotifyMeEventListener() {
    document
      .getElementById("story-detail-notify-me")
      .addEventListener("click", () => {
        alert("Fitur notifikasi laporan akan segera hadir!");
      });
  }

  showstoryDetailLoading() {
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    document.getElementById("story-detail-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

<<<<<<< HEAD
  hideStoryDetailLoading() {
=======
  hidestoryDetailLoading() {
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    document.getElementById("story-detail-loading-container").innerHTML = "";
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

<<<<<<< HEAD
  async populateStoryDetailAndInitialMap(message, story) {
    document.getElementById("story-detail").innerHTML =
      generateStoryDetailTemplate({
        description: story.description,
        photoStory: story.photoStory,
        createdAt: story.createdAt,
        location: story.location,
      });

    // Carousel images
    createCarousel(document.getElementById("images"));

    // Map
    await this.#presenter.showStoryDetailMap();
    if (this.#map) {
      const storyCoordinate = [
        story.location.latitude,
        story.location.longitude,
      ];
      const markerOptions = { alt: story.title };
      const popupOptions = { content: story.title };

      this.#map.changeCamera(storyCoordinate);
      this.#map.addMarker(storyCoordinate, markerOptions, popupOptions);
    } else {
      console.warn(
        "Koordinat tidak valid atau tidak ditemukan:",
        story.location
      );
    }

    // Actions buttons
    this.#presenter.showSaveButton();
    this.addNotifyMeEventListener();
  }

  async initialMap() {
    this.#map = await Map.build("#map", { zoom: 15 });
  }

  populateStoryDetailError(message) {
    document.getElementById("story-detail").innerHTML =
      generateStoryDetailErrorTemplate(message);
=======
  showCommentsLoading() {
    document.getElementById("comments-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideCommentsLoading() {
    document.getElementById("comments-list-loading-container").innerHTML = "";
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Tanggapi
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit">Tanggapi</button>
    `;
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
  }
}
