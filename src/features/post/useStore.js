import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useStore = ({ onSuccess, headers, onError, url }) => {
  return useMutation({
    mutationFn: async (body) => {
      const dataResponse = await axiosInstance.post(url, body, {
        headers,
      });

      return dataResponse;
    },
    onSuccess,
    onError,
  });
};
