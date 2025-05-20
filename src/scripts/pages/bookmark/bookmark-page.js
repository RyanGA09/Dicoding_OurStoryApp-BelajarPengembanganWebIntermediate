import {
  generateLoaderAbsoluteTemplate,
  generateStoryItemTemplate,
  generateStoriesListEmptyTemplate,
  generateStoriesListErrorTemplate,
} from "../../templates";
import BookmarkPresenter from "./bookmark-presenter";
import Database from "../../data/database";
import Map from "../../utils/map";

export default class BookmarkPage {
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
        <h1 class="section-title">Daftar Cerita Tersimpan</h1>

        <div class="storys-list__container">
          <div id="storys-list"></div>
          <div id="storys-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new BookmarkPresenter({
      view: this,
      model: Database,
    });
    await this.#presenter.initialGalleryAndMap();
  }

  populateBookmarkedStories(message, storys) {
    if (storys.length <= 0) {
      this.populateBookmarkedStoriesListEmpty();
      return;
    }

    const html = storys.reduce((accumulator, story) => {
      if (this.#map) {
        const coordinate = [story.location.latitude, story.location.longitude];
        const markerOptions = { alt: story.title };
        const popupOptions = { content: story.title };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }

      return accumulator.concat(
        generateStoryItemTemplate({
          ...story,
          // placeNameLocation: story.location.placeName,
          description: story.description,
        })
      );
    }, "");

    document.getElementById("storys-list").innerHTML = `
      <div class="storys-list">${html}</div>
    `;
  }

  populateBookmarkedStoriesListEmpty() {
    document.getElementById("storys-list").innerHTML =
      generateStoriesListEmptyTemplate();
  }

  populateBookmarkedStoriesError(message) {
    document.getElementById("storys-list").innerHTML =
      generateStoriesListErrorTemplate(message);
  }

  showStoriesListLoading() {
    document.getElementById("storys-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideStorysListLoading() {
    document.getElementById("storys-list-loading-container").innerHTML = "";
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 10,
      locate: true,
    });
  }
  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }
  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
  }
}
