import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./SearchInput.scss";

interface Props {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

export default function SearchInput({ query, setQuery, onSubmit }: Props) {
    const { activeEngine: engine } = useSelector(
        (state: RootState) => state.searchEngine
    );

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
            onSubmit={onSubmit}
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
