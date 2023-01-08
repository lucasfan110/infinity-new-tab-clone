import { useState } from "react";
import { useSelector } from "react-redux";
import useAutoComplete from "../../hooks/useAutocomplete";
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
    const [query, setQuery] = useState("");
    useAutoComplete(query);

    const search = (query: string) => {
        if (!query) {
            return;
        }

        const url = currentSearchUrl.replace("%s", query);
        window.open(url, "_black")?.focus();
        setQuery("");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        search(query);
    };

    return (
        <div className="search">
            <div className="search-box">
                <SearchNav
                    setCurrentSearchUrl={setCurrentSearchUrl}
                    searchUrls={searchUrls}
                />
                <SearchInput
                    query={query}
                    setQuery={setQuery}
                    onSubmit={handleSubmit}
                />
                <Autocomplete search={search} />
            </div>
        </div>
    );
}
