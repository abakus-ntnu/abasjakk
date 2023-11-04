import { useEffect, useState } from "preact/hooks";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/user";
import StatusMessage from "@/components/statusMessage";
import Leaderboard from "@/components/leaderboard";
import SearchBar from "@/components/searchBar";
import "@/styles/app.css";

const Home = () => {
  const [initialData, setInitialData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const getUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    if (getUsersQuery.isFetched) {
      setInitialData(getUsersQuery.data);
    }
  }, [getUsersQuery]);

  useEffect(() => {
    setSearchedData(initialData);
  }, [initialData]);

  return (
    <>
      <div className="titleBox">
        <img src="/src/public/AbaSjakk_logo.webp" className="logo" />
        <h1>AbaSjakk</h1>
      </div>
      <SearchBar type="USER" users={initialData} setUsers={setSearchedData} />
      {getUsersQuery.isLoading || getUsersQuery.isError ? (
        <StatusMessage query={getUsersQuery} />
      ) : (
        <Leaderboard data={searchedData} initialData={initialData} />
      )}

      <div className="fade" />
    </>
  );
};

export default Home;
