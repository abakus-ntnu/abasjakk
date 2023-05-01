import { useMutation, useQuery } from "react-query";
import ApiClient from "./apiClient";
import { Settings } from 'src/types';


export const GetTableCount = () => useQuery({
    retry: 2,
    queryKey: "getTableCount",
    queryFn: async ():Promise<number> => await ApiClient.get("/settings/tableCount")
        .then(res => {
            console.log(res.status, "tableCount fetched");
            return res.data;
        })
        .catch(err => err)
});

export const SetTableCount = () => useMutation({
    retry: 2,
    mutationKey: "setTableCount",
    mutationFn: async (settings:Settings):Promise<void> => await ApiClient.put("/settings/tableCount", settings)
        .then(res => console.log(res.status, "tableCount set"))
        .catch(err => err)
});