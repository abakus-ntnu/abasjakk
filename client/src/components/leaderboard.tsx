import "@/styles/leaderboard.css";
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
            {/* <div className="leaderboardHeaders">
                <div>Plass</div>
                <div>Navn</div>
                <div>Poeng</div>
            </div> */}
            {data.map(score => <Score key={score.name} name={score.name} score={score.score} pos={initialData.indexOf(score) + 1} />)}
            {data.length === 0 && <StatusMessage status="no-results" />}
            <br />
        </div>
    );
}

const Score = ({name, score, pos}:ScoreProps) => {
    return (
        <div className={`scoreBox gradient-border${pos === 1 ? " first": ""}`}>
            <div className="position">{pos}</div>
            <div className="name">{name}</div>
            <div className="scoreNumber">{score}p</div>
        </div>
    );
}

export default Leaderboard;