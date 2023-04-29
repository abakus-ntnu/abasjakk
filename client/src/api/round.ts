import { useMutation, useQuery } from "react-query";
import { Round } from "src/types";
import ApiClient from "./apiClient";

export const GetRounds = () => useQuery({
    retry: 2,
    queryKey: "getRounds",
    queryFn: async ():Promise<Round[]> => await ApiClient.get("/round/")
        .then(res => {
            console.log(res.status, "rounds fetched");
            return res.data;
        })
        .catch(err => err)
});

export const CreateRound = () => useMutation({
    retry: 2,
    mutationKey: "createRound",
    mutationFn: async (_:object):Promise<void> => await ApiClient.post("/round/")
        .then(res => console.log(res.status, "round created"))
        .catch(err => err)
});