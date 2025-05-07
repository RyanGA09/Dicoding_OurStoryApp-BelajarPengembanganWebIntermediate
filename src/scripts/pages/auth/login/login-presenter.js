<<<<<<< HEAD
=======
// import { loginUser, subscribeNotification } from "../../data/api";

// export default class LoginPresenter {
//   #view;

//   constructor(view) {
//     this.#view = view;
//   }

//   async init() {
//     const form = document.getElementById("login-form");
//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const email = document.getElementById("email").value;
//       const password = document.getElementById("password").value;

//       const result = await loginUser(email, password);

//       if (!result.error) {
//         localStorage.setItem("token", result.loginResult.token);
//         await this.#setupPushNotification();
//         window.location.hash = "#/";
//       } else {
//         alert("Login gagal: " + result.message);
//       }
//     });
//   }

//   async #setupPushNotification() {
//     if ("serviceWorker" in navigator) {
//       const registration = await navigator.serviceWorker.ready;
//       const subscription = await registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: this.#urlBase64ToUint8Array(
//           "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"
//         ),
//       });

//       const subscriptionJson = subscription.toJSON();
//       delete subscriptionJson.expirationTime;
//       await subscribeNotification(subscriptionJson);
//     }
//   }

//   #urlBase64ToUint8Array(base64String) {
//     const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding)
//       .replace(/-/g, "+")
//       .replace(/_/g, "/");
//     const rawData = atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }
// }

>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
export default class LoginPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

<<<<<<< HEAD
  async loginUser({ email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.loginUser({ email, password });

      if (!response.ok) {
        console.error("loginUser: response:", response);
=======
  async getLogin({ email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.getLogin({ email, password });

      if (!response.ok) {
        console.error("getLogin: response:", response);
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
        this.#view.loginFailed(response.message);
        return;
      }

<<<<<<< HEAD
      this.#authModel.putAccessToken(response.loginResult.token);

      this.#view.loginSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("loginUser: error:", error);
=======
      this.#authModel.putAccessToken(response.data.accessToken);

      this.#view.loginSuccessfully(response.message, response.data);
    } catch (error) {
      console.error("getLogin: error:", error);
>>>>>>> 1f994dba64a00c9cc8c8a81a9f0a74b0f4447aac
      this.#view.loginFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
