import ApiClient from "./apiClient";
import { Round } from "@/types";

export const getRounds = (): Promise<Round[]> =>
  ApiClient.get("/round/")
    .then((res) => {
      console.log(res.status, "rounds fetched");
      return res.data;
    })
    .catch((err) => err);

export const createRound = (): Promise<void> =>
  ApiClient.post("/round/")
    .then((res) => console.log(res.status, "round created"))
    .catch((err) => err);
