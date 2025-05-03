import { registerUser } from "../../../data/api";

export default class RegisterPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async init() {
    const form = document.getElementById("register-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const result = await registerUser(name, email, password);

      if (!result.error) {
        alert("Register berhasil! Silakan login.");
        window.location.hash = "#/login";
      } else {
        alert("Register gagal: " + result.message);
      }
    });
  }
}
