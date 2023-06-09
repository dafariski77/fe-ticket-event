import axios from "axios";

export const axiosAuth = axios.create({
  baseURL: "https://be-ticket-event-production.up.railway.app/api/auth",
});