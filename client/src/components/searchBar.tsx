import { StateUpdater } from "preact/hooks";
import "src/styles/searchBar.css";

type Props = {
    data: Array<object>,
    additionalData?: Array<object>,
    setSearchedData: StateUpdater<object>,
    setAdditionalSearchedData?: StateUpdater<object>
}

const SearchBar = ({ data, additionalData, setSearchedData, setAdditionalSearchedData }:Props) => {
    const onInput = e => {
        const search = e.target.value.toString().replace(/ /g, '').toLowerCase();
        setSearchedData(data.filter(item => {
            if (search.length > 0) {
                return Object.values(item).some(value => value.toString().toLowerCase().startsWith(search));
            } 
            return true;
        }));
        if (setAdditionalSearchedData) {
            setAdditionalSearchedData(additionalData.filter(item => {
                if (search.length > 0) {
                    return Object.values(item).some(value => value.toString().toLowerCase().startsWith(search));
                } 
                return true;
            }));
        }
    }
    return (
        <div className="searchBox">
            <img src="src/public/search.svg" />
            <input type="text" className="search" onInput={onInput} />
        </div>
    );
}

export default SearchBar;