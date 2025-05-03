// src/scripts/pages/home/home-page.js
import {
  generateLoaderAbsoluteTemplate,
  generateStoryItemTemplate,
  generateStoriesListEmptyTemplate,
  generateStoriesListErrorTemplate,
} from "../../templates";
import HomePresenter from "./home-presenter";
import Map from "../../utils/map";
import * as StoryAPI from "../../data/api";

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
    this.#presenter = new HomePresenter({ view: this, model: StoryAPI });
    await this.#presenter.loadStoriesAndMap();
  }

  async initialMap() {
    this.#map = await Map.build("#map", { zoom: 5, locate: true });
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }

  showLoading() {
    document.getElementById("story-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("story-list-loading-container").innerHTML = "";
  }

  populateStoriesListEmpty() {
    document.getElementById("storys-list").innerHTML =
      generateStoriesListEmptyTemplate();
  }

  populateStoriesListError(message) {
    document.getElementById("storys-list").innerHTML =
      generateStoriesListErrorTemplate(message);
  }

  populateStoryList(message, stories) {
    if (reports.length <= 0) {
      this.populateStoriesListEmpty();
      return;
    }

    const html = stories
      .reduce((accumulator, story) => {
        if (this.#map) {
          const coordinate = [story.lat, story.lon];
          const markerOptions = { alt: story.name };
          const popupOptions = { content: story.description };
          this.#map.addMarker(coordinate, markerOptions, popupOptions);
        }
        return accumulator.concat(
          generateStoryItemTemplate({
            ...story,
            storyDescription: story.story.description,
          })
        );
      })
      .join("");

    document.getElementById(
      "story-list"
    ).innerHTML = `<div class="story-list">${html}</div>`;
  }

  populateStoryListError(message) {
    document.getElementById(
      "story-list"
    ).innerHTML = `<p>Gagal memuat cerita: ${message}</p>`;
  }
}
