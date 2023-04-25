import { useState } from "preact/hooks";
import SearchBar from "src/components/searchBar";
import "./matches.css";

const pairings = [
    {
        white: "Isak",
        black: "Falk",
        table: 4
    },
    {
        white: "Jenny",
        black: "Arash",
        table: 7
    },
    {
        white: "Ivar",
        black: "Jonas",
        table: 2
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 10
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 17
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 10
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 10
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 10
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 10
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 10
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 10
    },
    {
        white: "Abakule1",
        black: "Abakule2",
        table: 10
    }

]


const Matches = () => {
    const [searchedData, setSearchedData] = useState(pairings);

    return (
        <>
            <div className="titleBox">
                <h1>Kommende kamper</h1>
            </div>

            <SearchBar data={pairings} setSearchedData={setSearchedData} />

            {/* <hr /> */}

            <table className="matchesList">
                <tr className="tableHeaders">
                    <th className="playerHeader">Hvit</th>
                    <th className="vsHeader" />
                    <th className="playerHeader">Sort</th>
                    <th className="tableColumn">Bord</th>
                </tr>
                {
                    searchedData.map((pair, index) => {
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
                            </tr>
                        ); 
                    })
                }
            </table>

            <br />
            <br />
            <br />
            
            {/* <div className="footer">
                <a href="https://github.com/Abakus-ntnu">
                <img src="src/public/github.png" className="github" />
                </a>
            </div> */}
    </>
    );
}


export default Matches;