import ApiClient from "./apiClient";

export const checkPassword = (): Promise<number> =>
  ApiClient.get(`/login`)
    .then((res) => res.status)
    .catch((err) => err.response.status);
