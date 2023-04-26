import { useState } from "preact/hooks";
import AdminLeaderboard from "src/components/adminLeaderboard";
import MatchesTable from "src/components/matchesTable";
import SearchBar from "src/components/searchBar";

import "src/styles/admin.css";

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
  const data = {
    scores,
    pairings
  }
  const [searchedScores, setSearchedScores] = useState(data.scores);
  const [searchedPairings, setSearchedPairings] = useState(data.pairings);

  return (
    <>
      <h1 className="adminTitle">Admin</h1>
      <SearchBar data={data.scores} additionalData={data.pairings} setSearchedData={setSearchedScores} setAdditionalSearchedData={setSearchedPairings} />
      <div className="adminContent">
        <div className="adminLeaderboard">
          <h2>Leaderboard</h2>
          <AdminLeaderboard data={searchedScores} initialData={data.scores} />
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
