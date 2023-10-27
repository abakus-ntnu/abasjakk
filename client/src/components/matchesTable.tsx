import { Match, MatchesTableProps, result } from "@/types";
import { UpdateResult } from "@/api/match";
import StatusMessage from "./statusMessage";

const MatchesTable = ({
  data,
  roundNr,
  isAdmin = false,
  getUsers,
}: MatchesTableProps) => {
  const updateResult = UpdateResult();

  const setResult = (event, match: Match) => {
    updateResult.mutate(
      {
        match,
        result: { result: event.target.value },
      },
      {
        onSuccess: () => {
          getUsers.refetch();
        },
      },
    );
  };

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
                <img src="/src/public/king.svg" className="whiteKing" />
                <p>VS</p>
                <img src="/src/public/king.svg" />
              </td>
              <td>{match.black.name || "DELETED"}</td>
              <td>{match.table || "?"}</td>
              {isAdmin && (
                <td>
                  <select
                    onChange={(event) => setResult(event, match)}
                    autoComplete="off"
                  >
                    <option
                      selected={match.result === result.IN_PROGRESS}
                      value="IN_PROGRESS"
                    >
                      -- PÅGÅR --
                    </option>
                    <option
                      selected={match.result === result.WHITE_VICTORY}
                      value="WHITE_VICTORY"
                    >
                      HVIT VANT
                    </option>
                    <option
                      selected={match.result === result.BLACK_VICTORY}
                      value="BLACK_VICTORY"
                    >
                      SORT VANT
                    </option>
                    <option
                      selected={match.result === result.DRAW}
                      value="DRAW"
                    >
                      UAVGJORT
                    </option>
                  </select>
                </td>
              )}
            </tr>
          );
        })}
      </table>
      {data.matches.length === 0 && <StatusMessage status="no-results" />}
    </>
  );
};

export default MatchesTable;
