<<<<<<< HEAD
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
    <li><a class="story-list-button" href="#/bookmark">Cerita Tersimpan</a></li>
    <li><a class="story-list-button" href="#/about">About</a></li>
  `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
  <li id="push-notification-tools" class="push-notification-tools"></li>
=======
import { showFormattedDate } from "./utils";

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

// export function generateMainNavigationListTemplate() {
//   return `
//     <li><a id="report-list-button" class="report-list-button" href="#/">Daftar Laporan</a></li>
//     <li><a id="bookmark-button" class="bookmark-button" href="#/bookmark">Laporan Tersimpan</a></li>
//   `;
// }

export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    <li><a id="login-button" href="#/login">Login</a></li>
    <li><a id="register-button" href="#/register">Register</a></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
<<<<<<< HEAD
    <li><a class="btn new-story-button" href="#/new">Buat Cerita <i class="fas fa-plus"></i></a></li>
=======
    <li><a id="new-report-button" class="btn new-report-button" href="#/new">Buat Laporan <i class="fas fa-plus"></i></a></li>
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    <li><a id="logout-button" class="logout-button" href="#/logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
  `;
}

<<<<<<< HEAD
export function generateStoriesListEmptyTemplate() {
  return `
    <div class="story-list__empty">
      <h2>Tidak ada cerita yang tersedia</h2>
      <p>Saat ini, belum ada cerita yang dapat ditampilkan.</p>
=======
export function generateReportsListEmptyTemplate() {
  return `
    <div id="reports-list-empty" class="reports-list__empty">
      <h2>Tidak ada laporan yang tersedia</h2>
      <p>Saat ini, tidak ada laporan kerusakan fasilitas umum yang dapat ditampilkan.</p>
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    </div>
  `;
}

<<<<<<< HEAD
export function generateStoriesListErrorTemplate(message) {
  return `
    <div class="story-list__error">
      <h2>Terjadi kesalahan pengambilan daftar cerita</h2>
      <p>${
        message
          ? message
          : "Gunakan jaringan lain atau coba beberapa saat lagi."
=======
export function generateReportsListErrorTemplate(message) {
  return `
    <div id="reports-list-error" class="reports-list__error">
      <h2>Terjadi kesalahan pengambilan daftar laporan</h2>
      <p>${
        message ? message : "Gunakan jaringan lain atau laporkan error ini."
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      }</p>
    </div>
  `;
}

<<<<<<< HEAD
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
=======
export function generateReportDetailErrorTemplate(message) {
  return `
    <div id="reports-detail-error" class="reports-detail__error">
      <h2>Terjadi kesalahan pengambilan detail laporan</h2>
      <p>${
        message ? message : "Gunakan jaringan lain atau laporkan error ini."
      }</p>
    </div>
  `;
}

export function generateCommentsListEmptyTemplate() {
  return `
    <div id="report-detail-comments-list-empty" class="report-detail__comments-list__empty">
      <h2>Tidak ada komentar yang tersedia</h2>
      <p>Saat ini, tidak ada komentar yang dapat ditampilkan.</p>
    </div>
  `;
}

export function generateCommentsListErrorTemplate(message) {
  return `
    <div id="report-detail-comments-list-error" class="report-detail__comments-list__error">
      <h2>Terjadi kesalahan pengambilan daftar komentar</h2>
      <p>${
        message ? message : "Gunakan jaringan lain atau laporkan error ini."
      }</p>
    </div>
  `;
}

export function generateReportItemTemplate({
  id,
  title,
  description,
  evidenceImages,
  location,
  reporterName,
  createdAt,
}) {
  return `
    <div tabindex="0" class="report-item" data-reportid="${id}">
      <img class="report-item__image" src="${evidenceImages[0]}" alt="${title}">
      <div class="report-item__body">
        <div class="report-item__main">
          <h2 id="report-title" class="report-item__title">${title}</h2>
          <div class="report-item__more-info">
            <div class="report-item__createdat">
              <i class="fas fa-calendar-alt"></i> ${showFormattedDate(
                createdAt,
                "id-ID"
              )}
            </div>
            <div class="report-item__location">
              <i class="fas fa-map"></i> ${Object.values(location)}
            </div>
          </div>
        </div>
        <div id="report-description" class="report-item__description">
          ${description}
        </div>
        <div class="report-item__more-info">
          <div class="report-item__author">
            Dilaporkan oleh: ${reporterName}
          </div>
        </div>
        <a class="btn report-item__read-more" href="#/reports/${id}">
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
          Selengkapnya <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

<<<<<<< HEAD
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
  const createdAtFormatted = showFormattedDate(createdAt, "id-ID");

  return `
    <div class="story-detail__header">
      <h1 id="name" class="story-detail__title">${name}</h1>

      <div class="story-detail__more-info">
        <div class="story-detail__more-info__inline">
          <div id="createdat" class="story-detail__createdat" data-value="${createdAtFormatted}">
            <i class="fas fa-calendar-alt"></i> ${createdAtFormatted}
          </div>
          <div id="location-coordinates" class="story-detail__location__coordinates">
            <i class="fas fa-map-marker-alt"></i> ${lat}, ${lon}
          </div>
        </div>
=======
export function generateDamageLevelMinorTemplate() {
  return `
    <span class="report-detail__damage-level__minor" data-damage-level="minor">Kerusakan Rendah</span>
  `;
}

export function generateDamageLevelModerateTemplate() {
  return `
    <span class="report-detail__damage-level__moderate" data-damage-level="moderate">Kerusakan Sedang</span>
  `;
}

export function generateDamageLevelSevereTemplate() {
  return `
    <span class="report-detail__damage-level__severe" data-damage-level="severe">Kerusakan Berat</span>
  `;
}

export function generateDamageLevelBadge(damageLevel) {
  if (damageLevel === "minor") {
    return generateDamageLevelMinorTemplate();
  }

  if (damageLevel === "moderate") {
    return generateDamageLevelModerateTemplate();
  }

  if (damageLevel === "severe") {
    return generateDamageLevelSevereTemplate();
  }

  return "";
}

export function generateReportDetailImageTemplate(imageUrl = null, alt = "") {
  if (!imageUrl) {
    return `
      <img class="report-detail__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
    `;
  }

  return `
    <img class="report-detail__image" src="${imageUrl}" alt="${alt}">
  `;
}

export function generateReportCommentItemTemplate({
  photoUrlCommenter,
  nameCommenter,
  body,
}) {
  return `
    <article tabindex="0" class="report-detail__comment-item">
      <img
        class="report-detail__comment-item__photo"
        src="${photoUrlCommenter}"
        alt="Commenter name: ${nameCommenter}"
      >
      <div class="report-detail__comment-item__body">
        <div class="report-detail__comment-item__body__more-info">
          <div class="report-detail__comment-item__body__author">${nameCommenter}</div>
        </div>
        <div class="report-detail__comment-item__body__text">${body}</div>
      </div>
    </article>
  `;
}

export function generateReportDetailTemplate({
  title,
  description,
  damageLevel,
  evidenceImages,
  latitudeLocation,
  longitudeLocation,
  reporterName,
  createdAt,
}) {
  const createdAtFormatted = showFormattedDate(createdAt, "id-ID");
  const damageLevelBadge = generateDamageLevelBadge(damageLevel);
  const imagesHtml = evidenceImages.reduce(
    (accumulator, evidenceImage) =>
      accumulator.concat(
        generateReportDetailImageTemplate(evidenceImage, title)
      ),
    ""
  );

  return `
    <div class="report-detail__header">
      <h1 id="title" class="report-detail__title">${title}</h1>

      <div class="report-detail__more-info">
        <div class="report-detail__more-info__inline">
          <div id="createdat" class="report-detail__createdat" data-value="${createdAtFormatted}"><i class="fas fa-calendar-alt"></i></div>
          <div id="location-place-name" class="report-detail__location__place-name" data-value="${location.placeName}"><i class="fas fa-map"></i></div>
        </div>
        <div class="report-detail__more-info__inline">
          <div id="location-latitude" class="report-detail__location__latitude" data-value="${location.latitude}">Latitude:</div>
          <div id="location-longitude" class="report-detail__location__longitude" data-value="${location.longitude}">Longitude:</div>
        </div>
        <div id="author" class="report-detail__author" data-value="${reporterName}">Dilaporkan oleh:</div>
      </div>

      <div id="damage-level" class="report-detail__damage-level">
        ${damageLevelBadge}
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      </div>
    </div>

    <div class="container">
<<<<<<< HEAD
      <div class="story-detail__image__container">
        <div id="images" class="story-detail__image">
          <img src="${photoUrl}" alt="Cerita dari ${name}" />
        </div>
=======
      <div class="report-detail__images__container">
        <div id="images" class="report-detail__images">${imagesHtml}</div>
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      </div>
    </div>

    <div class="container">
<<<<<<< HEAD
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
            <div id="notify-me-actions-container">
              <button id="story-detail-notify-me" class="btn btn-transparent">
=======
      <div class="report-detail__body">
        <div class="report-detail__body__description__container">
          <h2 class="report-detail__description__title">Informasi Lengkap</h2>
          <div id="description" class="report-detail__description__body">
            ${description}
          </div>
        </div>
        <div class="report-detail__body__map__container">
          <h2 class="report-detail__map__title">Peta Lokasi</h2>
          <div class="report-detail__map__container">
            <div id="map" class="report-detail__map"></div>
            <div id="map-loading-container"></div>
          </div>
        </div>
  
        <hr>
  
        <div class="report-detail__body__actions__container">
          <h2>Aksi</h2>
          <div class="report-detail__actions__buttons">
            <div id="save-actions-container"></div>
            <div id="notify-me-actions-container">
              <button id="report-detail-notify-me" class="btn btn-transparent">
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
                Try Notify Me <i class="far fa-bell"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
<<<<<<< HEAD
=======

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

// export function generateSaveReportButtonTemplate() {
//   return `
//     <button id="report-detail-save" class="btn btn-transparent">
//       Simpan laporan <i class="far fa-bookmark"></i>
//     </button>
//   `;
// }

// export function generateRemoveReportButtonTemplate() {
//   return `
//     <button id="report-detail-remove" class="btn btn-transparent">
//       Buang laporan <i class="fas fa-bookmark"></i>
//     </button>
//   `;
// }
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
