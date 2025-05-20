// src/scripts/routes/routes.js
import RegisterPage from "../pages/auth/register/register-page";
import LoginPage from "../pages/auth/login/login-page";
import HomePage from "../pages/home/home-page";
import BookmarkPage from "../pages/bookmark/bookmark-page";
import StoryDetailPage from "../pages/story-detail/story-detail-page";
import NewPage from "../pages/new/new-page";
import AboutPage from "../pages/about/about-page";
import NotFoundPage from "../pages/not-found/not-found-page";
import {
  checkAuthenticatedRoute,
  checkUnauthenticatedRouteOnly,
} from "../utils/auth";

export const routes = {
  "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),

  "/": () => checkAuthenticatedRoute(new HomePage()),
  "/new": () => checkAuthenticatedRoute(new NewPage()),
  "/about": () => checkAuthenticatedRoute(new AboutPage()),
  "/stories/:id": () => checkAuthenticatedRoute(new StoryDetailPage()),
  "/bookmark": () => checkAuthenticatedRoute(new BookmarkPage()),
};

// Route fallback untuk path yang tidak ditemukan
export const notFoundRoute = () => checkAuthenticatedRoute(new NotFoundPage());
