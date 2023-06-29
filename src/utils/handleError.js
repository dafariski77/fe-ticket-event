import { deleteCookie } from "cookies-next";

const handleError = (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401) {
    originalRequest._retry = true;

    deleteCookie("auth", { secure: true, path: "/" });
  }

  return error;
};

export default handleError;
