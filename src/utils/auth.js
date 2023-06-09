import { axiosAuth } from "@/lib/axios";

export const Auth = async (url, payload) => {
  try {
    return await axiosAuth.post(url, payload);
  } catch (err) {
    return console.log(err.response.data.message);
  }
};
