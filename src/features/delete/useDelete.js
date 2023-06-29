import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDelete = ({ onSuccess, headers, onError, url }) => {
  return useMutation({
    mutationFn: async (body) => {
      const dataResponse = await axiosInstance.delete(`${url}/${body.id}`, {
        headers,
      });

      return dataResponse;
    },
    onSuccess,
    onError,
  });
};
