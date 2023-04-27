import { useEffect, useState } from "preact/hooks";
import { GetUsers } from "src/api/user";
import Leaderboard from "src/components/leaderboard";
import SearchBar from "src/components/searchBar";

import "src/styles/app.css";
import StatusMessage from "src/components/statusMessage";

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
        <img src="src/public/AbaSjakk_logo.webp" className="logo" />
        <h1>AbaSjakk</h1>
      </div>
      <SearchBar data={initialData} setSearchedData={setSearchedData} />
      {getUsers.isLoading || getUsers.isError ? 
      <StatusMessage query={getUsers} /> :
      <Leaderboard data={searchedData} initialData={initialData} />
      }
    </>
  );
};

export default Home;
