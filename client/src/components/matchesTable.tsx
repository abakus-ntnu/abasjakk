import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResult } from "@/api/match";
import StatusMessage from "./statusMessage";
import { Match, Round, result } from "@/types";

interface Props {
  data: Round;
  roundNr: number | string;
  isAdmin?: boolean;
}

const MatchesTable = ({ data, roundNr, isAdmin = false }: Props) => {
  const queryClient = useQueryClient();
  const updateResultMutation = useMutation({
    mutationFn: updateResult,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const setResult = (event, match: Match) =>
    updateResultMutation.mutate({
      match,
      result: { result: event.target.value },
    });

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
