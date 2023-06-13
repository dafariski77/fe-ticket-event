const { default: axios } = require("axios");

export const axiosAPI = axios.create({
  baseURL: "https://be-ticket-event-production.up.railway.app/api/auth",
});
