import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import useAutoComplete from "../../hooks/useAutocomplete";
import { RootState } from "../../store";
import "./SearchInput.scss";

interface Props {
    currentSearchUrl: string;
}

export default function SearchInput({ currentSearchUrl }: Props) {
    const { activeEngine: engine } = useSelector(
        (state: RootState) => state.searchEngine
    );

    const [query, setQuery] = useState("");
    useAutoComplete(query);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!query) {
            return;
        }

        const url = currentSearchUrl.replace("%s", query);
        window.open(url, "_black")?.focus();
    };

    let icon;
    switch (engine.icon.type) {
        case "basic":
            icon = <div>{engine.icon.bgText}</div>;
            break;
        case "img":
            icon = (
                <img
                    src={engine.icon.url}
                    alt="search engine icon"
                    className="search-engine-icon"
                />
            );
            break;
    }

    return (
        <form
            className="search-input-form"
            action="https://www.google.com/search"
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div className="icon-container">{icon}</div>

            <input
                placeholder="Enter search"
                className="search-input"
                name="q"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button className="search-button">
                <FaSearch className="search-icon" />
            </button>
        </form>
    );
}
