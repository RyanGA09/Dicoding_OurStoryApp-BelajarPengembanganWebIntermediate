import HomePage from "../pages/home/home-page";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import AboutPage from "../pages/about/about-page";
import AddStoryPage from "../pages/add/add-page";
import DetailStoryPage from "../pages/details/detail-page";

const routes = {
  "/": new HomePage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/about": new AboutPage(),
  "/add": new AddStoryPage(),
  "/detail/:id": new DetailStoryPage(),
};

export { routes };
