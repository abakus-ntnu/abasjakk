import "src/styles/leaderboard.css";

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

const AdminLeaderboard = ({ data, initialData }: LeaderboardProps) => {

    data.sort((a, b) => (b.score - a.score));

    return (
        <table className="adminLeaderboard">
            <tr>
                <th>Posisjon</th>
                <th className="nameHeader">Navn</th>
                <th className="scoreHeader">Score</th>
                <th />
            </tr>
            {data.map((score, index) => {
                return (
                    <tr key={index}>
                        <td>{initialData.indexOf(score) + 1}</td>
                        <td><input type="text" className="inputName" value={score.name} /></td>
                        <td><input type="number" className="inputScore" value={score.score} /></td>
                        <td className="imageBox">
                            <img src="src/public/save.svg" className="save" />
                            <img src="src/public/x.svg" className="x" />
                        </td>
                    </tr>
                );
            })}
        </table>
    );
}

export default AdminLeaderboard;