import axios from "axios";
import { useQuery } from "react-query";
import { User } from "src/types";

export default function useUsers() {
  async function getUsers() {
    const users = useQuery({
      queryFn: async (): Promise<User[]> =>
        await axios({ baseURL: "http://127.0.0.1:8001", url: "/user/get" })
          .then(async (res) => res.data)
          .catch((err) => err),
    });
    return users;
  }
  return { getUsers };
}
