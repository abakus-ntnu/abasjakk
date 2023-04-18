import Leaderboard from "src/components/leaderboard";

import styles from "../../app.css";

const scores = [
  {
    name: "Jenny",
    score: 900
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
    <Leaderboard scores={scores} />
  );
};

export default Home;
