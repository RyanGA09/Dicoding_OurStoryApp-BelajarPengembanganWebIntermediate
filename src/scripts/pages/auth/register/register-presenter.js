<<<<<<< HEAD
=======
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

>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

<<<<<<< HEAD
  async registerUser({ name, email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.registerUser({
=======
  async getRegistered({ name, email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.getRegistered({
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
        name,
        email,
        password,
      });

      if (!response.ok) {
<<<<<<< HEAD
        console.error("registerUser: response:", response);
=======
        console.error("getRegistered: response:", response);
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
        this.#view.registeredFailed(response.message);
        return;
      }

      this.#view.registeredSuccessfully(response.message, response.data);
    } catch (error) {
<<<<<<< HEAD
      console.error("registerUser: error:", error);
=======
      console.error("getRegistered: error:", error);
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      this.#view.registeredFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
