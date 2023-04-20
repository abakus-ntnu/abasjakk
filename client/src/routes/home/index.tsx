import Leaderboard from "src/components/leaderboard";

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
  }
];

const Home = () => {
  return (
    <>
      <div className={"titleBox"}>
        <img src="src/public/AbaSjakk_logo.webp" className="logo" />
        <h1>AbaSjakk</h1>
      </div>
      <Leaderboard scores={scores} />
      
      <div className="footer">
        <a href="https://github.com/Abakus-ntnu">
          <img src="src/public/github.png" className="github" />
        </a>
      </div>
    </>
  );
};

export default Home;
