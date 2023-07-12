import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetch = ({
  headers,
  onError,
  url,
  queryKey,
  onSuccess,
  cacheTime,
}) => {
  return useQuery({
    queryFn: async () => {
      const authResponse = await axiosInstance.get(url, { headers });

      return authResponse;
    },
    queryKey,
    onError,
    onSuccess,
    cacheTime,
  });
};

export const useFetchUser = ({ headers, onError, onSuccess }) => {
  return useQuery({
    queryFn: async () => {
      const user = await axiosInstance.get("/user", { headers });

      return user;
    },
    queryKey: ["user"],
    onError,
    onSuccess,
  });
};
