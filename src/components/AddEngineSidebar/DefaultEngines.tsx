import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
    addActiveEngineId,
    DefaultSearchEngine,
    DEFAULT_ENGINE_LIST,
} from "../../store";
import Heading from "../Heading";

interface EngineCardProps {
    engine: DefaultSearchEngine;
    onAdd?(engine: DefaultSearchEngine): void;
}

function EngineCard({ engine, onAdd }: EngineCardProps) {
    return (
        <div className="bg-white my-4 w-full px-6 py-2 rounded-lg">
            <Heading size={6} className="ml-16 mb-4">
                {engine.name}
            </Heading>
            <p className="text-sm text-gray-400">{engine.description}</p>
            <div className="flex justify-end mt-4">
                <button
                    className={classNames(
                        "border px-8 py-1 rounded-lg transition",
                        "hover:bg-gray-200"
                    )}
                    onClick={() => onAdd?.(engine)}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default function DefaultEngines() {
    const dispatch = useDispatch();

    const handleAdd = (engine: DefaultSearchEngine) => {
        dispatch(addActiveEngineId(engine.id));
    };

    const renderedList = DEFAULT_ENGINE_LIST.map(engine => {
        return (
            <li key={engine.id}>
                <EngineCard engine={engine} onAdd={handleAdd} />
            </li>
        );
    });

    return (
        <div className="bg-gray-100 border">
            <ul className="px-8">{renderedList}</ul>
        </div>
    );
}
