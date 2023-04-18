import { Link } from "preact-router";
import useUsers from "src/hooks/useUsers";
import { useQuery } from "react-query";
import { User } from "src/types";
import axios from "axios";

const Home = () => {
  const users = useQuery({
    queryFn: async (): Promise<User[]> =>
      await axios({ baseURL: "http://127.0.0.1:8001", url: "/user/get" })
        .then(async (res) => res.data)
        .catch((err) => err),
  });

  // find a way to use getUsers instead of useQuery directly here
  const { getUsers } = useUsers();
  const sss = getUsers();

  return (
    <>
      <div onClick={() => console.log(users.data)}>homepage</div>
      <div>users:</div>
      {users.data?.map((user) => (
        <div style={{ color: "red" }}>{user.firstName}</div>
      ))}

      <Link href="/someOtherPage">Me</Link>
    </>
  );
};

export default Home;
