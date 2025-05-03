// src/scripts/pages/new/new-page.js
import NewPresenter from "./new-presenter";
import { convertBase64ToBlob } from "../../utils";
import * as StoryAPI from "../../data/api";
import { generateLoaderAbsoluteTemplate } from "../../templates";
import Camera from "../../utils/camera";
import Map from "../../utils/map";

export default class NewPage {
  #presenter;
  #form;
  #camera;
  #isCameraOpen = false;
  #takenPhotos = [];
  #map = null;

  async render() {
    return `
      <section class="new-story__header">
        <div class="container">
          <h1 class="new-story__header__title">Buat Cerita Baru</h1>
          <p class="new-story__header__description">
            Unggah cerita menarik Anda yang terjadi di sekitar.
          </p>
        </div>
      </section>

      <section class="container">
        <form id="new-story-form" class="new-form">
          <div class="form-control">
            <label for="description-input">Deskripsi Cerita</label>
            <textarea id="description-input" name="description" placeholder="Tulis cerita Anda..."></textarea>
          </div>

          <div class="form-control">
            <label for="photo-input">Foto Cerita</label>
            <div>
              <button id="upload-photo-button" type="button">Upload dari Galeri</button>
              <input id="photo-input" type="file" accept="image/*" hidden />
              <button id="toggle-camera-button" type="button">Buka Kamera</button>
            </div>
            <div id="camera-container" style="display: none">
              <video id="camera-video"></video>
              <canvas id="camera-canvas"></canvas>
              <select id="camera-select"></select>
              <button id="take-photo-button" type="button">Ambil Gambar</button>
            </div>
            <ul id="photo-preview"></ul>
          </div>

          <div class="form-control">
            <label>Lokasi</label>
            <div id="map" class="form-map"></div>
            <div>
              <input type="number" name="latitude" disabled />
              <input type="number" name="longitude" disabled />
            </div>
          </div>

          <div class="form-buttons">
            <span id="submit-button-container">
              <button type="submit">Kirim Cerita</button>
            </span>
          </div>
        </form>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new NewPresenter({ view: this, model: StoryAPI });
    this.#form = document.getElementById("new-story-form");
    this.#setupForm();
    await this.#presenter.showNewFormMap();
  }

  #setupForm() {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const description = this.#form.elements.namedItem("description").value;
      const photo = this.#takenPhotos[0]?.blob || null;
      const latitude = this.#form.elements.namedItem("latitude").value;
      const longitude = this.#form.elements.namedItem("longitude").value;

      if (!photo) return alert("Mohon sertakan gambar.");
      await this.#presenter.postNewStory({
        description,
        photo,
        latitude,
        longitude,
      });
    });

    document
      .getElementById("upload-photo-button")
      .addEventListener("click", () => {
        this.#form.elements.namedItem("photo-input").click();
      });

    document
      .getElementById("photo-input")
      .addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) await this.#addPhoto(file);
      });

    document
      .getElementById("toggle-camera-button")
      .addEventListener("click", async () => {
        const cameraContainer = document.getElementById("camera-container");
        this.#isCameraOpen = !this.#isCameraOpen;
        cameraContainer.style.display = this.#isCameraOpen ? "block" : "none";
        if (this.#isCameraOpen) {
          this.#setupCamera();
          await this.#camera.launch();
        } else {
          this.#camera.stop();
        }
      });
  }

  async initialMap() {
    this.#map = await Map.build("#map", { zoom: 15, locate: true });
    const center = this.#map.getCenter();
    this.#updateLatLngInput(center.latitude, center.longitude);
    const marker = this.#map.addMarker([center.latitude, center.longitude], {
      draggable: "true",
    });
    marker.addEventListener("move", (e) => {
      const coord = e.target.getLatLng();
      this.#updateLatLngInput(coord.lat, coord.lng);
    });
    this.#map.addMapEventListener("click", (e) => {
      marker.setLatLng(e.latlng);
      e.sourceTarget.flyTo(e.latlng);
    });
  }

  #updateLatLngInput(lat, lng) {
    this.#form.elements.namedItem("latitude").value = lat;
    this.#form.elements.namedItem("longitude").value = lng;
  }

  #setupCamera() {
    if (!this.#camera) {
      this.#camera = new Camera({
        video: document.getElementById("camera-video"),
        cameraSelect: document.getElementById("camera-select"),
        canvas: document.getElementById("camera-canvas"),
      });
    }
    this.#camera.addCheeseButtonListener("#take-photo-button", async () => {
      const image = await this.#camera.takePicture();
      await this.#addPhoto(image);
    });
  }

  async #addPhoto(image) {
    const blob =
      image instanceof String
        ? await convertBase64ToBlob(image, "image/png")
        : image;
    this.#takenPhotos = [{ id: `${Date.now()}`, blob }];
    await this.#showPreview();
  }

  async #showPreview() {
    const preview = document.getElementById("photo-preview");
    preview.innerHTML = this.#takenPhotos
      .map(
        (p, i) =>
          `<li><img src="${URL.createObjectURL(p.blob)}" alt="Foto ${
            i + 1
          }" /></li>`
      )
      .join("");
  }

  storeSuccessfully(msg) {
    alert("Cerita berhasil diunggah!");
    location.hash = "/";
  }

  storeFailed(msg) {
    alert(`Gagal mengunggah cerita: ${msg}`);
  }

  showMapLoading() {
    document.getElementById("map").innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map").innerHTML = "";
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Mengirim...
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit">Kirim Cerita</button>
    `;
  }
}
