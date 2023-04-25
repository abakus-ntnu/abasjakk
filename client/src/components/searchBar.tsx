import { StateUpdater } from "preact/hooks";
import "./searchBox.css";

type Props = {
    data: Array<object>
    setSearchedData: StateUpdater<object>
}

const SearchBar = ({ data, setSearchedData }:Props) => {
    const onInput = e => {
        const search = e.target.value.toString().replace(/ /g, '').toLowerCase();
        setSearchedData(data.filter(item => {
        if (search.length > 0) {
            return Object.values(item).some(value => value.toString().toLowerCase().startsWith(search));
        } 
        return true;
    }));
}
    return (
        <div className="searchBox">
            <img src="src/public/search.png" />
            <input type="text" className="search" onInput={onInput} />
        </div>
    );
}



/*
Template for using searchBar
    import { useState } from 'preact/hooks';

    const [searchedData, setSearchedData = useState(initialData)];

    return (
        <SearchBar data={initialData} setSearchedData={setSearchedData} />

        <ComponentDisplayingTheData data={searchedData} />
    );
*/

export default SearchBar;