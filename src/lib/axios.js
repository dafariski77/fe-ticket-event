import axios from "axios";

export const axiosAuth = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});