import { useQuery } from "react-query";
import ApiClient from "./apiClient";

export const CheckPassword = () =>
  useQuery({
    retry: 2,
    queryKey: "checkPassword",
    queryFn: async (): Promise<number> =>
      await ApiClient.get(`/login`)
        .then((res) => res.status)
        .catch((err) => err.response.status),
  });
