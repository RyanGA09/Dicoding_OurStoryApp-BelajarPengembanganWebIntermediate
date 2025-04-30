// import { postStory } from "../../data/api";
// import L from "leaflet";

// export default class AddStoryPresenter {
//   #view;

//   constructor(view) {
//     this.#view = view;
//   }

//   async init() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.hash = "#/login";
//       return;
//     }

//     const form = document.getElementById("storyForm");
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const photo = document.getElementById("photo").files[0];
//       const description = document.getElementById("description").value;
//       const latitude = document.getElementById("latitude").value;
//       const longitude = document.getElementById("longitude").value;

//       if (!photo || !description || !latitude || !longitude) {
//         alert("Harap lengkapi semua form!");
//         return;
//       }

//       try {
//         await postStory(photo, description, latitude, longitude);
//         alert("Cerita berhasil ditambahkan!");
//         window.location.hash = "/";
//       } catch (error) {
//         alert("Gagal menambahkan cerita!");
//         console.error(error);
//       }
//     });

//     this.#setupMap();
//   }

//   #setupMap() {
//     const map = L.map("map").setView([-6.2, 106.8], 13);
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
//       map
//     );

//     map.on("click", function (e) {
//       document.getElementById("latitude").value = e.latlng.lat;
//       document.getElementById("longitude").value = e.latlng.lng;
//     });
//   }
// }

export default class NewPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error("showNewFormMap: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async postNewStory({
    title,
    damageLevel,
    description,
    storyImages,
    latitude,
    longitude,
  }) {
    this.#view.showSubmitLoadingButton();
    try {
      const data = {
        title: title,
        damageLevel: damageLevel,
        description: description,
        storyImages: storyImages,
        latitude: latitude,
        longitude: longitude,
      };
      const response = await this.#model.storeNewStory(data);

      if (!response.ok) {
        console.error("postNewStory: response:", response);
        this.#view.storeFailed(response.message);
        return;
      }

      this.#view.storeSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("postNewstory: error:", error);
      this.#view.storeFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
