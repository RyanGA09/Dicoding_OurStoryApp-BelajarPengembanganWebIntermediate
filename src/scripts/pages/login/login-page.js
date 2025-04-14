import { loginUser } from "../../data/api";

export default class LoginPage {
  async render() {
    return `
      <section class="container">
        <h1>Login</h1>
        <form id="login-form">
          <input type="email" id="email" placeholder="Email" required />
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit">Login</button>
          <p>Belum punya akun? <a href="#/register">Register</a></p>
        </form>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const result = await loginUser(email, password);

      if (!result.error) {
        localStorage.setItem("token", result.loginResult.token);
        window.location.hash = "#/";
      } else {
        alert("Login gagal: " + result.message);
      }
    });
  }
}
