// src/scripts/utils/templates.js
import { showFormattedDate } from "./utils";

export function generateLoaderAbsoluteTemplate() {
  return `<div class="loader loader-absolute"></div>`;
}

export function generateMainNavigationListTemplate() {
  return `
    <li><a class="story-list-button" href="#/">Daftar Cerita Pengguna</a></li>
    <li><a class="story-list-button" href="#/bookmark">Cerita Tersimpan</a></li>
    <li><a class="story-list-button" href="#/about">About</a></li>
  `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
  <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a id="login-button" href="#/login">Login</a></li>
    <li><a id="register-button" href="#/register">Register</a></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a class="btn new-story-button" href="#/new">Buat Cerita <i class="fas fa-plus"></i></a></li>
    <li><a class="profile-button" href="#/profile"><i class="fas fa-user"></i> Profil</a></li>
    <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
  `;
}

export function generateStoriesListEmptyTemplate() {
  return `
    <div id="storys-list-empty" class="storys-list__empty">
      <h2>Tidak ada cerita yang tersedia</h2>
      <p>Saat ini, belum ada cerita yang dapat ditampilkan.</p>
    </div>
  `;
}

export function generateStoriesListErrorTemplate(message) {
  return `
    <div class="story-list__error">
      <h2>Terjadi kesalahan pengambilan daftar cerita</h2>
      <p>${
        message
          ? message
          : "Gunakan jaringan lain atau coba beberapa saat lagi."
      }</p>
    </div>
  `;
}

export function generateStoryItemTemplate({
  id,
  name,
  description,
  photoUrl,
  location,
  createdAt,
}) {
  return `
    <div tabindex="0" class="story-item" data-storyid="${id}">
      <img class="story-item__image" src="${photoUrl}" alt="Foto Cerita" />
      
      <div class="story-item__body">
        <h2 class="story-item__title">${name}</h2>
        <p class="story-item__description">${description}</p>
        <div class="story-item__date">
          <i class="fas fa-calendar-alt"></i> ${showFormattedDate(
            createdAt,
            "id-ID"
          )}
        </div>
        <div class="story-item__location">
          <i class="fas fa-map"></i> ${location.placeName}
        </div>
        <a class="btn story-item__read-more" href="#/stories/${id}">
          Selengkapnya <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

export function generateStoryDetailErrorTemplate(message) {
  return `
    <div class="story-detail__error">
      <h2>Terjadi kesalahan pengambilan detail cerita</h2>
      <p>${message ? message : "Silakan coba kembali nanti."}</p>
    </div>
  `;
}

export function generateStoryDetailImageTemplate(imageUrl = null, alt = "") {
  if (!imageUrl) {
    return `
      <img class="story-detail__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
    `;
  }

  return `
    <img class="story-detail__image" src="${imageUrl}" alt="${alt}">
  `;
}

export function generateStoryDetailTemplate({
  name,
  description,
  photoUrl,
  location,
  createdAt,
}) {
  const createdAtFormatted = showFormattedDate(createdAt, "id-ID");
  const imagesHtml = generateStoryDetailImageTemplate(photoUrl, name);

  return `
    <div class="story-detail__header">
      <h1 id="name" class="story-detail__title">${name}</h1>

      <div class="story-detail__more-info">
        <div class="story-detail__more-info__inline">
          <div id="createdat" class="story-detail__createdat" data-value="${createdAtFormatted}">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <div id="location-place-name" class="story-detail__location__place-name" data-value="${location.placeName}"><i class="fas fa-map"></i></div>
        </div>
        <div class="story-detail__more-info__inline">
          <div id="location-coordinates" class="story-detail__location__coordinates">
            <i class="fas fa-map-marker-alt"></i> ${location.latitude}, ${location.longitude}
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="story-detail__images__container">
        <div id="images" class="story-detail__images">${imagesHtml}</div>
      </div>
    </div>

    <div class="container">
      <div class="story-detail__body">
        <div class="story-detail__body__description__container">
          <h2 class="story-detail__description__title">Deskripsi Cerita</h2>
          <div id="description" class="story-detail__description__body">
            ${description}
          </div>
        </div>
        <div class="story-detail__body__map__container">
          <h2 class="story-detail__map__title">Peta Lokasi</h2>
          <div class="story-detail__map__container">
            <div id="map" class="story-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
        </div>

        <hr>

        <div class="story-detail__body__actions__container">
          <h2>Aksi</h2>
          <div class="story-detail__actions__buttons">
            <div id="save-actions-container"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}

export function generateSaveStoryButtonTemplate() {
  return `
    <button id="story-detail-save" class="btn btn-transparent">
      Simpan Cerita <i class="far fa-bookmark"></i>
    </button>
  `;
}

export function generateRemoveStoryButtonTemplate() {
  return `
    <button id="story-detail-remove" class="btn btn-transparent">
      Buang Cerita <i class="fas fa-bookmark"></i>
    </button>
  `;
}
