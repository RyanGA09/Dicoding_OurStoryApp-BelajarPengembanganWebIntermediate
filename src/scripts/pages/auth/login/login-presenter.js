import { loginUser, subscribeToStory } from "../../../data/api";

export default class LoginPresenter {
  #view;

  constructor(view) {
    this.#view = view;
  }

  async init() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const result = await loginUser(email, password);

      if (!result.error) {
        localStorage.setItem("token", result.loginResult.token);
        await this.#setupPushNotification();
        window.location.hash = "#/";
      } else {
        alert("Login gagal: " + result.message);
      }
    });
  }

  async #setupPushNotification() {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.#urlBase64ToUint8Array(
          "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk"
        ),
      });

      const subscriptionJson = subscription.toJSON();
      delete subscriptionJson.expirationTime;
      await subscribeToStory(subscriptionJson);
    }
  }

  #urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
