import { useEffect, useState } from "preact/hooks";
import { GetRounds } from "src/api/round";
import { CreateUser, GetUsers } from "src/api/user";
import AdminLeaderboard from "src/components/adminLeaderboard";
import Laser from "src/components/laser";
import MatchesTable from "src/components/matchesTable";
import SearchBar from "src/components/searchBar";
import StatusMessage from "src/components/statusMessage";

import "src/styles/admin.css";

const Admin = () => {
  const [createUserInputValue, setCreateUserInputValue] = useState("");

  const [initialUsers, setInitialUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const [initialRounds, setInitialRounds] = useState([]);
  const [searchedRounds, setSearchedRounds] = useState([]);
  
  const getUsers = GetUsers();
  const createUser = CreateUser();
  const getRounds = GetRounds();

  useEffect(() => {
    if (getUsers.isFetched) setInitialUsers(getUsers.data);
    if (getRounds.isFetched) setInitialRounds(getRounds.data);
  }, [getUsers, getRounds]);
  
  useEffect(() => {
    setSearchedUsers(initialUsers);
  }, [initialUsers])
  
  useEffect(() => {
    setSearchedRounds(initialRounds);
  }, [initialRounds]);


  const onSubmit = (e) => {
    if (e.key === "Enter") {
      createUser.mutate({
        name: e.target.value
      }, {
        onSuccess: () => {getUsers.refetch()}
      });
    }
  }
  
  return (
    <>
      <h1 className="adminTitle">Admin</h1>
      <div className="adminControls">
        <SearchBar type="BOTH" users={initialUsers} setUsers={setSearchedUsers} rounds={initialRounds} setRounds={setSearchedRounds} />
        <div className="createUserBox">
            <input placeholder="Legg til ny bruker" onKeyDown={onSubmit} />
            <img src="src/public/new-user.svg" className="createUserIcon" />
        </div>
        <div className="numberOfTablesBox">
          <h3>Antall bord:</h3>
          <input type="number" value={10} min={0} placeholder="0" />
        </div>
        <input type="button" value="Generer ny runde" />
      </div>
      <div className="adminContent">
        <div className="adminLeaderboard">
          {getUsers.isLoading || getUsers.isError || searchedUsers.length == 0 ? 
            <StatusMessage query={getUsers} /> : 
            <AdminLeaderboard data={searchedUsers} initialData={initialUsers} getUsersQuery={getUsers} />
          }
        </div>
        <div className="verticalLine" />
        <div className="adminMatches">
          {getRounds.isLoading || getRounds.isError || searchedRounds.length <= 0 ? 
            <StatusMessage query={getRounds} /> : (
            <MatchesTable data={searchedRounds[searchedRounds.length - 1]} isAdmin={true} roundNr="NÅ" />)
          }
          <div>
            {getRounds.isLoading || getRounds.isError || searchedRounds.length <= 0 ?
              <StatusMessage query={getRounds} /> : 
              initialRounds.slice(0, -1).reverse().map((_round, index) => (
                <MatchesTable data={searchedRounds[index]} isAdmin={true} roundNr={index + 1} key={index} />
              ))}
          </div>
        </div>
      </div>
      <Laser />
      <div className="fade" />
    </>

  );
};


export default Admin;
