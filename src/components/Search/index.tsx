import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Autocomplete from "./Autocomplete";
import "./index.scss";
import SearchInput from "./SearchInput";
import SearchNav from "./SearchNav";

export default function Search() {
    const {
        activeEngine: { searchUrl },
    } = useSelector((state: RootState) => state.searchEngine);

    const searchUrls = typeof searchUrl === "string" ? {} : searchUrl;

    const [currentSearchUrl, setCurrentSearchUrl] = useState(
        typeof searchUrl === "string" ? searchUrl : Object.values(searchUrl)[0]
    );

    return (
        <div className="search">
            <div className="search-box">
                <SearchNav
                    setCurrentSearchUrl={setCurrentSearchUrl}
                    searchUrls={searchUrls}
                />
                <SearchInput currentSearchUrl={currentSearchUrl} />
                <Autocomplete />
            </div>
        </div>
    );
}
