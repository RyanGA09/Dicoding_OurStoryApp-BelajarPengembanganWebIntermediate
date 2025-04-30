// import HomePresenter from "./home-presenter.js";
// import Map from "../../utils/map";

// export default class HomePage {
//   #presenter = null;
//   #map = null;

//   async render() {
//     return `
//       <section class="container">
//         <h1 class="section-title">Cerita Terbaru</h1>
//         <div id="story-list" class="story-list"></div>

//         <!-- Peta dipisahkan sebagai elemen khusus -->
//         <div class="map-fixed-footer">
//           <div class="map-header">Peta Lokasi Cerita</div>
//           <div id="map"></div>
//         </div>
//       </section>
//     `;
//   }

//   async afterRender() {
//     this.#presenter = new HomePresenter(this);
//     await this.initialMap();
//     await this.#presenter.showStories();
//   }

//   // async #setupMap() {
//   //   this.#map = L.map("map").setView([-6.2, 106.8], 5);
//   //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   //     attribution:
//   //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   //   }).addTo(this.#map);
//   // }
//   async initialMap() {
//     this.#map = await Map.build("#map", {
//       zoom: 10,
//       locate: true,
//     });
//   }

//   showStories(stories) {
//     const container = document.getElementById("story-list");

//     if (stories && stories.length > 0) {
//       container.innerHTML = stories
//         .map((story) => {
//           if (story.lat && story.lon) {
//             L.marker([story.lat, story.lon])
//               .addTo(this.#map)
//               .bindPopup(
//                 `<b>${story.name}</b><br>${story.description.slice(0, 50)}...`
//               );
//           }

//           return `
//           <div class="story-item">
//             <img src="${story.photoUrl}" alt="${story.name}" />
//             <h3>${story.name}</h3>
//             <p class="date">${new Date(story.createdAt).toLocaleDateString(
//               "id-ID"
//             )}</p>
//             <p>${story.description.slice(0, 100)}...</p>
//             ${
//               story.lat && story.lon
//                 ? `
//               <a href="https://maps.google.com?q=${story.lat},${story.lon}" target="_blank" class="map-link">
//                 Lihat Lokasi di Google Maps
//               </a>`
//                 : ""
//             }
//             <a href="#/detail/${story.id}" class="btn-detail">Lihat Detail</a>
//           </div>
//         `;
//         })
//         .join("");
//     } else {
//       container.innerHTML = `<p>Belum ada cerita yang diposting.</p>`;
//     }
//   }
// }

import {
  generateLoaderAbsoluteTemplate,
  generateStoryItemTemplate,
  generateStorysListEmptyTemplate,
  generateStorysListErrorTemplate,
} from "../../templates";
import HomePresenter from "./home-presenter";
import Map from "../../utils/map";
import * as CityCareAPI from "../../data/api";

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
        <h1 class="section-title">Daftar Laporan Kerusakan</h1>

        <div class="storys-list__container">
          <div id="storys-list"></div>
          <div id="storys-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: CityCareAPI,
    });

    await this.#presenter.initialGalleryAndMap();
  }

  populatestorysList(message, storys) {
    if (storys.length <= 0) {
      this.populatestorysListEmpty();
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
          storyerName: story.storyer.name,
        })
      );
    }, "");

    document.getElementById("storys-list").innerHTML = `
      <div class="storys-list">${html}</div>
    `;
  }

  populateStorysListEmpty() {
    document.getElementById("storys-list").innerHTML =
      generateStorysListEmptyTemplate();
  }

  populatestorysListError(message) {
    document.getElementById("storys-list").innerHTML =
      generateStorysListErrorTemplate(message);
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

  showLoading() {
    document.getElementById("storys-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("storys-list-loading-container").innerHTML = "";
  }
}
