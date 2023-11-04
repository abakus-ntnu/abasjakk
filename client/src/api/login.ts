import ApiClient from "./apiClient";

export const checkPassword = ({
  password = null,
}: {
  password?: string;
}): Promise<number> =>
  ApiClient.get(`/login`, {
    headers: {
      password: password || sessionStorage.getItem("admin_password"),
    },
  })
    .then((res) => res.status)
    .catch((err) => err.response.status);
