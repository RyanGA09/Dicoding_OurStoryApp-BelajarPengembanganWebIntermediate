// src/scripts/data/api.js
import { getAccessToken } from "../utils/auth";
import { BASE_URL } from "../config";

const ENDPOINTS = {
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  ADD_STORY: `${BASE_URL}/stories`,
  ADD_GUEST_STORY: `${BASE_URL}/stories/guest`,
  GET_ALL_STORIES: `${BASE_URL}/stories`,
  GET_STORY_BY_ID: (id) => `${BASE_URL}/stories/${id}`,
  SUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${BASE_URL}/notifications/subscribe`,
};

export async function registerUser({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });
  const res = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await res.json();
  return { ...json, ok: res.ok };
}

export async function loginUser({ email, password }) {
  const data = JSON.stringify({ email, password });
  const res = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await res.json();
  return { ...json, ok: res.ok };
}

export async function addNewStory({ description, photo, lat, lon }) {
  const token = getAccessToken();
  const formData = new FormData();
  formData.append("description", description);
  formData.append("photo", photo);
  if (lat) formData.append("lat", lat);
  if (lon) formData.append("lon", lon);

  const res = await fetch(ENDPOINTS.ADD_STORY, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const json = await res.json();
  return { ...json, ok: res.ok };
}

export async function getAllStories({ page = 1, size = 10, location = 0 }) {
  const token = getAccessToken();
  const url = `${ENDPOINTS.GET_ALL_STORIES}?page=${page}&size=${size}&location=${location}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  return { ...json, ok: res.ok };
}

export async function getStoryById(id) {
  const token = getAccessToken();
  const res = await fetch(ENDPOINTS.GET_STORY_BY_ID(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  return { ...json, ok: res.ok };
}

export async function subscribeToStory({ endpoint, keys }) {
  const token = getAccessToken();
  const res = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint, keys }),
  });
  const json = await res.json();
  return { ...json, ok: res.ok };
}

export async function unsubscribeFromStory({ endpoint }) {
  const token = getAccessToken();
  const res = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint }),
  });
  const json = await res.json();
  return { ...json, ok: res.ok };
}
