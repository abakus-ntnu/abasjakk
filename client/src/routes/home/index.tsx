import { useState } from "preact/hooks";
import Leaderboard from "src/components/leaderboard";
import SearchBar from "src/components/searchBar";

import "../../app.css";

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
    name: "Abakule1",
    score: 0
  },
  {
    name: "Abakule1",
    score: 0
  },
  {
    name: "Abakule1",
    score: 0
  },
  {
    name: "Abakule1",
    score: 0
  },
  {
    name: "Abakule1",
    score: 0
  },
  {
    name: "Abakule1",
    score: 0
  },
  {
    name: "Abakule1",
    score: 0
  },
  {
    name: "Abakule1",
    score: 0
  }
];

const Home = () => {
  const [searchedData, setSearchedData] = useState(scores);

  return (
    <>
      <div className="titleBox">
        <img src="src/public/AbaSjakk_logo.webp" className="logo" />
        <h1>AbaSjakk</h1>
      </div>
      <SearchBar data={scores} setSearchedData={setSearchedData} />
      <br />
      <Leaderboard data={searchedData} initialData={scores} />

      <br />
      <br />
      <br />
      
      {/* <div className="footer">
        <a href="https://github.com/Abakus-ntnu">
          <img src="src/public/github.png" className="github" />
        </a>
      </div> */}
    </>
  );
};

export default Home;
