import "./leaderboard.css"

type LeaderboardProps = {
    scores: {
        name: string,
        score: number
    }[]
}

type ScoreProps = {
    name: string,
    score: number,
    pos: number
}

const Leaderboard = ({scores}:LeaderboardProps) => {

    scores.sort((a, b) => (b.score - a.score));

    return (
        <div className={"leaderboard"}>
            {scores.map((score, index) => <Score key={score.name} name={score.name} score={score.score} pos={index + 1} />)}
        </div>
    );
}

const Score = ({name, score, pos}:ScoreProps) => {
    return (
        <div className={"scoreBox"}>
            <div className="position">{pos}</div>
            <div className={"score"}>
                <p className={"name"}>{name}</p>
                <div>{score}</div>
            </div>
        </div>
    );
}

export default Leaderboard;