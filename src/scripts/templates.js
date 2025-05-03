// src/scripts/template.js
import { showFormattedDate } from "./utils";

export function generateLoaderTemplate() {
  return `<div class="loader"></div>`;
}

export function generateLoaderAbsoluteTemplate() {
  return `<div class="loader loader-absolute"></div>`;
}

export function generateMainNavigationListTemplate() {
  return `
    <li><a class="story-list-button" href="#/">Daftar Cerita Pengguna</a></li>
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
    <li><a class="btn about-story-button btn-outline" href="#/about">About</a></li>
    <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
  `;
}

export function generateStoriesListEmptyTemplate() {
  return `
    <div class="story-list__empty">
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

export function generateStoryDetailTemplate({
  name,
  description,
  photoUrl,
  createdAt,
  lat,
  lon,
}) {
  return `
    <div class="story-detail__header">
      <h1 class="story-detail__title">${name}</h1>
      <div class="story-detail__info">
        <div><i class="fas fa-calendar-alt"></i> ${showFormattedDate(
          createdAt,
          "id-ID"
        )}</div>
        <div><i class="fas fa-map-marker-alt"></i> ${lat}, ${lon}</div>
      </div>
    </div>
    <div class="story-detail__image">
      <img src="${photoUrl}" alt="Cerita dari ${name}" />
    </div>
    <div class="story-detail__description">
      <p>${description}</p>
    </div>
    <div class="story-detail__map" id="map"></div>
    <div id="map-loading-container"></div>
  `;
}
