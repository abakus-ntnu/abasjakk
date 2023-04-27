import { useState } from "preact/hooks";
import MatchesTable from "src/components/matchesTable";
import SearchBar from "src/components/searchBar";

import "src/styles/matches.css";

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

            <div className="matchesBox">
                <MatchesTable data={searchedData} />
            </div>
           

            <br />
            <br />
            <br />
            
            {/* <div className="footer">
                <a href="https://github.com/Abakus-ntnu">
                <img src="src/public/github.svg" className="github" />
                </a>
            </div> */}
    </>
    );
}


export default Matches;