// src/fetchConfig.ts
const BASE_URL = "https://invoice-app-bknd-strapi-cloud.onrender.com";

const getToken = () => localStorage.getItem("token");

const fetchConfig = {
  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
  post: async (endpoint: string, data: object) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  put: async (endpoint: string, data: object) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.json();
  },
};

export default fetchConfig;
