import ApiClient from "./apiClient";
import { User } from "@/types";

export const getUsers = (): Promise<User[]> =>
  ApiClient.get("/user/")
    .then((res) => {
      console.log(res.status, "users fetched");
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.response.status);
    });

export const createUser = (user: User): Promise<void> =>
  ApiClient.post("/user/", user)
    .then((res) => console.log(res.status, "user created"))
    .catch((err) => {
      if (err.response.status === 400)
        console.log(err.response.status, "Username already exists");
    });

export const updateUser = (user: User): Promise<void> =>
  ApiClient.put(`/user/${user._id}`, user)
    .then((res) => console.log(res.status, "user updated"))
    .catch((err) => err);

export const deleteUser = (user: User): Promise<void> =>
  ApiClient.delete(`/user/${user._id}`)
    .then((res) => console.log(res.status, "user deleted"))
    .catch((err) => err);
