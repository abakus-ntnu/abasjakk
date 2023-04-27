import { useEffect, useState } from "preact/hooks";
import { CreateUser, GetUsers } from "src/api/user";
import AdminLeaderboard from "src/components/adminLeaderboard";
import MatchesTable from "src/components/matchesTable";
import SearchBar from "src/components/searchBar";
import StatusMessage from "src/components/statusMessage";

import "src/styles/admin.css";
import { QueryProps, QueryPropsUsers } from "src/types";

const scores = [
  {
    name: "Jenny",
    score: 90
  },
  {
    name: "Isak",
    score: 8
  },
  {
    name: "Falk",
    score: 5
  },
  {
    name: "Ivar",
    score: 7
  },
  {
    name: "abakule1",
    score: 0
  },
  {
    name: "abakule2",
    score: 0
  }
];

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
  const users = {
    scores,
    pairings
  }
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
      <SearchBar data={initialScores} additionalData={initialPairings} setSearchedData={setSearchedScores} setAdditionalSearchedData={setSearchedPairings} />
      <input placeholder="CREATE USER" onKeyDown={onSubmit} />
      <div className="adminContent">
        <div className="adminLeaderboard">
          <h2>Leaderboard</h2>
          {getUsers.isLoading || getUsers.isError ? 
            <StatusMessage query={getUsers} /> : 
            <AdminLeaderboard data={searchedScores} initialData={initialScores} getUsersQuery={getUsers} />
          }
        </div>
        <div className="verticalLine" />
        <div className="adminMatches">
          <div>
          <h2>Kamper</h2>
          <MatchesTable data={searchedPairings} isAdmin={true} />
          </div>
          <div>
            <h2>Kamp historikk</h2>
          </div>
        </div>
      </div>


    </>

  );
};


export default Admin;
