// src/axiosConfig.ts
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const get = async (endpoint: string) => {
  const response = await axiosInstance.get(endpoint);
  return response.data;
};

export const post = async (endpoint: string, data: object) => {
  const response = await axiosInstance.post(endpoint, data);
  return response.data;
};

export const put = async (endpoint: string, data: object) => {
  const response = await axiosInstance.put(endpoint, data);
  return response.data;
};

export const del = async (endpoint: string) => {
  const response = await axiosInstance.delete(endpoint);
  return response.data;
};

export default axiosInstance;
