import RegisterPresenter from "./register-presenter.js";

export default class RegisterPage {
  #presenter;

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
    this.#presenter = new RegisterPresenter(this);
    await this.#presenter.init();
  }
}
