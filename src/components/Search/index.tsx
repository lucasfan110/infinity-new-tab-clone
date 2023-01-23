import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAutoComplete from "../../hooks/useAutocomplete";
import { RootState, setActiveEngine } from "../../store";
import { SearchEngine } from "../../types";
import AddEngineSidebar from "../AddEngineSidebar";
import Autocomplete from "./Autocomplete";
import SearchEngineSelect from "./SearchEngineSelect";
import SearchInput from "./SearchInput";
import SearchNav from "./SearchNav";

export default function Search() {
    const {
        currentEngine: { searchUrl },
    } = useSelector((state: RootState) => state.searchEngine);
    const dispatch = useDispatch();

    const searchUrls = typeof searchUrl === "string" ? {} : searchUrl;

    const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
    const currentSearchUrl =
        typeof searchUrl === "string"
            ? searchUrl
            : Object.values(searchUrl)[currentUrlIndex];
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        setCurrentUrlIndex(0);
    }, [searchUrl]);

    const [query, setQuery] = useState("");
    const [showEngineSwitch, setShowEngineSwitch] = useState(false);
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

    const handleEngineSelect = (engine: SearchEngine) => {
        dispatch(setActiveEngine(engine));
        setShowEngineSwitch(false);
    };

    return (
        <div className="flex justify-center pt-[15vh] items-end">
            <div className="w-1/2 max-w-2xl min-w-[450px]">
                <SearchNav
                    setCurrentUrlIndex={setCurrentUrlIndex}
                    searchUrls={searchUrls}
                    currentUrlIndex={currentUrlIndex}
                />
                <SearchInput
                    query={query}
                    setQuery={setQuery}
                    onSubmit={handleSubmit}
                    setShowEngineSwitch={setShowEngineSwitch}
                />

                <SearchEngineSelect
                    show={showEngineSwitch}
                    onClose={() => setShowEngineSwitch(false)}
                    onSelect={handleEngineSelect}
                    onAdd={() => setShowSidebar(true)}
                />
                <Autocomplete search={search} />

                <AddEngineSidebar
                    show={showSidebar}
                    onClose={() => setShowSidebar(false)}
                />
            </div>
        </div>
    );
}
