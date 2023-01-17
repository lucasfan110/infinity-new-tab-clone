import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getActiveEngines, RootState } from "../../store";
import { SearchEngine } from "../../types";
import displayIcon from "../../utils/displayIcon";
import "./SearchEngineSelect.scss";

interface Props {
    show?: boolean;
    onClose?(): void;
    onSelect?(engine: SearchEngine): void;
    onAdd?(): void;
}

export default function SearchEngineSelect({
    show = true,
    onClose,
    onSelect,
    onAdd,
}: Props) {
    const activeEnginesList = useSelector(
        ({ searchEngine: { engineList, activeEngineIds } }: RootState) => {
            return getActiveEngines(engineList, activeEngineIds);
        }
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

    const handleAddEngine = () => {
        onAdd?.();
    };

    const renderedEngineList = activeEnginesList.map(engine => {
        const icon = displayIcon(engine.icon, ["engine-icon"]);

        return (
            <li
                key={engine.id}
                onClick={() => handleEngineSelect(engine)}
                className="no-select"
            >
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
                <ul>
                    {renderedEngineList}
                    <li onClick={handleAddEngine} className="no-select">
                        <div className="select">
                            <div className="engine-icon-wrapper">
                                <img
                                    src="./plus-sign.png"
                                    alt="add"
                                    className="engine-icon"
                                />
                            </div>
                            <div className="icon-name">Add</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div
                className="overlay"
                style={{ backgroundColor }}
                onClick={onClose}
            />
        </>
    );
}
