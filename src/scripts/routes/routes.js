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
import {
  checkAuthenticatedRoute,
  checkUnauthenticatedRouteOnly,
} from "../utils/auth";

export const routes = {
  "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),

  "/": () => checkAuthenticatedRoute(new HomePage()),
  "/new": () => checkAuthenticatedRoute(new NewPage()),
  "/storys/:id": () => checkAuthenticatedRoute(new StoryDetailPage()),
  "/bookmark": () => checkAuthenticatedRoute(new BookmarkPage()),
};
