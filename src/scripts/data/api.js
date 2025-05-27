// src/scripts/data/api.js
import { getAccessToken } from "../utils/auth";
import { BASE_URL } from "../config";

const ENDPOINTS = {
  //auth
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  MY_USER_INFO: `${BASE_URL}/users/me`,

  //story
  ADD_STORY: `${BASE_URL}/stories`,
  ADD_GUEST_STORY: `${BASE_URL}/stories/guest`,
  GET_ALL_STORIES: `${BASE_URL}/stories`,
  GET_STORY_BY_ID: (id) => `${BASE_URL}/stories/${id}`,

  SUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
  // SEND_STORY_TO_ME: (storyId) => `${BASE_URL}/stories/${storyId}/notify-me`,
  // SEND_STORY_TO_USER: (storyId) => `${BASE_URL}/stories/${storyId}/notify`,
  // SEND_STORY_TO_ALL_USER: (storyId) =>
  //   `${BASE_URL}/stories/${storyId}/notify-all`,
};

export async function registerUser({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });
  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();
  return { ...json, ok: fetchResponse.ok };
}

export async function loginUser({ email, password }) {
  const data = JSON.stringify({ email, password });
  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();
  return { ...json, ok: fetchResponse.ok };
}

export async function getAllStories() {
  const token = getAccessToken();
  const fetchResponse = await fetch(ENDPOINTS.GET_ALL_STORIES, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await fetchResponse.json();
  return { ...json, ok: fetchResponse.ok };
}

export async function addNewStory({ description, photo, lat, lon }) {
  const token = getAccessToken();
  const formData = new FormData();

  formData.append("description", description);

  // Pastikan foto yang diterima adalah file (untuk banyak foto gunakan 'append')
  photo.forEach((pictureBlob) => {
    formData.append("photo", pictureBlob, "image.jpg"); // Ganti 'image.jpg' jika perlu menyesuaikan nama file
  });

  if (lat) formData.append("lat", lat);
  if (lon) formData.append("lon", lon);

  const fetchResponse = await fetch(ENDPOINTS.ADD_STORY, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const json = await fetchResponse.json();
  return { ...json, ok: fetchResponse.ok };
}

export async function getStoryById(id) {
  const token = getAccessToken();
  const fetchResponse = await fetch(ENDPOINTS.GET_STORY_BY_ID(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await fetchResponse.json();
  return { ...json, ok: fetchResponse.ok };
}

export async function subscribePushNotification({
  endpoint,
  keys: { p256dh, auth },
}) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
  });

  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// export async function sendStoryToMeViaNotification(storyId) {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(ENDPOINTS.SEND_STORY_TO_ME(storyId), {
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

// export async function sendStoryToUserViaNotification(storyId, { userId }) {
//   const accessToken = getAccessToken();
//   const data = JSON.stringify({
//     userId,
//   });

//   const fetchResponse = await fetch(ENDPOINTS.SEND_STORY_TO_USER(storyId), {
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

// export async function sendStoryToAllUserViaNotification(storyId) {
//   const accessToken = getAccessToken();

//   const fetchResponse = await fetch(ENDPOINTS.SEND_STORY_TO_ALL_USER(storyId), {
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
