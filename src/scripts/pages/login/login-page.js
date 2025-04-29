import LoginPresenter from "./login-presenter.js";

export default class LoginPage {
  #presenter;

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
    this.#presenter = new LoginPresenter(this);
    await this.#presenter.init();
  }
}
