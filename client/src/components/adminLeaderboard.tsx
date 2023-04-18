import "./leaderboard.css"

type LeaderboardProps = {
    scores: ScoreProps[]
}

type ScoreProps = {
    name: string,
    score: number
}

const AdminLeaderboard = ({ scores }: LeaderboardProps) => {

    scores.sort((a, b) => (b.score - a.score));

    return (
        <div className={"leaderboard"}>
            {scores.map(score => <Score key={score.name} name={score.name} score={score.score} />)}

            <div className={"score"}>
            <input type="text" className={"name"} placeholder={"navn"}/>
            <input type="number" className={"scoress"} placeholder={"0"}/>
            </div>
        </div>
    );
}

const Score = ({ name, score }: ScoreProps) => {
    return (
        <div className={"score"}>
            <input type="text" className={"name"} value={name}/>
            <input type="number" className={"scoress"} value={score}/>
        </div>
    );
}

export default AdminLeaderboard;