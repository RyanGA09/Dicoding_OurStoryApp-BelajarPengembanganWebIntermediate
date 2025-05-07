// import CONFIG from "../config";

// const ENDPOINTS = {
//   STORIES: `${CONFIG.BASE_URL}/stories`,
//   NOTIFICATIONS: `${CONFIG.BASE_URL}/notifications/subscribe`,
// };

// // GET semua story
// export async function getAllStories() {
//   try {
//     const response = await fetch(ENDPOINTS.STORIES, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch stories");
//     }

//     const responseJson = await response.json();
//     console.log("API Response:", responseJson); // Log respons API

//     return responseJson.listStory;
//   } catch (error) {
//     console.error("Error fetching stories:", error);
//   }
// }

// // GET story by ID
// export async function getStoryById(id) {
//   const response = await fetch(`${ENDPOINTS.STORIES}/${id}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });
//   const responseJson = await response.json();
//   return responseJson.story;
// }

// // POST story baru
// export const postStory = async (photo, description) => {
//   const token = localStorage.getItem("token");
//   const formData = new FormData();
//   formData.append("photo", photo);
//   formData.append("description", description);

//   const response = await fetch("https://story-api.dicoding.dev/v1/stories", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error("Failed to submit story");
//   }

//   return response.json(); // Mengembalikan hasil response JSON
// };

// // Register user
// export async function registerUser(name, email, password) {
//   const response = await fetch(`${CONFIG.BASE_URL}/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password }),
//   });
//   return response.json();
// }

// // Login user
// export async function loginUser(email, password) {
//   const response = await fetch(`${CONFIG.BASE_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return response.json();
// }

// // Convert VAPID public key ke Uint8Array
// export function urlBase64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, "+")
//     .replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// // Subscribe Push Notification
// export async function subscribeNotification(subscription) {
//   if (!subscription || !subscription.endpoint || !subscription.keys) {
//     throw new Error("Subscription data tidak valid.");
//   }

//   const response = await fetch(ENDPOINTS.NOTIFICATIONS, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(subscription),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Gagal subscribe notification: ${errorText}`);
//   }

//   return response.json();
// }

// // Unsubscribe Push Notification
// export async function unsubscribeNotification(endpoint) {
//   const response = await fetch(ENDPOINTS.NOTIFICATIONS, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ endpoint }),
//   });
//   return response.json();
// }

// import { getAccessToken } from "../utils/auth";
// import { BASE_URL } from "../config";

// const ENDPOINTS = {
//   // Auth
//   REGISTER: `${BASE_URL}/register`,
//   LOGIN: `${BASE_URL}/login`,
//   MY_USER_INFO: `${BASE_URL}/users/me`,

//   // story
//   STORY_LIST: `${BASE_URL}/storys`,
//   STORY_DETAIL: (id) => `${BASE_URL}/storys/${id}`,
//   STORE_NEW_STORY: `${BASE_URL}/storys`,

//   // story Comment
//   STORY_COMMENTS_LIST: (storyId) => `${BASE_URL}/storys/${storyId}/comments`,
//   STORE_NEW_STORY_COMMENT: (storyId) =>
//     `${BASE_URL}/storys/${storyId}/comments`,

//   // story Comment
//   SUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
//   UNSUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
//   SEND_STORY_TO_ME: (storyId) => `${BASE_URL}/storys/${storyId}/notify-me`,
//   SEND_STORY_TO_USER: (storyId) => `${BASE_URL}/storys/${storyId}/notify`,
//   SEND_STORY_TO_ALL_USER: (storyId) =>
//     `${BASE_URL}/storys/${storyId}/notify-all`,
//   SEND_COMMENT_TO_story_OWNER: (storyId, commentId) =>
//     `${BASE_URL}/storys/${storyId}/comments/${commentId}/notify`,
// };

// export async function getRegistered({ name, email, password }) {
//   const data = JSON.stringify({ name, email, password });

//   const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: data,
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function getLogin({ email, password }) {
//   const data = JSON.stringify({ email, password });

//   const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: data,
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function getMyUserInfo() {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(ENDPOINTS.MY_USER_INFO, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function getAllStorys() {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(ENDPOINTS.STORY_LIST, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function getStoryById(id) {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(ENDPOINTS.STORY_DETAIL(id), {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function storeNewStory({
//   title,
//   damageLevel,
//   description,
//   evidenceImages,
//   latitude,
//   longitude,
// }) {
//   const accessToken = getAccessToken();

//   const formData = new FormData();
//   formData.set("title", title);
//   formData.set("damageLevel", damageLevel);
//   formData.set("description", description);
//   formData.set("latitude", latitude);
//   formData.set("longitude", longitude);
//   evidenceImages.forEach((evidenceImage) => {
//     formData.append("evidenceImages", evidenceImage);
//   });

//   const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_STORY, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${accessToken}` },
//     body: formData,
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function getAllCommentsByStoryId(storyId) {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(ENDPOINTS.STORY_COMMENTS_LIST(storyId), {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function storeNewCommentByStoryId(storyId, { body }) {
//   const accessToken = getAccessToken();
//   const data = JSON.stringify({ body });

//   const fetchResponse = await fetch(
//     ENDPOINTS.STORE_NEW_STORY_COMMENT(storyId),
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: data,
//     }
//   );
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function subscribePushNotification({
//   endpoint,
//   keys: { p256dh, auth },
// }) {
//   const accessToken = getAccessToken();
//   const data = JSON.stringify({
//     endpoint,
//     keys: { p256dh, auth },
//   });

//   const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: data,
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function unsubscribePushNotification({ endpoint }) {
//   const accessToken = getAccessToken();
//   const data = JSON.stringify({
//     endpoint,
//   });

//   const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: data,
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function sendstoryToMeViaNotification(storyId) {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(ENDPOINTS.SEND_story_TO_ME(storyId), {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function sendstoryToUserViaNotification(storyId, { userId }) {
//   const accessToken = getAccessToken();
//   const data = JSON.stringify({
//     userId,
//   });

//   const fetchResponse = await fetch(ENDPOINTS.SEND_story_TO_USER(storyId), {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: data,
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function sendstoryToAllUserViaNotification(storyId) {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(ENDPOINTS.SEND_story_TO_ALL_USER(storyId), {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

// export async function sendCommentTostoryOwnerViaNotification(
//   storyId,
//   commentId
// ) {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(
//     ENDPOINTS.SEND_COMMENT_TO_story_OWNER(storyId, commentId),
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   const json = await fetchResponse.json();

//   return {
//     ...json,
//     ok: fetchResponse.ok,
//   };
// }

//

import CONFIG from "../config";

// ENDPOINTS API
const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
  NOTIFICATIONS: `${CONFIG.BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${CONFIG.BASE_URL}/notifications/unsubscribe`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  MY_USER_INFO: `${CONFIG.BASE_URL}/users/me`,
};

// GET semua story
export async function getAllStories() {
  try {
    const response = await fetch(ENDPOINTS.STORIES, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stories");
    }

    const responseJson = await response.json();
    return responseJson.listStory;
  } catch (error) {
    console.error("Error fetching stories:", error);
  }
}

// GET story by ID
export async function getStoryById(id) {
  const response = await fetch(`${ENDPOINTS.STORIES}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const responseJson = await response.json();
  return responseJson.story;
}

// POST story baru dengan photo, description, lat, lon
export async function postStory(photo, description, latitude, longitude) {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  formData.append("photo", photo);
  formData.append("description", description);
  if (latitude && longitude) {
    formData.append("lat", latitude);
    formData.append("lon", longitude);
  }

  const response = await fetch(ENDPOINTS.STORIES, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit story");
  }

  return response.json();
}

// POST subscribe notifikasi
export async function subscribeToNotifications(subscription) {
  const token = localStorage.getItem("token");

  const response = await fetch(ENDPOINTS.NOTIFICATIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe to notifications");
  }

  return response.json();
}

// POST unsubscribe notifikasi
export async function unsubscribeFromNotifications(subscription) {
  const token = localStorage.getItem("token");

  const response = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error("Failed to unsubscribe from notifications");
  }

  return response.json();
}

// REGISTER user
export async function registerUser(name, email, password) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

// LOGIN user
export async function loginUser(email, password) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// GET data user yang sedang login
export async function getMyUserInfo() {
  const token = localStorage.getItem("token");

  const response = await fetch(ENDPOINTS.MY_USER_INFO, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseJson = await response.json();
  return responseJson;
}
