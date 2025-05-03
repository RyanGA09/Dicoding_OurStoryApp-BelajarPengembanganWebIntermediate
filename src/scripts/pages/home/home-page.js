// src/scripts/pages/home/home-page.js
import { generateLoaderAbsoluteTemplate } from "../../templates";
import HomePresenter from "./home-presenter";
import Map from "../../utils/map";
import * as StoryAPI from "../../data/api";

export default class HomePage {
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section>
        <div class="story-list__map__container">
          <div id="map" class="story-list__map"></div>
          <div id="map-loading-container"></div>
        </div>
      </section>
      <section class="container">
        <h1 class="section-title">Cerita dari Pengguna</h1>
        <div class="story-list__container">
          <div id="story-list"></div>
          <div id="story-list-loading-container"></div>
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

  populateStoryList(message, stories) {
    if (stories.length === 0) {
      document.getElementById("story-list").innerHTML =
        "<p>Tidak ada cerita ditemukan.</p>";
      return;
    }

    const html = stories
      .map((story) => {
        if (this.#map && story.lat && story.lon) {
          const coord = [story.lat, story.lon];
          const markerOptions = { alt: story.name };
          const popupOptions = { content: story.description };
          this.#map.addMarker(coord, markerOptions, popupOptions);
        }
        return `
        <div class="story-card">
          <img src="${story.photoUrl}" alt="Story Image"/>
          <div class="story-info">
            <h3>${story.name}</h3>
            <p>${story.description}</p>
            <small>${new Date(story.createdAt).toLocaleString()}</small>
          </div>
        </div>
      `;
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
