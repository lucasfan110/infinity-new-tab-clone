import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getActiveEngines, RootState } from "../../store";
import { SearchEngine } from "../../types";
import displayIcon from "../../utils/displayIcon";

interface EngineItemProps {
    icon: React.ReactNode;
    engineName: string;
}

function EngineItem({ icon, engineName }: EngineItemProps) {
    return (
        <div className="w-24 h-24 border-r border-gray-200 flex-col cursor-pointer transition hover:bg-gray-200">
            <div className="w-full flex justify-center">{icon}</div>
            <div className="text-sm text-center overflow-hidden whitespace-nowrap text-ellipsis padding-2.5">
                {engineName}
            </div>
        </div>
    );
}

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
            setBackgroundColor("rgba(0, 0, 0, 0)");
            return;
        }

        setTimeout(() => {
            setBackgroundColor("rgba(0, 0, 0, 0.5)");
        }, 50);
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
        const icon = displayIcon(engine.icon, "w-12 h-12 mt-4");

        return (
            <li
                key={engine.id}
                onClick={() => handleEngineSelect(engine)}
                className="select-none"
            >
                <EngineItem icon={icon} engineName={engine.name} />
            </li>
        );
    });

    return (
        <>
            <div className="bg-white z-10 absolute p-0">
                <ul className="flex">
                    {renderedEngineList}
                    <li onClick={handleAddEngine} className="select-none">
                        <EngineItem
                            icon={
                                <img
                                    src="./plus-sign.png"
                                    alt="add"
                                    className="h-12 w-12 mt-4"
                                />
                            }
                            engineName="Add"
                        />
                    </li>
                </ul>
            </div>
            <div
                className="absolute inset-0 transition duration-500"
                style={{ backgroundColor }}
                onClick={onClose}
            />
        </>
    );
}
