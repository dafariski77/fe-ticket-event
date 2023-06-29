const { default: axios } = require("axios");

export const axiosAPI = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});
