import { SearchBarProps, User, Round } from "src/types";

import "src/styles/searchBar.css";

const SearchBar = ({ users, setUsers, rounds, setRounds, type }:SearchBarProps) => {
    
    const onInput = event => {
        const search = event.target.value.toString().trim().toLowerCase();

        if (type === "USER" || type === "BOTH")
            setUsers(searchUsers(users, search));
        if (type === "ROUND" || type === "BOTH")
            setRounds(searchRounds(rounds, search)); 
    }

    return (
        <div className="searchBox gradient-border">
            <img src="src/public/search.svg" />
            <input type="text" className="search" onInput={onInput} />
        </div>
    );
}

const searchUsers = (data:User[], search:string) => (search.length > 0) ? data.filter(item => item.name.toLowerCase().startsWith(search)) : data;

const searchRounds = (data:Round[], search:string) => (search.length > 0) ? data.map(round => ({
    ...round,
    matches: round.matches.filter(match => Object.values(match).some(value => {
            if (typeof value !== "string" && typeof value !== "number") 
                return value.name.toLowerCase().startsWith(search);
    }))
})) : data;

export default SearchBar;