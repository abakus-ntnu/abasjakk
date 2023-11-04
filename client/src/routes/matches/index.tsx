import { useEffect, useState } from "preact/hooks";
import { useQuery } from "@tanstack/react-query";
import { getRounds } from "@/api/round";
import StatusMessage from "@/components/statusMessage";
import MatchesTable from "@/components/matchesTable";
import SearchBar from "@/components/searchBar";
import "@/styles/matches.css";

const Matches = () => {
  const [initialData, setInitialData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const getRoundsQuery = useQuery({
    queryKey: ["rounds"],
    queryFn: getRounds,
  });

  useEffect(() => {
    if (getRoundsQuery.isFetched) {
      setInitialData(getRoundsQuery.data);
    }
  }, [getRoundsQuery]);

  useEffect(() => {
    setSearchedData(initialData);
  }, [initialData]);

  return (
    <>
      <div className="titleBox">
        <h1>Kommende kamper</h1>
      </div>
      <SearchBar
        type="ROUND"
        rounds={initialData}
        setRounds={setSearchedData}
      />

      <div className="matchesBox">
        {getRoundsQuery.isLoading ||
        getRoundsQuery.isError ||
        searchedData.length === 0 ? (
          <StatusMessage query={getRoundsQuery} />
        ) : (
          <MatchesTable
            data={searchedData[searchedData.length - 1]}
            roundNr={initialData[initialData.length - 1].order}
          />
        )}
      </div>

      <br />
      <br />
      <br />

      {/* <div className="footer">
                <a href="https://github.com/Abakus-ntnu">
                <img src="/src/public/github.svg" className="github" />
                </a>
            </div> */}
      <div className="fade" />
    </>
  );
};

export default Matches;
