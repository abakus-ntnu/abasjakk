import { useEffect, useState } from "preact/hooks";
import { CreateUser, GetUsers } from "src/api/user";
import AdminLeaderboard from "src/components/adminLeaderboard";
import MatchesTable from "src/components/matchesTable";
import SearchBar from "src/components/searchBar";
import StatusMessage from "src/components/statusMessage";

import "src/styles/admin.css";

const pairings = [
  {
    white: "isak",
    black: "falk",
    table: 1
  },
  {
    white: "jenny",
    black: "ivar",
    table: 2
  },
  {
    white: "abakule1",
    black: "abakule2",
    table: 3
  }
]

const Admin = () => {
  const [initialScores, setInitialScores] = useState([]);
  const [searchedScores, setSearchedScores] = useState([]);

  const [initialPairings, setInitialPairings] = useState(pairings);
  const [searchedPairings, setSearchedPairings] = useState(pairings);

  const getUsers = GetUsers();
  const createUser = CreateUser();


  useEffect(() => {
    if (getUsers.isFetched) {
      setInitialScores(getUsers.data);
    }
  }, [getUsers]);
  
  useEffect(() => {
    setSearchedScores(initialScores);
  }, [initialScores]);

  const onSubmit = (e) => {
    if (e.key === "Enter") {
      createUser.mutate({
        name: e.target.value
      }, {
        onSuccess: () => {getUsers.refetch()}
      });
    }
  }

  return (
    <>
      <h1 className="adminTitle">Admin</h1>
      <div className="adminControls">
        <SearchBar data={initialScores} additionalData={initialPairings} setSearchedData={setSearchedScores} setAdditionalSearchedData={setSearchedPairings} />
        <div className="createUserBox">
            <input placeholder="Legg til ny bruker" onKeyDown={onSubmit} />
            <img src="src/public/new-user.svg" className="createUserIcon" />
        </div>
        <div className="numberOfTablesBox">
          <h3>Antall bord:</h3>
          <input type="number" value={10} min={0} placeholder="0" />
        </div>
        <input type="button" value="Generer ny runde" />
      </div>
      <div className="adminContent">
        <div className="adminLeaderboard">
          {getUsers.isLoading || getUsers.isError ? 
            <StatusMessage query={getUsers} /> : 
            <AdminLeaderboard data={searchedScores} initialData={initialScores} getUsersQuery={getUsers} />
          }
        </div>
        <div className="verticalLine" />
        <div className="adminMatches">
          <MatchesTable data={searchedPairings} isAdmin={true} />
          <div>
            <h2>Kamp historikk</h2>
          </div>
        </div>
      </div>


    </>

  );
};


export default Admin;
