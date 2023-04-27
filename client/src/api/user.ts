import { useMutation, useQuery } from "react-query";
import { User } from "src/types";
import ApiClient from "./apiClient";

export const GetUsers = () => useQuery({
    retry: 2,
    queryKey: "getUsers",
    queryFn: async ():Promise<User[]> => await ApiClient.get("/user/")
        .then(res => {
            console.log(res.status, "users fetched");
            return res.data
        })
        .catch(err => {
            throw new Error(err.response.status);
        }),
});

export const CreateUser = () => useMutation({
    retry: 2,
    mutationKey: "createUser",
    mutationFn: async (user:User):Promise<void> => await ApiClient.post("/user/", user)
        .then(res => console.log(res.status, "user created"))
        .catch(err => err)
});

export const UpdateUser = () => useMutation({
    retry: 2,
    mutationKey: "updateUser",
    mutationFn: async (user:User):Promise<void> => await ApiClient.put(`/user/${user._id}`, user)
        .then(res => console.log(res.status, "user updated"))
        .catch(err => err)
    });

export const DeleteUser = () => useMutation({
    retry: 2,
    mutationKey: "deleteUser",
    mutationFn: async (user:User):Promise<void> => await ApiClient.delete(`/user/${user._id}`)
        .then(res => console.log(res.status, "user deleted"))
        .catch(err => err)
});