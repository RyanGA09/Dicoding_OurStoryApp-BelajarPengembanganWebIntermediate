import CONFIG from "../config";

const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
};

// GET semua story
export async function getAllStories() {
  const response = await fetch(ENDPOINTS.STORIES, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const responseJson = await response.json();
  return responseJson.listStory;
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
export async function postStory(photo, description) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("description", description);

  const response = await fetch(ENDPOINTS.STORIES, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  return response.json();
}

export async function registerUser(name, email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${CONFIG.BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}
