# Dicoding Submission - OurStoryApp (Belajar Pengembangan Web Intermediate (Learn Intermediate Web Development))

## Author

Ryan Gading Abdullah

## Date Created

April 2025

## Description

OurStoryApp is a **Single Page Application (SPA)** web app developed to fulfill the submission requirements for the **Learn Intermediate Web Development** course from Dicoding. This application allows users to share stories through photos, descriptions, and locations. It integrates with the Dicoding Story API, uses **Leaflet.js** for maps, **Web Notification API**, and is optimized to meet **WCAG accessibility standards**.

## 📌 Folder Structure

```bash
📦 Dicoding_OurStoryApp-BelajarPengembanganWebIntermediate
├── 📁 public
│   ├── 📁 images
│   │   ├── 📁 icons
│   │   │   ├── 📄 add-x512.png
│   │   │   ├── 📄 bookmark-x512.png
│   │   │   ├── 📄 favicon.png
│   │   │   ├── 📄 maskable_icon (1).png
│   │   │   ├── 📄 maskable_icon (2).png
│   │   │   ├── 📄 maskable-icon-x48.png
│   │   │   ├── 📄 maskable-icon-x72.png
│   │   │   ├── 📄 maskable-icon-x96.png
│   │   │   ├── 📄 maskable-icon-x128.png
│   │   │   ├── 📄 maskable-icon-x144.png
│   │   │   ├── 📄 maskable-icon-x192.png
│   │   │   ├── 📄 maskable-icon-x384.png
│   │   │   ├── 📄 maskable-icon-x512.png
│   │   │   ├── 📄 OurStory.png
│   │   │   ├── 📄 OurStory (1).png
│   │   │   └── 📄 OurStory (2).png
│   │   ├── 📁 screenshots
│   │   │   ├── 📄 OurStoryApp_001.png
│   │   │   ├── 📄 OurStoryApp_002.png
│   │   │   ├── 📄 OurStoryApp_003.png
│   │   │   ├── 📄 OurStoryApp_004.png
│   │   │   ├── 📄 OurStoryApp_005.png
│   │   │   └── 📄 OurStoryApp_006.png
│   │   └── 📄 logo.png
│   ├── 📄 app.webmanifest
│   └── 📄 favicon.png
├── 📁 src
│   ├── 📁 scripts
│   │   ├── 📁 data
│   │   │   ├── 📄 api-mapper.js
│   │   │   ├── 📄 api.js
│   │   │   └── 📄 database.js
│   │   ├── 📁 pages
│   │   │   ├── 📁 about
│   │   │   │   ├── 📄 about-page.js
│   │   │   │   └── 📄 about-presenter.js
│   │   │   ├── 📁 auth
│   │   │   │   ├── 📁 login
│   │   │   │   │   ├── 📄 login-page.js
│   │   │   │   │   └── 📄 login-presenter.js
│   │   │   │   ├── 📁 register
│   │   │   │   │   ├── 📄 register-page.js
│   │   │   │   │   └── 📄 register-presenter.js
│   │   │   ├── 📁 bookmark
│   │   │   │   ├── 📄 bookmark-page.js
│   │   │   │   └── 📄 bookmark-presenter.js
│   │   │   ├── 📁 home
│   │   │   │   ├── 📄 home-page.js
│   │   │   │   └── 📄 home-presenter.js
│   │   │   ├── 📁 new
│   │   │   │   ├── 📄 new-page.js
│   │   │   │   └── 📄 new-presenter.js
│   │   │   ├── 📁 not-found
│   │   │   │   ├── 📄 not-found-page.js
│   │   │   │   └── 📄 not-found-presenter.js
│   │   │   ├── 📁 story-detail
│   │   │   │   ├── 📄 story-detail-page.js
│   │   │   │   └── 📄 story-detail-presenter.js
│   │   │   └── 📄 app.js
│   │   ├── 📁 routes
│   │   │   ├── 📄 routes.js
│   │   │   └── 📄 url-parser.js
│   │   ├── 📁 utils
│   │   │   ├── 📄 auth.js
│   │   │   ├── 📄 camera.js
│   │   │   ├── 📄 index.js
│   │   │   ├── 📄 loader.js
│   │   │   ├── 📄 map.js
│   │   │   └── 📄 notification-helper.js
│   │   ├── 📄 config.js
│   │   ├── 📄 index.js
│   │   └── 📄 template.js
│   ├── 📁 styles
│   │   ├── 📄 responsives.css
│   │   └── 📄 styles.css
│   ├── 📄 sw.js
│   └── 📄 index.html
├── 📄 .gitignore
├── 📄 LICENSE
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
├── 📄 STUDENT.txt
└── 📄 webpack.common.js
└── 📄 webpack.dev.js
└── 📄 webpack.prod.js
```

---

## 📲 Instalation & Setup

1. **Clone Repository**

   ```bash
   git clone https://github.com/RyanGA09/Dicoding_OurStoryApp-BelajarPengembanganWebIntermediate.git
   ```

2. **Change Directory**

   ```bash
   cd Dicoding_OurStoryApp-BelajarPengembanganWebIntermediate
   ```

3. **Open in VS Code**

   ```bash
   code .
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Enter Map API Key (if applicable)**

   - Create a STUDENT.txt file at the root of the project
   - Fill with:

     ```bash
     API_KEY=YOUR_MAP_API_KEY
     ```

     **📌 Note: No API key is required for Dicoding Story API. A token will be obtained via the login process.**

6. **Scripts**

   - `npm install --save workbox-routing workbox-strategies`: Menginstal modul Workbox untuk mengatur routing dan strategi caching pada service worker.
   - `npm install --save-dev workbox-webpack-plugin`: Plugin Webpack untuk menggenerate service worker secara otomatis menggunakan Workbox saat build production.
   - `npm install --save workbox-precaching`: Digunakan untuk precaching aset-aset statis, sehingga bisa digunakan offline dengan optimal.
   - `npm install --save workbox-routing workbox-strategies workbox-cacheable-response`: Tambahan modul Workbox untuk mendukung response caching, termasuk menentukan response yang bisa di-cache berdasarkan status code dan header.
   - `npm install --save idb`: Menginstal library IndexedDB wrapper berbasis Promise, untuk memudahkan penyimpanan data lokal (seperti caching cerita atau token) secara offline.
   - `npm run build`: Membuat build production menggunakan Webpack.
   - `npm run start-dev`: Menjalankan server development menggunakan Webpack Dev Server.
   - `npm run serve`: Menjalankan server HTTP untuk build yang sudah dibuat.

---

## 📡 API Integration

The app integrates with the [Dicoding Story API](https://story-api.dicoding.dev/v1) for features like user registration, login, posting stories, and fetching story details.

### Submission 1: Building the Our Story App

#### 🎯 Key Features Submission 1

##### Main Features Submission 1

- ✅ **Menggunakan Story API sebagai Sumber Data**:
  - Aplikasi sepenuhnya menggunakan Dicoding Story API untuk mengambil, menambahkan, dan menampilkan data cerita.
  - Tidak ada integrasi API lain, sehingga fokus pengembangan tetap konsisten.
- ✅ **Menerapkan Arsitektur Single-Page Application (SPA)**:
  - Routing berbasis hash (`/#/`) untuk mengelola navigasi antar halaman tanpa reload.
  - Struktur kode mengikuti pola Model-View-Presenter (MVP) agar lebih modular dan maintainable.
- ✅ **Menampilkan Data Cerita dari API**:
  - Halaman utama menampilkan daftar cerita dengan:
    - Gambar (`photoUrl`)
    - Nama pengguna (`name`)
    - Deskripsi (`description`)
    - Tanggal pembuatan (`createdAt`)
  - Dilengkapi peta digital menggunakan Leaflet.js untuk menampilkan lokasi cerita:
    - Menampilkan marker pada lokasi lat/lon
    - Menampilkan popup deskripsi saat marker diklik
  - API key peta dapat ditambahkan di `STUDENT.txt` jika dibutuhkan.
- ✅ **Fitur Tambah Cerita Baru**:
  - Form input untuk membuat cerita baru dengan:
    - Upload foto melalui kamera atau file
    - Input deskripsi
    - Ambil lokasi dari peta menggunakan event klik
  - Stream kamera otomatis dimatikan setelah proses pengambilan gambar selesai.
- ✅ **Aksesibilitas sesuai WCAG**:
  - Fitur "Skip to Content" disediakan.
  - Gambar memiliki atribut `alt` yang sesuai.
  - Setiap elemen form memiliki label yang jelas.
  - Struktur HTML menggunakan elemen semantik seperti `<main>`, `<header>`, `<nav>`, dan `<footer>`.
- ✅ **Transisi Halaman yang Halus**:
  - Menggunakan View Transition API untuk efek transisi antar halaman agar lebih smooth dan modern.
- ✅ **Page Transition with View Transition API**
- ✅ **Push Notification setelah berhasil membuat story**
- ✅ **Web Accessibility Standards (WCAG)**:
  - Skip to content
  - Image alt text
  - Forms with labels
  - Semantic HTML structure

##### ⭐ Optional Features Submission 1

- ✅ **Tampilan Menarik (Clean UI Design)**:

  - Menggunakan kombinasi warna yang selaras dan tidak mencolok (inspirasi dari ColorHunt).
  - Pemilihan font yang mudah dibaca.
  - Tata letak yang rapi dan konsisten di setiap halaman.
  - Menggunakan margin dan padding yang proporsional.
  - Dilengkapi ikon dari Font Awesome dan Feather Icons untuk mendukung teks dan tombol.

- ✅ **Mobile Friendly (Responsive Design)**:

  - Aplikasi sepenuhnya responsif dan mudah digunakan di berbagai ukuran layar, termasuk smartphone dan tablet.
  - Menggunakan media query dan layout fleksibel agar tampilan tetap optimal di perangkat kecil.

- ✅ **Kustomisasi Transisi Halaman**:

  - Menggunakan View Transition API untuk memberikan efek transisi yang halus antar halaman.
  - Transisi difokuskan pada perubahan antar view, bukan hanya sekadar routing instan.

- ✅ **Beragam Gaya Peta dalam Layer Control**:
  - Menggunakan Leaflet.js dengan layer control untuk memungkinkan pengguna mengganti tampilan peta.
  - Tersedia lebih dari satu tile layer (misal: default OpenStreetMap dan MapTiler).
  - Dilengkapi kontrol layer agar pengguna dapat memilih sendiri tampilan peta yang mereka inginkan.

#### 📡 API Integration Documentation

**Base URL: [https://story-api.dicoding.dev/v1](https://story-api.dicoding.dev/v1)**

#### 🔐 Authentication

- **Register**
  - `POST /register`
  - Body: `name`, `email`, `password`
- **Login**
  - `POST /login`
  - Body: `email`, `password`
  - Response: `token` digunakan untuk autentikasi seluruh endpoint lainnya.

#### 📖 Story

- **Get All Stories:**
  - `GET /stories`
  - Headers: `Authorization: Bearer <token>`
  - Optional: `location=1` untuk menampilkan cerita dengan koordinat.
- **Get Story Detail**:
  - `GET /stories/:id`
  - Headers: `Authorization: Bearer <token>`
- **Add New Story**:
  - `POST /stories`
  - Headers: `Authorization`, `Content-Type: multipart/form-data`
  - Body: `photo`, `description`, optional `lat` & `lon`
- **Add New Story (Guest Mode)**:
  - `POST /stories/guest`
  - Tanpa autentikasi (token)

#### 🔔 Push Notification

- **Subscribe Web Push**:
  - POST /notifications/subscribe
  - Body: endpoint, keys.p256dh, keys.auth
- **Unsubscribe Web Push**:
  - DELETE /notifications/subscribe
  - Body: endpoint

📚 [Full documentation of Dicoding Story API](https://story-api.dicoding.dev/v1)

#### 📷 Screenshots Submission 1

![Login Page Screenshot](/documentation/loginpage.png)
![Home Page Screenshot](/documentation/homepage-pc.png)
![Story Detail Screenshot](/documentation/detailpage.png)
![Add Story Screenshot](/documentation/addpage.png)

#### 🛠️ Technology & Tools Submission 1

- HTML5 + CSS3 + JavaScript (Vanilla)
- SPA Router (Hash based)
- Model-View-Presenter (MVP) Architecture
- Leaflet.js (OpenStreetMap)
- View Transition API
- Web Content Accessibility Guidelines (WCAG)

---

### Submission 2: Deploy the Our Story App

#### 🎯 Key Features Submission 2

##### Main Features Submission 2

- ✅ **Mempertahankan seluruh fitur pada Submission 1**:
  - Memanfaatkan satu API sebagai sumber data (Dicoding Story API).
  - Menggunakan arsitektur Single Page Application (SPA).
  - Menampilkan data dari API.
  - Memiliki fitur tambah cerita baru (unggah foto, deskripsi, lokasi).
  - Menerapkan aksesibilitas sesuai standar (WCAG).
  - Merancang transisi halaman yang halus dengan View Transition API.
- ✅ **Push Notification (Web Push)**:
  - Menggunakan Web Notification API dan VAPID Key.
  - Notifikasi dikirim saat pengguna berhasil menambahkan cerita baru.
- ✅ **Progressive Web App (PWA)**:
  - Menggunakan arsitektur Application Shell.
  - Aplikasi dapat diinstal ke Homescreen.
  - Aplikasi dapat digunakan dalam kondisi offline tanpa kehilangan tampilan UI.
- ✅ **Offline Data Storage dengan IndexedDB**:
  - Menyimpan data cerita ke IndexedDB secara lokal.
  - Menampilkan data yang disimpan di halaman bookmark.
  - Mendukung fitur hapus data lokal.
- ✅ **Deploy Secara Publik**:
  - Aplikasi telah di-deploy dan dapat diakses secara online menggunakan layanan hosting (`GitHub Pages` / `Netlify` / `Firebase Hosting`).
  - URL hasil deploy tercantum pada file `STUDENT.txt.`

##### ⭐ Optional Features Submission 2

- ✅ **Shortcut & Screenshot dalam Web Manifest**:
  - Shortcut ke halaman "Tambah Cerita".
  - Screenshot untuk tampilan desktop dan mobile.
- ✅ **Menggunakan Workbox untuk Offline Capability**:
  Library Workbox digunakan untuk menyusun strategi caching secara optimal agar aplikasi tetap berjalan walau dalam kondisi offline.
- ✅ **Halaman Not Found**:
  Pengguna yang mengakses URL yang tidak dikenali akan diarahkan ke halaman 404 - Not Found dengan tampilan yang informatif dan konsisten secara desain.

#### 📷 Screenshots Submission 2

![Responsive display on mobile devices Screenshot](/documentation/homepage-mobile.png)
![Widescreen display for desktop Screenshot](/documentation/homepage-pc.png)
![Push Notification (Web Push)](/documentation/pushnotification.png)
![Progressive Web App (PWA)](/documentation/pwa.png)
![Offline Mode Screenshot](/documentation/offline.png)
![Bookmark Page & Offline Data Storage dengan IndexedDB Screenshot](/documentation/detailpage.png)
![Not Found Page Screenshot](/documentation/notfound.png)

#### 🛠️ Technology & Tools Submission 2

- HTML5 + CSS3 + JavaScript (Vanilla)
- SPA Router (Hash based)
- Model-View-Presenter (MVP) Architecture
- Leaflet.js (OpenStreetMap)
- View Transition API
- Web Content Accessibility Guidelines (WCAG)
- Web Push Notification
- Progressive Web App (PWA): Manifest, Application Shell, Offline-ready
- IndexedDB (via `idb`): Penyimpanan data lokal
- Workbox:
  - workbox-webpack-plugin
  - Routing, precaching, caching strategy
- Custom 404 Page
- VAPID Key: BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk
- Notification Schema:

  ```json
  {
    "title": "Story berhasil dibuat",
    "options": {
      "body": "Anda telah membuat story baru dengan deskripsi: <story description>"
    }
  }
  ```

- Deployment Platform: GitHub Pages / Netlify / Firebase Hosting

## LICENSE

Copyright &copy; 2025 Ryan Gading Abdullah. All rights reserved.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) for details.
