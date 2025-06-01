// src/scripts/pages/new/new-page.js
import NewPresenter from "./new-presenter";
import { convertBase64ToBlob } from "../../utils";
import * as OurStoryAPI from "../../data/api";
import { generateLoaderAbsoluteTemplate } from "../../templates";
import Camera from "../../utils/camera";
import Map from "../../utils/map";

export default class NewPage {
  #presenter;
  #form;
  #camera;
  #isCameraOpen = false;
  #takenDocumentations = [];
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
        <div class="new-form__container">
          <form id="new-story-form" class="new-form">
            <div class="form-control">
              <label for="description-input">Deskripsi Cerita</label>
              <textarea id="description-input" name="description" placeholder="Tulis cerita Anda..."></textarea>
            </div>

            <div class="form-control">
              <label for="photo-input" class="new-form__documentations__title">Foto Cerita</label>
              <div id="documentations-more-info">Anda dapat menyertakan foto sebagai dokumentasi.</div>

              <div class="new-form__documentations__container">
                <div class="new-form__documentations__buttons">
                  <button id="upload-photo-button" type="button" class="btn btn-outline">Upload dari Galeri</button>
                  <input id="photo-input" name="documentations" type="file" accept="image/*" multiple
                      hidden="hidden" aria-multiline="true"
                      aria-describedby="documentations-more-info" />
                  <button id="open-documentations-camera-button" type="button" class="btn btn-outline">Buka Kamera</button>
                </div>
              </div>

              <div id="camera-container" class="new-form__camera__container">
                  <video id="camera-video" class="new-form__camera__video">
                    Video stream not available.
                  </video>
                  <canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>
  
                  <div class="new-form__camera__tools">
                    <select id="camera-select"></select>
                    <div class="new-form__camera__tools_buttons">
                      <button id="camera-take-button" class="btn" type="button">
                        Ambil Gambar
                      </button>
                    </div>
                  </div>
                </div>
              <ul id="documentations-taken-list" class="new-form__documentations__outputs"></ul>
            </div>

            <div class="form-control">
                <div class="new-form__location__title">Lokasi</div>
    
                <div class="new-form__location__container">
                  <div class="new-form__location__map__container">
                    <div id="map" class="new-form__location__map"></div>
                    <div id="map-loading-container"></div>
                  </div>
                  <div class="new-form__location__lat-lng">
                    <input type="number" name="latitude" value="-6.175389" disabled>
                    <input type="number" name="longitude" value="106.827139" disabled>
                  </div>
                </div>
              </div>

            <div class="form-buttons">
              <span id="submit-button-container">
                <button type="submit">Kirim Cerita</button>
              </span>
              <a class="btn btn-outline" href="#/">Batal</a>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new NewPresenter({ view: this, model: OurStoryAPI });
    this.#takenDocumentations = [];
    this.#form = document.getElementById("new-story-form");
    this.#setupForm();
    await this.#presenter.showNewFormMap();
  }

  #setupForm() {
    this.#form = document.getElementById("new-story-form");
    this.#form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = {
        description: this.#form.elements.namedItem("description").value,
        photo: this.#takenDocumentations.map((picture) => picture.blob),
        lat: Number(this.#form.elements.namedItem("latitude").value),
        lon: Number(this.#form.elements.namedItem("longitude").value),
      };
      await this.#presenter.postNewStory(data);
    });

    document
      .getElementById("photo-input")
      .addEventListener("change", async (event) => {
        const insertingPicturesPromises = Object.values(event.target.files).map(
          async (file) => {
            return await this.#addTakenPicture(file);
          }
        );
        await Promise.all(insertingPicturesPromises);

        await this.#populateTakenPictures();
      });

    document
      .getElementById("upload-photo-button")
      .addEventListener("click", () => {
        this.#form.elements.namedItem("photo-input").click();
      });

    const cameraContainer = document.getElementById("camera-container");
    document
      .getElementById("open-documentations-camera-button")
      .addEventListener("click", async (event) => {
        cameraContainer.classList.toggle("open");
        this.#isCameraOpen = cameraContainer.classList.contains("open");

        if (this.#isCameraOpen) {
          event.currentTarget.textContent = "Tutup Kamera";
          this.#setupCamera();
          await this.#camera.launch();

          return;
        }

        event.currentTarget.textContent = "Buka Kamera";
        this.#camera.stop();
      });
  }

  async initialMap() {
    this.#map = await Map.build("#map", {
      zoom: 15,
      locate: true,
    });

    // Preparing marker for select coordinate
    const centerCoordinate = this.#map.getCenter();

    this.#updateLatLngInput(
      centerCoordinate.latitude,
      centerCoordinate.longitude
    );

    const draggableMarker = this.#map.addMarker(
      [centerCoordinate.latitude, centerCoordinate.longitude],
      { draggable: "true" }
    );
    draggableMarker.addEventListener("move", (event) => {
      const coordinate = event.target.getLatLng();
      this.#updateLatLngInput(coordinate.lat, coordinate.lng);
    });

    this.#map.addMapEventListener("click", (event) => {
      draggableMarker.setLatLng(event.latlng);

      // Keep center with user view
      event.sourceTarget.flyTo(event.latlng);
    });
  }

  #updateLatLngInput(latitude, longitude) {
    this.#form.elements.namedItem("latitude").value = latitude;
    this.#form.elements.namedItem("longitude").value = longitude;
  }

  #setupCamera() {
    if (!this.#camera) {
      this.#camera = new Camera({
        video: document.getElementById("camera-video"),
        cameraSelect: document.getElementById("camera-select"),
        canvas: document.getElementById("camera-canvas"),
      });
    }
    this.#camera.addCheeseButtonListener("#camera-take-button", async () => {
      const image = await this.#camera.takePicture();
      await this.#addTakenPicture(image);
      await this.#populateTakenPictures();
    });
  }

  async #addTakenPicture(image) {
    let blob = image;

    if (image instanceof String) {
      blob = await convertBase64ToBlob(image, "image/png");
    }

    const newDocumentation = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      blob: blob,
    };
    this.#takenDocumentations = [
      ...this.#takenDocumentations,
      newDocumentation,
    ];
  }

  async #populateTakenPictures() {
    const html = this.#takenDocumentations.reduce(
      (accumulator, picture, currentIndex) => {
        const imageUrl = URL.createObjectURL(picture.blob);
        return accumulator.concat(`
        <li class="new-form__documentations__outputs-item">
          <button type="button" data-deletepictureid="${
            picture.id
          }" class="new-form__documentations__outputs-item__delete-btn">
            <img src="${imageUrl}" alt="Dokumentasi ke-${currentIndex + 1}">
          </button>
        </li>
      `);
      },
      ""
    );

    document.getElementById("documentations-taken-list").innerHTML = html;

    document
      .querySelectorAll("button[data-deletepictureid]")
      .forEach((button) =>
        button.addEventListener("click", (event) => {
          const pictureId = event.currentTarget.dataset.deletepictureid;

          const deleted = this.#removePicture(pictureId);
          if (!deleted) {
            console.log(`Picture with id ${pictureId} was not found`);
          }

          // Updating taken pictures
          this.#populateTakenPictures();
        })
      );
  }

  #removePicture(id) {
    const selectedPicture = this.#takenDocumentations.find((picture) => {
      return picture.id == id;
    });

    // Check if founded selectedPicture is available
    if (!selectedPicture) {
      return null;
    }

    // Deleting selected selectedPicture from takenPictures
    this.#takenDocumentations = this.#takenDocumentations.filter((picture) => {
      return picture.id != selectedPicture.id;
    });

    return selectedPicture;
  }

  storeSuccessfully(msg) {
    console.log(msg);
    this.clearForm();

    // Redirect page
    location.hash = "/";
  }

  storeFailed(msg) {
    alert(`Gagal mengunggah cerita: ${msg}`);
  }

  clearForm() {
    this.#form.reset();
  }

  showMapLoading() {
    document.getElementById("map-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById("map-loading-container").innerHTML = "";
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
