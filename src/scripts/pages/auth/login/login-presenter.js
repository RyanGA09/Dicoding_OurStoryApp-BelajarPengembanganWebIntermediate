export default class LoginPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async loginUser({ email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.loginUser({ email, password });

      if (!response.ok) {
        console.error("loginUser: response:", response);
        this.#view.loginFailed(response.message);
        return;
      }

      this.#authModel.putAccessToken(response.loginResult.token);

      this.#view.loginSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("loginUser: error:", error);
      this.#view.loginFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
