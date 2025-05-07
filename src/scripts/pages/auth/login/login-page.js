<<<<<<< HEAD
import LoginPresenter from "./login-presenter";
import * as OurStoryAPI from "../../../data/api";
import * as AuthModel from "../../../utils/auth";
=======
// import LoginPresenter from "./login-presenter.js";

// export default class LoginPage {
//   #presenter;

//   async render() {
//     return `
//       <section class="container">
//         <h1>Login</h1>
//         <form id="login-form">
//           <input type="email" id="email" placeholder="Email" required />
//           <input type="password" id="password" placeholder="Password" required />
//           <button type="submit">Login</button>
//           <p>Belum punya akun? <a href="#/register">Register</a></p>
//         </form>
//       </section>
//     `;
//   }

//   async afterRender() {
//     this.#presenter = new LoginPresenter(this);
//     await this.#presenter.init();
//   }
// }

import LoginPresenter from "./login-presenter";
// import * as OurStoryAPI from "../../data/api";
import * as OurStoryAPI from "@/scripts/data/api";
import * as AuthModel from "@/scripts/utils/auth";
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <section class="login-container">
        <article class="login-form-container">
          <h1 class="login__title">Masuk akun</h1>

          <form id="login-form" class="login-form">
            <div class="form-control">
              <label for="email-input" class="login-form__email-title">Email</label>

              <div class="login-form__title-container">
                <input id="email-input" type="email" name="email" placeholder="Contoh: nama@email.com">
              </div>
            </div>
            <div class="form-control">
              <label for="password-input" class="login-form__password-title">Password</label>

              <div class="login-form__title-container">
                <input id="password-input" type="password" name="password" placeholder="Masukkan password Anda">
              </div>
            </div>
            <div class="form-buttons login-form__form-buttons">
              <div id="submit-button-container">
                <button class="btn" type="submit">Masuk</button>
              </div>
              <p class="login-form__do-not-have-account">Belum punya akun? <a href="#/register">Daftar</a></p>
            </div>
          </form>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: OurStoryAPI,
      authModel: AuthModel,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
          email: document.getElementById("email-input").value,
          password: document.getElementById("password-input").value,
        };
<<<<<<< HEAD
        await this.#presenter.loginUser(data);
=======
        await this.#presenter.getLogin(data);
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      });
  }

  loginSuccessfully(message) {
    console.log(message);

    // Redirect
    location.hash = "/";
  }

  loginFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Masuk
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit">Masuk</button>
    `;
  }
}
