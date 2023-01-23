import { FaCaretDown, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import displayIcon from "../../utils/displayIcon";

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

    const icon = displayIcon(engine.icon, "inline-block w-9 h-9 mx-1");

    const handleIconSwitch = () => {
        setShowEngineSwitch(true);
    };

    return (
        <form
            className="flex rounded-lg w-full h-14 items-center bg-white"
            action="https://www.google.com/search"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <div
                className="h-14 basis-14 flex justify-center items-center cursor-pointer hover:bg-slate-200 hover:rounded-l-lg select-none"
                onClick={handleIconSwitch}
            >
                {icon}
                <FaCaretDown className="mr-1" />
            </div>

            <input
                placeholder="Enter search"
                className="ml-1.5 outline-none h-full grow border-none bg-transparent text-lg font-default"
                name="q"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button className="min-w-[56px] h-full bg-black cursor-pointer justify-self-end rounded-r-lg flex justify-center items-center">
                <FaSearch className="w-5 h-5 text-white" />
            </button>
        </form>
    );
}
