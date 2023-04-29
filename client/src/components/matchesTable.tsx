import { MatchesTableProps } from "src/types"
import StatusMessage from "./statusMessage";

const MatchesTable = ({ data, isAdmin = false, roundNr }:MatchesTableProps) => {
    const setResult = (event) => {
        console.log(event.target.value, "vant");
    }
    return (
        <>
            <table className="matchesList">
            <caption>Runde {roundNr}</caption>
            <tr className="tableHeaders">
                <th className="playerHeader">Hvit</th>
                <th className="vsHeader" />
                <th className="playerHeader">Sort</th>
                <th className="tableColumn">Bord</th>
                {isAdmin && <th className="resultColumn">Resultat</th>}
            </tr>
            {data.matches.map((match, index) => {
                return (
                    <tr key={index}>
                        <td>{match.white.name || "DELETED"}</td>
                        <td className="vsBox">
                            <img src="src/public/king.svg" className="whiteKing" />  
                            <p>VS</p>
                            <img src="src/public/king.svg" /> 
                        </td>
                        <td>{match.black.name || "DELETED"}</td>
                        <td>{match.table || "?"}</td>
                        {isAdmin && 
                            <td>
                                <select onChange={setResult}>
                                    <option disabled selected value=""> -- Resultat --</option>
                                    <option value={match.white.name}>Hvit vant</option>
                                    <option value={match.black.name}>Sort vant</option>
                                    <option value="DRAW">Uavgjort</option>
                                </select>  
                            </td>
                        }
                    </tr>
                )
            })}
        </table>
        {data.matches.length === 0 && <StatusMessage status="no-results" />}
    </>
    );
}


export default MatchesTable;