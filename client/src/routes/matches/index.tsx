import { useEffect, useState } from "preact/hooks";
import { GetRounds } from "src/api/round";
import Laser from "src/components/laser";
import MatchesTable from "src/components/matchesTable";
import SearchBar from "src/components/searchBar";
import StatusMessage from "src/components/statusMessage";

import "src/styles/matches.css";

const Matches = () => {
    const [initialData, setInitialData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);

    const getRounds = GetRounds();

    useEffect(() => {
        if (getRounds.isFetched) {
            // console.log(getRounds.data[0].matches);
            setInitialData(getRounds.data);
        }
    }, [getRounds]);

    useEffect(() => {
        setSearchedData(initialData);
    }, [initialData])

    return (
        <>
            <div className="titleBox">
                <h1>Kommende kamper</h1>
            </div>
            <SearchBar type="ROUND" rounds={initialData} setRounds={setSearchedData}  />

            <div className="matchesBox">
                {getRounds.isLoading || getRounds.isError || searchedData.length === 0 ? 
                <StatusMessage query={getRounds} /> :
                <MatchesTable data={searchedData[0]} roundNr={initialData[initialData.length - 1].order} />
                }
            </div>
           

            <br />
            <br />
            <br />
            
            {/* <div className="footer">
                <a href="https://github.com/Abakus-ntnu">
                <img src="src/public/github.svg" className="github" />
                </a>
            </div> */}
            <Laser />
            <div className="fade" />
        </>
    );
}


export default Matches;