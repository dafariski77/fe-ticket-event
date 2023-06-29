import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const usePut = ({ onSuccess, headers, onError, url }) => {
  return useMutation({
    mutationFn: async ({ body, id }) => {
      const dataResponse = await axiosInstance.put(`${url}/${id}`, body, {
        headers,
      });
      return dataResponse;
    },
    onSuccess,
    onError,
  });
};
