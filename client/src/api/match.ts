import { useMutation, useQuery } from "react-query";
import ApiClient from "./apiClient";
import { Match } from "src/types";

export const GetMatch = () =>
  useQuery({
    retry: 2,
    queryKey: "getMatch",
    queryFn: async (id): Promise<Match> =>
      await ApiClient.get(`/match/${id}`)
        .then((res) => {
          console.log(res.status, "match fetched");
          return res.data;
        })
        .catch((err) => err),
  });

export const CreateMatch = () =>
  useMutation({
    retry: 2,
    mutationKey: "createMatch",
    mutationFn: async (match: Match): Promise<void> =>
      await ApiClient.post("/match/", match)
        .then((res) => console.log(res.status, "match created"))
        .catch((err) => err),
  });

export const UpdateResult = () =>
  useMutation({
    retry: 2,
    mutationKey: "updateResult",
    mutationFn: async (data: { match: Match; result: object }): Promise<void> =>
      await ApiClient.put(`/match/${data.match._id}`, data.result)
        .then((res) => console.log(res.status, "match updated"))
        .catch((err) => err),
  });
