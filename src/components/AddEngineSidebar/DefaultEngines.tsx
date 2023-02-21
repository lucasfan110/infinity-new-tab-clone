import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addActiveEngineId,
    DefaultSearchEngine,
    DEFAULT_ENGINE_LIST,
    RootState,
} from "../../store";
import checkOverflow from "../../utils/checkOverflow";
import displayIcon from "../../utils/displayIcon";
import SidebarContainer from "./SidebarContainer";

interface EngineCardProps {
    engine: DefaultSearchEngine;
    onAdd?(engine: DefaultSearchEngine): void;
    isAdded: boolean;
}

function EngineCard({ engine, onAdd, isAdded }: EngineCardProps) {
    const [isDescOverflow, setIsDescOverflow] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!descriptionRef.current) {
            return;
        }

        setIsDescOverflow(checkOverflow(descriptionRef.current));
    }, []);

    return (
        <div className="bg-white my-4 w-full px-6 pb-2 rounded-lg">
            <div className="flex items-center mb-2">
                {displayIcon(
                    engine.icon,
                    "w-12 h-12 relative bottom-3 border rounded-full bg-white p-1"
                )}
                <div className="relative bottom-2 ml-1">{engine.name}</div>
            </div>
            <p
                className={classNames("text-sm text-gray-400", {
                    "line-clamp-2 max-h-[40px]": !showAll,
                })}
                ref={descriptionRef}
            >
                {engine.description}
            </p>
            {isDescOverflow && (
                <button
                    className="text-sm text-blue-500 hover:underline cursor-pointer"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Show less" : "Read more"}
                </button>
            )}
            <div className="flex justify-end mt-4">
                <button
                    className={classNames(
                        "border px-8 py-1 rounded-lg transition",
                        {
                            "hover:bg-gray-200": !isAdded,
                            "opacity-50": isAdded,
                        }
                    )}
                    disabled={isAdded}
                    onClick={() => onAdd?.(engine)}
                >
                    {isAdded ? "Added" : "Add"}
                </button>
            </div>
        </div>
    );
}

export default function DefaultEngines() {
    const dispatch = useDispatch();

    const activeEngineIds = useSelector(
        (state: RootState) => state.searchEngine.activeEngineIds
    );

    const handleAdd = (engine: DefaultSearchEngine) => {
        dispatch(addActiveEngineId(engine.id));
    };

    const renderedList = DEFAULT_ENGINE_LIST.map(engine => {
        const isAdded = activeEngineIds.includes(engine.id);

        return (
            <li key={engine.id}>
                <EngineCard
                    engine={engine}
                    onAdd={handleAdd}
                    isAdded={isAdded}
                />
            </li>
        );
    });

    return (
        <SidebarContainer>
            <ul>{renderedList}</ul>
        </SidebarContainer>
    );
}
