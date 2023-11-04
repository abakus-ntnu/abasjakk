import ApiClient from "./apiClient";
import { Match } from "@/types";

export const updateResult = (data: {
  match: Match;
  result: object;
}): Promise<void> =>
  ApiClient.put(`/match/${data.match._id}`, data.result)
    .then((res) => console.log(res.status, "match updated"))
    .catch((err) => err);

// unused :)
export const getMatch = (id: string): Promise<Match> =>
  ApiClient.get(`/match/${id}`)
    .then((res) => {
      console.log(res.status, "match fetched");
      return res.data;
    })
    .catch((err) => err);

// unused :)
export const createMatch = (match: Match): Promise<void> =>
  ApiClient.post("/match/", match)
    .then((res) => console.log(res.status, "match created"))
    .catch((err) => err);
