type Props = {
    data: Array<{
        white: string,
        black: string,
        table: number
    }>,
    isAdmin?: boolean
}

const MatchesTable = ({ data, isAdmin }:Props) => {

    const setResult = (event) => {
        console.log(event.target.value, "vant");
    }
    return (
        <table className="matchesList">
        <caption>Kamper</caption>
        <tr className="tableHeaders">
            <th className="playerHeader">Hvit</th>
            <th className="vsHeader" />
            <th className="playerHeader">Sort</th>
            <th className="tableColumn">Bord</th>
            {isAdmin && <th className="resultColumn">Resultat</th>}
        </tr>
        {
            data.map((pair, index) => {
                return (
                    <tr key={index}>
                        <td>{pair.white}</td>
                        <td className="vsBox">
                            <img src="src/public/king.png" className="whiteKing" />  
                            <p>VS</p>
                            <img src="src/public/king.png" /> 
                        </td>
                        <td>{pair.black}</td>
                        <td>{pair.table}</td>
                        {isAdmin && 
                            <td>
                                <select onChange={setResult}>
                                    <option disabled selected value=""> -- Resultat --</option>
                                    <option value={pair.white}>Hvit vant</option>
                                    <option value={pair.black}>Sort vant</option>
                                    <option value="draw">Uavgjort</option>
                                </select>  
                            </td>
                        }
                    </tr>
                ); 
            })
        }
    </table>
    );
}


export default MatchesTable;