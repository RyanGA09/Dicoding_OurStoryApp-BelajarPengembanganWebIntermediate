// import { registerUser } from "../../data/api";

// export default class RegisterPresenter {
//   #view;

//   constructor(view) {
//     this.#view = view;
//   }

//   async init() {
//     const form = document.getElementById("register-form");
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const name = document.getElementById("name").value;
//       const email = document.getElementById("email").value;
//       const password = document.getElementById("password").value;

//       const result = await registerUser(name, email, password);

//       if (!result.error) {
//         alert("Register berhasil! Silakan login.");
//         window.location.hash = "#/login";
//       } else {
//         alert("Register gagal: " + result.message);
//       }
//     });
//   }
// }

export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getRegistered({ name, email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.getRegistered({
        name,
        email,
        password,
      });

      if (!response.ok) {
        console.error("getRegistered: response:", response);
        this.#view.registeredFailed(response.message);
        return;
      }

      this.#view.registeredSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("getRegistered: error:", error);
      this.#view.registeredFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
