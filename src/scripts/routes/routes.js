<<<<<<< HEAD
// src/scripts/routes/routes.js
import RegisterPage from "../pages/auth/register/register-page";
import LoginPage from "../pages/auth/login/login-page";
import HomePage from "../pages/home/home-page";
import BookmarkPage from "../pages/bookmark/bookmark-page";
import StoryDetailPage from "../pages/story-detail/story-detail-page";
import NewPage from "../pages/new/new-page";
import AboutPage from "../pages/about/about-page";
=======
// import HomePage from "../pages/home/home-page";
// import LoginPage from "../pages/auth/login/login-page";
// import RegisterPage from "../pages/auth/register/register-page";
// import AboutPage from "../pages/about/about-page";
// import AddStoryPage from "../pages/add/add-page";
// import DetailStoryPage from "../pages/details/detail-page";

// const routes = {
//   "/": new HomePage(),
//   "/login": new LoginPage(),
//   "/register": new RegisterPage(),
//   "/about": new AboutPage(),
//   "/add": new AddStoryPage(),
//   "/detail/:id": new DetailStoryPage(),
// };

// export { routes };

import RegisterPage from "../pages/auth/register/register-page";
import LoginPage from "../pages/auth/login/login-page";
import HomePage from "../pages/home/home-page";
// import BookmarkPage from "../pages/bookmark/bookmark-page";
import StoryDetailPage from "../pages/story-detail/story-detail-page";
import NewPage from "../pages/add/add-page";
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
import {
  checkAuthenticatedRoute,
  checkUnauthenticatedRouteOnly,
} from "../utils/auth";

export const routes = {
  "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),

  "/": () => checkAuthenticatedRoute(new HomePage()),
  "/new": () => checkAuthenticatedRoute(new NewPage()),
<<<<<<< HEAD
  "/about": () => checkAuthenticatedRoute(new AboutPage()),
  "/stories/:id": () => checkAuthenticatedRoute(new StoryDetailPage()),
=======
  "/storys/:id": () => checkAuthenticatedRoute(new StoryDetailPage()),
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
  "/bookmark": () => checkAuthenticatedRoute(new BookmarkPage()),
};
