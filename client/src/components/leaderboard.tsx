import "./leaderboard.css"

type LeaderboardProps = {
    scores: ScoreProps[]
}

type ScoreProps = {
    name: string,
    score: number
}

const Leaderboard = ({scores}:LeaderboardProps) => {

    scores.sort((a, b) => (b.score - a.score));

    return (
        <div className={"leaderboard"}>
            {scores.map(score => <Score key={score.name} name={score.name} score={score.score} />)}
        </div>
    );
}

const Score = ({name, score}:ScoreProps) => {
    return (
        <div className={"score"}>
            <p className={"name"}>{name}</p>
            <div>{score}</div>
        </div>
    );
}

export default Leaderboard;