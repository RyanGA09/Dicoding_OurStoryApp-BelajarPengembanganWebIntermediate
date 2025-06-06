// src/scripts/pages/home/home-page.js
import {
  generateLoaderAbsoluteTemplate,
  generateStoryItemTemplate,
  generateStoriesListEmptyTemplate,
  generateStoriesListErrorTemplate,
} from "../../templates";
import HomePresenter from "./home-presenter";
import Map from "../../utils/map";
import * as OurStoryAPI from "../../data/api";

export default class HomePage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="storys-list__map__container">
          <div id="map" class="storys-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">Cerita dari Pengguna</h1>
        
        <div class="storys-list__container">
          <div id="storys-list"></div>
          <div id="storys-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({ view: this, model: OurStoryAPI });
    await this.#presenter.initialGalleryAndMap();
  }

  populateStoryList(message, stories) {
    if (stories.length <= 0) {
      this.populateStoriesListEmpty();
      return;
    }
    // console.log(stories);

    const html = stories.reduce((accumulator, story) => {
      if (!story.description) {
        console.warn("Data story tidak lengkap:", story);
        return accumulator;
      }

      if (this.#map) {
        // console.warn(story);
        if (story.location.latitude && story.location.longitude) {
          const coordinate = [
            story.location.latitude,
            story.location.longitude,
          ];
          const markerOptions = { alt: story.name };
          const popupOptions = { content: story.name };
          this.#map.addMarker(coordinate, markerOptions, popupOptions);
        }
      }

      return accumulator.concat(
        generateStoryItemTemplate({
          ...story,
          description: story.description,
        })
      );
    }, "");

    document.getElementById(
      "storys-list"
    ).innerHTML = `<div class="storys-list">${html}</div>`;
  }

  populateStoriesListError(message) {
    document.getElementById("storys-list").innerHTML =
      generateStoriesListErrorTemplate(message);
  }

  populateStoryListError(message) {
    document.getElementById(
      "storys-list"
    ).innerHTML = `<p>Gagal memuat cerita: ${message}</p>`;
  }

  async initialMap() {
    this.#map = await Map.build("#map", { zoom: 10, locate: true });
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

  showLoading() {
    document.getElementById("storys-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("storys-list-loading-container").innerHTML = "";
  }

  populateStoriesListEmpty() {
    document.getElementById("storys-list").innerHTML =
      generateStoriesListEmptyTemplate();
  }
}
