import { axiosAPI } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAuth = ({ onSuccess, headers, onError, url }) => {
  return useMutation({
    mutationFn: async (body) => {
      const authResponse = await axiosAPI.post(url, body, {
        headers,
      });

      return authResponse;
    },
    onSuccess,
    onError,
  });
};
