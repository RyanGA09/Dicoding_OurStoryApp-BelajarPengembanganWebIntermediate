// src/scripts/pages/story-detail/story-detail-page.js
import {
  generateLoaderAbsoluteTemplate,
  generateStoryDetailErrorTemplate,
  generateStoryDetailTemplate,
  generateSaveStoryButtonTemplate,
} from "../../templates";
import { createCarousel } from "../../utils";
import StoryDetailPresenter from "./story-detail-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import Map from "../../utils/map";
import * as StoryAPI from "../../data/api";

export default class StoryDetailPage {
  #presenter = null;
  #map = null;

  async render() {
    return `
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

  // populateStoryDetail(message, story) {
  //   document.getElementById("story-detail").innerHTML = `
  //     <div class="story-card-detail">
  //       <img src="${story.photoUrl}" alt="Story Image"/>
  //       <div class="story-info">
  //         <h3>${story.name}</h3>
  //         <p>${story.description}</p>
  //         <small>${new Date(story.createdAt).toLocaleString()}</small>
  //       </div>
  //     </div>
  //   `;

  //   if (this.#map && story.lat && story.lon) {
  //     const coordinate = [story.lat, story.lon];
  //     const markerOptions = { alt: story.name };
  //     const popupOptions = { content: story.description };
  //     this.#map.changeCamera(coordinate);
  //     this.#map.addMarker(coordinate, markerOptions, popupOptions);
  //   }
  // }

  renderSaveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateSaveStoryButtonTemplate();

    document
      .getElementById("story-detail-save")
      .addEventListener("click", async () => {
        alert("Fitur simpan Cerita akan segera hadir!");
      });
  }

  addNotifyMeEventListener() {
    document
      .getElementById("story-detail-notify-me")
      .addEventListener("click", () => {
        alert("Fitur notifikasi cerita akan segera hadir!");
      });
  }

  showStoryDetailLoading() {
    document.getElementById("story-detail-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideStoryDetailLoading() {
    document.getElementById("story-detail-loading-container").innerHTML = "";
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

  async populateStoryDetailAndInitialMap(message, story) {
    document.getElementById("story-detail").innerHTML =
      generateStoryDetailTemplate({
        name: story.name,
        description: story.description,
        photoUrl: story.photoUrl,
        createdAt: story.createdAt,
        location: story.location,
      });

    // Carousel images
    createCarousel(document.getElementById("images"));

    // Map
    await this.#presenter.showStoryDetailMap();
    if (this.#map) {
      // console.warn(story);
      if (story.location.latitude && story.location.longitude) {
        const coordinate = [story.location.latitude, story.location.longitude];
        const markerOptions = { alt: story.description };
        const popupOptions = { content: story.description };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }
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
  }
}
