import { useEffect, useState } from "preact/hooks";
import { GetUsers, CreateUser } from "@/api/user";
import { GetRounds, CreateRound } from "@/api/round";
import { GetTableCount, SetTableCount } from "@/api/settings";
import AdminLeaderboard from "@/components/adminLeaderboard";
import MatchesTable from "@/components/matchesTable";
import SearchBar from "@/components/searchBar";
import StatusMessage from "@/components/statusMessage";

import "@/styles/app.css";
import "@/styles/admin.css";

const Admin = () => {
  const [createUserInputValue, setCreateUserInputValue] = useState('');
  const [tableCountValue, setTableCountValue] = useState(0);

  const [initialUsers, setInitialUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const [initialRounds, setInitialRounds] = useState([]);
  const [searchedRounds, setSearchedRounds] = useState([]);

  
  const getUsers = GetUsers();
  const createUser = CreateUser();
  const getRounds = GetRounds();
  const createRound = CreateRound();
  const getTableCount = GetTableCount();
  const setTableCount = SetTableCount();

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
  
  useEffect(() => {
    if (getTableCount.isFetched) setTableCountValue(getTableCount.data);
  }, [getTableCount])


  const handleChange = (event) => setCreateUserInputValue(event.target.value);
  const handleKeyDown = (event) => event.key === "Enter" && submit();

  const submit = () => {
    if (createUserInputValue.length === 0) return;
    createUser.mutate({
      name: createUserInputValue
    }, {
      onSuccess: () => {getUsers.refetch()}
    })
    setCreateUserInputValue('');
  }


  const generateRound = () => {
    createRound.mutate({},{
        onSuccess: () => {
          getRounds.refetch().then(res => {
            setSearchedRounds(res.data);
          })
        }
      });
  }

  const handleChangeTableCount = event => {
    setTableCountValue(event.target.value);
  }

  const handleKeyDownTableCount = event => {
    event.key === "Enter" && setTableCount.mutate({
      tableCount: event.target.value
    });

  };
  
  return (
    <>
      <h1 className="adminTitle">Admin</h1>
      <div className="adminControls">
        <SearchBar type="BOTH" users={initialUsers} setUsers={setSearchedUsers} rounds={initialRounds} setRounds={setSearchedRounds} />
        <div className="createUserBox gradient-border">
            <input placeholder="Legg til ny bruker" onChange={handleChange} onKeyDown={handleKeyDown} value={createUserInputValue} />
            <img src="@/public/new-user.svg" className="createUserIcon" onClick={() => submit()} />
        </div>
        <div className="numberOfTablesBox gradient-border">
          <h3>Antall bord:</h3>
          <input type="number" min={0} placeholder={tableCountValue.toString()} onChange={handleChangeTableCount} onKeyDown={handleKeyDownTableCount} />
        </div>
        <div className="generateRoundBox gradient-border">
          <input type="button" value="Generer ny runde" onClick={generateRound} />
        </div>
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
          {getRounds.isLoading || getRounds.isFetching || getRounds.isError || searchedRounds.length <= 0 ? 
            <StatusMessage query={getRounds} /> : (
            <MatchesTable data={searchedRounds[searchedRounds.length - 1]} roundNr="NÅ" isAdmin={true} getUsers={getUsers} />)
          }
          <div>
          <h2>Historikk</h2>
            {getRounds.isLoading || getRounds.isFetching || getRounds.isError || searchedRounds.length <= 0 ?
              <StatusMessage query={getRounds} /> : 
              initialRounds.slice(0, -1).reverse().map(round => (
                <MatchesTable data={searchedRounds.slice(0, -1)[round.order - 1]} roundNr={round.order} isAdmin={true} getUsers={getUsers} key={round.order} />
              ))}
          </div>
        </div>
      </div>
      {/* <Laser /> */}
      <div className="fade" />
    </>

  );
};


export default Admin;
