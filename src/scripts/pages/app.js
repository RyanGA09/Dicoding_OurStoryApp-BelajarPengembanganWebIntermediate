// import { getActiveRoute } from "../routes/url-parser";
// import { routes } from "../routes/routes";

// export default class App {
//   #content;
//   #drawerButton;
//   #navigationDrawer;

//   constructor({ navigationDrawer, drawerButton, content }) {
//     this.#content = content;
//     this.#drawerButton = drawerButton;
//     this.#navigationDrawer = navigationDrawer;

//     this.#setupDrawer();
//   }

//   #setupDrawer() {
//     this.#drawerButton.addEventListener("click", () => {
//       this.#navigationDrawer.classList.toggle("open");
//     });

//     document.body.addEventListener("click", (event) => {
//       if (
//         !this.#navigationDrawer.contains(event.target) &&
//         !this.#drawerButton.contains(event.target)
//       ) {
//         this.#navigationDrawer.classList.remove("open");
//       }
//     });
//   }

//   async renderPage() {
//     const url = getActiveRoute();
//     const page = routes[url];

//     if (!document.startViewTransition) {
//       this.#content.innerHTML = await page.render();
//       await page.afterRender();
//       return;
//     }

//     document.startViewTransition(async () => {
//       this.#content.innerHTML = await page.render();
//       await page.afterRender();
//     });
//   }
// }

import { getActiveRoute } from "../routes/url-parser";
import {
  generateAuthenticatedNavigationListTemplate,
  generateMainNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
} from "../templates";
import { setupSkipToContent, transitionHelper } from "../utils";
import { getAccessToken, getLogout } from "../utils/auth";
import { routes } from "../routes/routes";
import {
  generateAuthenticatedNavigationListTemplate,
  generateMainNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
} from "../templates";
import { setupSkipToContent, transitionHelper } from "../utils";
import { getAccessToken, getLogout } from "../utils/auth";

export default class App {
  #content;
  #drawerButton;
<<<<<<< HEAD
  #navigationDrawer;
  #skipLinkButton;

  constructor({ navigationDrawer, drawerButton, content, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
=======
  #drawerNavigation;
  #skipLinkButton;

  constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#drawerNavigation = drawerNavigation;
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#drawerNavigation.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(
        event.target
      );
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove("open");
      }

      this.#drawerNavigation.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove("open");
        }
      });
    });
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navListMain =
      this.#drawerNavigation.children.namedItem("navlist-main");
    const navList = this.#drawerNavigation.children.namedItem("navlist");

    // User not log in
    if (!isLogin) {
      navListMain.innerHTML = "";
      navList.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    }

    navListMain.innerHTML = generateMainNavigationListTemplate();
    navList.innerHTML = generateAuthenticatedNavigationListTemplate();

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (confirm("Apakah Anda yakin ingin keluar?")) {
        getLogout();

        // Redirect
        location.hash = "/login";
      }
    });
  }

<<<<<<< HEAD
  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navListMain =
      this.#navigationDrawer.children.namedItem("navlist-main");
    const navList = this.#navigationDrawer.children.namedItem("navlist");

    // User not log in
    if (!isLogin) {
      navListMain.innerHTML = "";
      navList.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    }

    navListMain.innerHTML = generateMainNavigationListTemplate();
    navList.innerHTML = generateAuthenticatedNavigationListTemplate();

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (confirm("Apakah Anda yakin ingin keluar?")) {
        getLogout();

        // Redirect
        location.hash = "/login";
      }
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    // Get page instance
    const page = route();

=======
  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    // Get page instance
    const page = route();

>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: "instant" });
      this.#setupNavigationList();
    });
  }
}
