import "src/styles/leaderboard.css";
import StatusMessage from "./statusMessage";

type LeaderboardProps = {
    data: Array<{
        name: string,
        score: number
    }>,
    initialData: Array<{
      name: string,
      score: number
    }>
}

type ScoreProps = {
    name: string,
    score: number,
    pos: number
}

const Leaderboard = ({ data, initialData }: LeaderboardProps) => {

    data.sort((a, b) => (b.score - a.score));

    return (
        <div className={"leaderboard"}>
            {data.map(score => <Score key={score.name} name={score.name} score={score.score} pos={initialData.indexOf(score) + 1} />)}
            {data.length === 0 && <StatusMessage status="no-result" />}
        </div>
    );
}

const Score = ({name, score, pos}:ScoreProps) => {
    return (
        <div className="scoreBox">
            <div className="position">{pos}</div>
            <div className="score">
                <p className="name">{name}</p>
                <div className="scoreNumber">{score}</div>
            </div>
        </div>
    );
}

export default Leaderboard;