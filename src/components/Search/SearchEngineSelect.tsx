import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SearchEngine } from "../../types";
import displayIcon from "../../utils/displayIcon";
import "./SearchEngineSelect.scss";

interface Props {
    show?: boolean;
    onClose?(): void;
    onSelect?(engine: SearchEngine): void;
}

export default function SearchEngineSelect({
    show = true,
    onClose,
    onSelect,
}: Props) {
    const engineList = useSelector(
        (state: RootState) => state.searchEngine.engineList
    );
    const [backgroundColor, setBackgroundColor] = useState("");

    useEffect(() => {
        if (!show) {
            return;
        }

        setTimeout(() => {
            setBackgroundColor("rgba(0, 0, 0, 0.5)");
        }, 20);
    }, [show]);

    if (!show) {
        return null;
    }

    const handleEngineSelect = (engine: SearchEngine) => {
        onSelect?.(engine);
    };

    const renderedEngineList = engineList.map(engine => {
        const icon = displayIcon(engine.icon, ["engine-icon"]);

        return (
            <li key={engine.id} onClick={() => handleEngineSelect(engine)}>
                <div className="select">
                    <div className="engine-icon-wrapper">{icon}</div>
                    <div className="icon-name">{engine.name}</div>
                </div>
            </li>
        );
    });

    return (
        <>
            <div className="search-engine-select">
                <ul>{renderedEngineList}</ul>
            </div>
            <div
                className="overlay"
                style={{ backgroundColor }}
                onClick={onClose}
            />
        </>
    );
}
