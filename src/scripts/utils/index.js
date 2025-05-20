export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function showFormattedDate(date, locale = "en-US", options = {}) {
  try {
    return new Date(date).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...options,
    });
  } catch (error) {
    console.error("Invalid date provided:", error);
    return "";
  }
}

export async function createCarousel(containerElement, options = {}) {
  try {
    const { tns } = await import("tiny-slider");
    return tns({
      container: containerElement,
      mouseDrag: true,
      swipeAngle: false,
      speed: 600,
      nav: true,
      navPosition: "bottom",
      autoplay: false,
      controls: false,
      ...options,
    });
  } catch (error) {
    console.error("Failed to create carousel:", error);
    return null;
  }
}

export function convertBlobToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export function convertBase64ToBlob(
  base64Data,
  contentType = "",
  sliceSize = 512
) {
  try {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  } catch (error) {
    console.error("Failed to convert base64 to blob:", error);
    return null;
  }
}

export function convertBase64ToUint8Array(base64String) {
  try {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  } catch (error) {
    console.error("Failed to convert base64 to Uint8Array:", error);
    return new Uint8Array(0);
  }
}

export function setupSkipToContent(element, mainContent) {
  if (!element || !mainContent) return;
  element.addEventListener("click", () => mainContent.focus());
}

export function transitionHelper({ skipTransition = false, updateDOM }) {
  if (typeof updateDOM !== "function") {
    console.warn("updateDOM must be a function");
    return {
      ready: Promise.reject(new Error("Invalid updateDOM function")),
      updateCallbackDone: Promise.resolve(),
      finished: Promise.resolve(),
    };
  }

  if (skipTransition || !document.startViewTransition) {
    const updateCallbackDone = Promise.resolve(updateDOM()).then(
      () => undefined
    );
    return {
      ready: Promise.reject(new Error("View transitions unsupported")),
      updateCallbackDone,
      finished: updateCallbackDone,
    };
  }

  return document.startViewTransition(updateDOM);
}

export function isServiceWorkerAvailable() {
  return typeof navigator !== "undefined" && "serviceWorker" in navigator;
}

// export async function registerServiceWorker() {
//   if (!isServiceWorkerAvailable()) {
//     console.log("Service Worker API unsupported");
//     return;
//   }

//   try {
//     const registration = await navigator.serviceWorker.register(
//       "/sw.bundle.js"
//     );
//     console.log("Service worker telah terpasang", registration);
//   } catch (error) {
//     console.error("Failed to install service worker:", error);
//   }
// }

export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered successfully", registration);

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        console.log(
          "A new service worker is being installed:",
          installingWorker
        );
      };
    } catch (error) {
      console.error("Failed to register service worker", error);
    }
  } else {
    console.warn("Service worker is not supported in this browser.");
  }
}
