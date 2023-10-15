import { useEffect, useState } from "preact/hooks";
import { GetUsers } from "@/api/user";
import Leaderboard from "@/components/leaderboard";
import SearchBar from "@/components/searchBar";

import "@/styles/app.css";
import StatusMessage from "@/components/statusMessage";
import Laser from "@/components/laser";

const Home = () => {
  const [initialData, setInitialData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const getUsers = GetUsers();

  useEffect(() => {
    if (getUsers.isFetched) {
      setInitialData(getUsers.data);
    }
  }, [getUsers]);
  
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
      {getUsers.isLoading || getUsers.isError ? 
        <StatusMessage query={getUsers} /> :
        <Leaderboard data={searchedData} initialData={initialData} />
      }

      <div className="fade" />
    </>
  );
};

export default Home;
