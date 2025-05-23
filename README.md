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
│   │   └── 📄 logo.png
│   ├── 📄 app.webmanifest
│   ├── 📄 favicon.png
│   └── 📄 sw.js
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

6. **Run in Browser**

   ```bash
   npm run dev
   ```

---

## 📡 API Integration

The app integrates with the [Dicoding Story API](https://story-api.dicoding.dev/v1) for features like user registration, login, posting stories, and fetching story details.

### Submission 1: Building the Our Story App

#### 🎯 Key Features

- ✅ **User Registration**
- ✅ **Login & Token Authentication**
- ✅ **Display a list of stories from the API (with image, name, description, time)**
- ✅ **Display Story Details**
- ✅ **Add New Story (Upload Photo, Description, Location)**
- ✅ **Display Story Location on Map (OpenStreetMap/Leaflet.js)**
- ✅ **Page Transition with View Transition API**
- ✅ **Push Notification setelah berhasil membuat story**
- ✅ **Web Accessibility Standards (WCAG)**:
  - ✅ Skip to content
  - ✅ Image alt text
  - ✅ Forms with labels
  - ✅ Semantic HTML structure

#### API Documentation

**Base URL: [https://story-api.dicoding.dev/v1](https://story-api.dicoding.dev/v1)**

#### 🔐 Authentication

- **Register:** `POST /register`
- **Login:** `POST /login`

#### 📖 Story

- **Get All Stories:** `GET /stories`
- **Get Story Detail:** `GET /stories/:id`
- **Add Story:** `POST /stories` _(auth token required)_
- **Add Story:** `POST /stories/guest`

#### 🔔 Notification

- **Subscribe Web Push:** `POST /notifications/subscribe`
- **Unsubscribe Web Push:** `DELETE /notifications/subscribe`

📚 [Full documentation of Dicoding Story API](https://story-api.dicoding.dev/v1)

#### 📷 Screenshots

![Login Page Screenshot](/public/images/loginpage.png)
![Home Page Screenshot](/public/images/homepage.png)
![Story Detail Screenshot](/public/images/detailpage.png)
![Add Story Screenshot](/public/images/addpage.png)

#### 🛠️ Technology & Tools

- HTML5 + CSS3 + JavaScript (Vanilla)
- SPA Router (Hash based)
- Model-View-Presenter (MVP) Architecture
- Leaflet.js (OpenStreetMap)
- View Transition API
- Web Push Notification
- Web Content Accessibility Guidelines (WCAG)
- VAPID Key: BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk

---

### Submission 2: Deploy the Our Story App

#### Key Features in Submission 2 (Coming Soon)

## LICENSE

[MIT LICENSE](LICENSE)
