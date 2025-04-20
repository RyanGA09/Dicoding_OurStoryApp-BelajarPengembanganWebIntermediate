import CONFIG from "../config";

const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
  NOTIFICATIONS: `${CONFIG.BASE_URL}/notifications/subscribe`,
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
    console.log("API Response:", responseJson); // Log respons API

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

// POST story baru
export const postStory = async (photo, description) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("description", description);

  const response = await fetch("https://story-api.dicoding.dev/v1/stories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to submit story");
  }

  return response.json(); // Mengembalikan hasil response JSON
};

// Register user
export async function registerUser(name, email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

// Login user
export async function loginUser(email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// Convert VAPID public key ke Uint8Array
export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Subscribe Push Notification
export async function subscribeNotification(subscription) {
  if (!subscription || !subscription.endpoint || !subscription.keys) {
    throw new Error("Subscription data tidak valid.");
  }

  const response = await fetch(ENDPOINTS.NOTIFICATIONS, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gagal subscribe notification: ${errorText}`);
  }

  return response.json();
}

// Unsubscribe Push Notification
export async function unsubscribeNotification(endpoint) {
  const response = await fetch(ENDPOINTS.NOTIFICATIONS, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ endpoint }),
  });
  return response.json();
}
