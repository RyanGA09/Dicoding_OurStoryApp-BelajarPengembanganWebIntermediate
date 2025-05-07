export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async registerUser({ name, email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.registerUser({
        name,
        email,
        password,
      });

      if (!response.ok) {
        console.error("registerUser: response:", response);
        this.#view.registeredFailed(response.message);
        return;
      }

      this.#view.registeredSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("registerUser: error:", error);
      this.#view.registeredFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
