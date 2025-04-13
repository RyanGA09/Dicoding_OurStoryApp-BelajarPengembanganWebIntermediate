import CONFIG from "../config";

const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
};

export async function getAllStories() {
  const response = await fetch(ENDPOINTS.STORIES, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const responseJson = await response.json();
  return responseJson.listStory;
}

static async getStoryById(id) {
  const response = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const responseJson = await response.json();
  return responseJson.story;
}

static async postStory(photo, description) {
  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('description', description);

  const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });

  return response.json();
}
