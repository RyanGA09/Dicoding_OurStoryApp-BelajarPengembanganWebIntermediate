import { registerUser } from "../../data/api";

export default class RegisterPage {
  async render() {
    return `
      <section class="container">
        <h1>Register</h1>
        <form id="register-form">
          <input type="text" id="name" placeholder="Nama" required />
          <input type="email" id="email" placeholder="Email" required />
          <input type="password" id="password" placeholder="Password (min 8 karakter)" required />
          <button type="submit">Register</button>
          <p>Sudah punya akun? <a href="#/login">Login</a></p>
        </form>
      </section>
    `;
  }

  async afterRender() {
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
