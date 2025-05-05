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
  #map = null;

  async render() {
    return `
    <section>
      <div class="story-detail__container">
        <div id="story-detail" class="story-detail"></div>
        <div id="map-loading-container"></div> <!-- Tambahkan ini -->
        <div id="map" style="height: 400px;"></div> <!-- Tambahkan ini -->
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

    // this.#setupForm();

    await this.#presenter.showStoryDetail();
  }

  async initialMap() {
    this.#map = await Map.build("#map", { zoom: 12 });
  }

  populateStoryDetail(message, story) {
    document.getElementById("story-detail").innerHTML = `
      <div class="story-card-detail">
        <img src="${story.photoUrl}" alt="Story Image"/>
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
    document.getElementById("story-detail-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideStoryDetailLoading() {
    document.getElementById("story-detail-loading-container").innerHTML = "";
  }

  showMapLoading() {
    const el = document.getElementById("map-loading-container");
    if (el) {
      el.innerHTML = generateLoaderAbsoluteTemplate();
    }
    console.log(document.getElementById("map-loading-container")); // Harusnya bukan null
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

  async populateStoryDetailAndInitialMap(message, story) {
    document.getElementById("story-detail").innerHTML =
      generateStoryDetailTemplate({
        description: story.description,
        photoUrl: story.photoUrl,
        createdAt: story.createdAt,
        location: story.location,
      });

    // Carousel images
    createCarousel(document.getElementById("images"));

    // Map
    await this.#presenter.showStoryDetailMap();
    if (
      this.#map &&
      story.location &&
      typeof story.location.latitude === "number" &&
      typeof story.location.longitude === "number"
    ) {
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

  populateStoryDetailError(message) {
    document.getElementById("report-detail").innerHTML =
      generateStoryDetailErrorTemplate(message);
  }
}
