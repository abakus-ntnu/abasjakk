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

const AdminLeaderboard = ({ scores }: LeaderboardProps) => {

    scores.sort((a, b) => (b.score - a.score));

    return (
        <div className={"leaderboard"}>
            {scores.map((score, index) => <Score key={score.name} name={score.name} score={score.score} pos={index + 1} />)}

            <div className="scoreBox">
                <div className="position">?</div>
                <form className="score">
                    <input type="text" className="name" placeholder="Eks. Ola Nordmann.." />
                    <input type="number" className="scoreNumber" placeholder="Eks: 5" />
                </form>
            </div>
        </div>
    );
}

const Score = ({ name, score, pos }: ScoreProps) => {
    return (
        <div className="scoreBox">
            <div className="position">{pos}</div>
            <form className="score">
                <input type="text" className="name" value={name} />
                <input type="number" className="scoreNumber" value={score} />
            </form>
        </div>
    );
}

export default AdminLeaderboard;