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

              <div>
                <button id="upload-photo-button" type="button" class="btn btn-outline">Upload dari Galeri</button>
                <input id="photo-input" name="documentations" type="file" accept="image/*" multiple
                    hidden="hidden" aria-multiline="true"
                    aria-describedby="documentations-more-info" />
                <button id="open-documentations-camera-button" type="button" class="btn btn-outline">Buka Kamera</button>
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
              <ul id="photo-preview" class="new-form__documentations__outputs></ul>
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
    this.#presenter = new NewPresenter({ view: this, model: StoryAPI });
    this.#takenDocumentations = [];
    this.#form = document.getElementById("new-story-form");
    this.#setupForm();
    await this.#presenter.showNewFormMap();
  }

  #setupForm() {
    this.#form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const description = this.#form.elements.namedItem("description").value;
      // const photo = this.#takenDocumentations[0]?.blob || null;
      const photo = this.#takenDocumentations.map((picture) => picture.blob);
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
      await this.#populateTakenPictures();
    });
  }

  async #addPhoto(image) {
    const blob =
      image instanceof String
        ? await convertBase64ToBlob(image, "image/png")
        : image;
    this.#takenDocumentations = [{ id: `${Date.now()}`, blob }];
    // await this.#showPreview();
    this.#takenDocumentations = [
      ...this.#takenDocumentations,
      newDocumentation,
    ];
  }

  // async #showPreview() {
  //   const preview = document.getElementById("photo-preview");
  //   preview.innerHTML = this.#takenPhotos
  //     .map(
  //       (p, i) =>
  //         `<li><img src="${URL.createObjectURL(p.blob)}" alt="Foto ${
  //           i + 1
  //         }" /></li>`
  //     )
  //     .join("");
  // }

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
