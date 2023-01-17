import { FaCaretDown, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import displayIcon from "../../utils/displayIcon";
import "./SearchInput.scss";

interface Props {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
    setShowEngineSwitch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchInput({
    query,
    setQuery,
    onSubmit,
    setShowEngineSwitch,
}: Props) {
    const { currentEngine: engine } = useSelector(
        (state: RootState) => state.searchEngine
    );

    const icon = displayIcon(engine.icon, ["search-engine-icon"]);

    const handleIconSwitch = () => {
        setShowEngineSwitch(true);
    };

    return (
        <form
            className="search-input-form"
            action="https://www.google.com/search"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <div className="icon-container" onClick={handleIconSwitch}>
                {icon}
                <FaCaretDown className="caret-down" />
            </div>

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
