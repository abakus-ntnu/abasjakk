import { useEffect, useState } from "preact/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getRounds, createRound } from "@/api/round";
import { getUsers, createUser } from "@/api/user";
import { isLoggedIn } from "../login";
import AdminLeaderboard from "@/components/adminLeaderboard";
import StatusMessage from "@/components/statusMessage";
import MatchesTable from "@/components/matchesTable";
import SearchBar from "@/components/searchBar";
import "@/styles/app.css";
import "@/styles/admin.css";

const Admin = () => {
  const [createUserInputValue, setCreateUserInputValue] = useState("");

  const [initialUsers, setInitialUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const [initialRounds, setInitialRounds] = useState([]);
  const [searchedRounds, setSearchedRounds] = useState([]);

  const getUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      getUsersQuery.refetch().then((res) => {
        setSearchedUsers(res.data);
      });
    },
  });

  const getRoundsQuery = useQuery({
    queryKey: ["rounds"],
    queryFn: getRounds,
  });

  const createRoundMutation = useMutation({
    mutationFn: createRound,
    onSuccess: () => {
      getRoundsQuery.refetch().then((res) => {
        setSearchedRounds(res.data);
      });
    },
  });

  useEffect(() => {
    if (getUsersQuery.isFetched) setInitialUsers(getUsersQuery.data);
    if (getRoundsQuery.isFetched) setInitialRounds(getRoundsQuery.data);
  }, [getUsersQuery, getRoundsQuery]);

  useEffect(() => {
    setSearchedUsers(initialUsers);
  }, [initialUsers]);

  useEffect(() => {
    setSearchedRounds(initialRounds);
  }, [initialRounds]);

  const handleChange = (event) => setCreateUserInputValue(event.target.value);
  const handleKeyDown = (event) => event.key === "Enter" && submit();

  const submit = () => {
    if (createUserInputValue.length === 0) return;
    createUserMutation.mutate(
      { name: createUserInputValue },
      {
        onSuccess: () => {
          getUsersQuery.refetch();
        },
      },
    );
    setCreateUserInputValue("");
  };

  if (!isLoggedIn.value) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1 className="adminTitle">Admin</h1>
      <div className="adminControls">
        <SearchBar
          type="BOTH"
          users={initialUsers}
          setUsers={setSearchedUsers}
          rounds={initialRounds}
          setRounds={setSearchedRounds}
        />
        <div className="createUserBox gradient-border">
          <input
            placeholder="Legg til ny bruker"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={createUserInputValue}
          />
          <img
            src="src/public/new-user.svg"
            className="createUserIcon"
            onClick={() => submit()}
          />
        </div>
        <div className="generateRoundBox gradient-border">
          <input
            type="button"
            value="Generer ny runde"
            onClick={() => createRoundMutation.mutate()}
          />
        </div>
      </div>
      <div className="adminContent">
        <div className="adminLeaderboard">
          {getUsersQuery.isLoading ||
          getUsersQuery.isError ||
          searchedUsers?.length === 0 ? (
            <StatusMessage query={getUsersQuery} />
          ) : (
            <AdminLeaderboard
              data={searchedUsers}
              initialData={initialUsers}
              hasStarted={initialRounds.length !== 0}
            />
          )}
        </div>
        <div className="verticalLine" />
        <div className="adminMatches">
          {getRoundsQuery.isLoading ||
          getRoundsQuery.isFetching ||
          getRoundsQuery.isError ||
          searchedRounds.length <= 0 ? (
            <StatusMessage query={getRoundsQuery} />
          ) : (
            <MatchesTable
              data={searchedRounds[searchedRounds.length - 1]}
              roundNr="NÅ"
              isAdmin={true}
            />
          )}
          <div className="historyMatches">
            <h2 className="historyTitle">Historikk</h2>
            {getRoundsQuery.isLoading ||
            getRoundsQuery.isFetching ||
            getRoundsQuery.isError ||
            searchedRounds.length <= 0 ? (
              <StatusMessage query={getRoundsQuery} />
            ) : (
              initialRounds
                .slice(0, -1)
                .reverse()
                .map((round) => (
                  <MatchesTable
                    data={searchedRounds.slice(0, -1)[round.order - 1]}
                    roundNr={round.order}
                    isAdmin={true}
                    key={round.order}
                  />
                ))
            )}
          </div>
        </div>
      </div>
      <div className="fade" />
    </>
  );
};

export default Admin;
