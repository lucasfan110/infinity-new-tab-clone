import classNames from "classnames";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
    BaseSearchEngine,
    DEFAULT_ENGINE_LIST,
    getActiveEngines,
    RootState,
} from "../../store";
import displayIcon from "../../utils/displayIcon";
import Mask from "../Mask";

interface EngineItemProps {
    icon: React.ReactNode;
    engineName: string;
    onSelect?(): void;
    showDelete?: boolean;
    onDelete?(): void;
}

function EngineItem({
    icon,
    engineName,
    onSelect,
    onDelete,
    showDelete = false,
}: EngineItemProps) {
    const onButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onDelete?.();
    };

    return (
        <div
            className="w-24 h-24 border-r border-gray-200 flex-col cursor-pointer transition hover:bg-gray-200 relative group select-none"
            title={engineName}
            onClick={onSelect}
        >
            {showDelete && (
                <button
                    className={classNames(
                        "invisible absolute top-0 right-0 pb-3 pl-3 pt-1 pr-1 transition rounded-bl-full ",
                        "group-hover:visible group-hover:bg-gray-300"
                    )}
                    onClick={onButtonClick}
                >
                    <FaTrashAlt className="text-gray-500 w-4 h-4" />
                </button>
            )}
            <div className="w-full flex justify-center">{icon}</div>
            <div className="text-sm text-center overflow-hidden whitespace-nowrap text-ellipsis px-2.5">
                {engineName}
            </div>
        </div>
    );
}

interface Props {
    show?: boolean;
    onClose?(): void;
    onEngineSelect?(engine: BaseSearchEngine): void;
    onEngineDelete?(engine: BaseSearchEngine): void;
    onEngineAdd?(): void;
}

export default function SearchEngineSelect({
    show = true,
    onClose,
    onEngineAdd,
    onEngineSelect,
    onEngineDelete,
}: Props) {
    const activeEnginesList = useSelector(
        ({
            searchEngine: { customizedEngines, activeEngineIds },
        }: RootState) => {
            return getActiveEngines(
                [...DEFAULT_ENGINE_LIST, ...customizedEngines],
                activeEngineIds
            );
        }
    );

    if (!show) {
        return null;
    }

    const renderedEngineList = activeEnginesList.map(engine => {
        const icon = displayIcon(engine.icon, "w-12 h-12 mt-4");
        const showDelete = activeEnginesList.length > 1;

        return (
            <li key={engine.id}>
                <EngineItem
                    icon={icon}
                    engineName={engine.name}
                    showDelete={showDelete}
                    onSelect={() => onEngineSelect?.(engine)}
                    onDelete={() => onEngineDelete?.(engine)}
                />
            </li>
        );
    });

    return (
        <>
            <Mask show={show} onClick={onClose} />
            <div className="bg-white absolute p-0">
                <ul className="flex">
                    {renderedEngineList}
                    <li key="add">
                        <EngineItem
                            icon={
                                <img
                                    src="/images/icons/plus-sign.png"
                                    alt="add"
                                    className="h-12 w-12 mt-4"
                                />
                            }
                            engineName="Add"
                            onSelect={onEngineAdd}
                        />
                    </li>
                </ul>
            </div>
        </>
    );
}
