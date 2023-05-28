import classNames from "classnames";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
    icon: React.ReactNode;
    engineName: string;
    onSelect?(): void;
    showDelete?: boolean;
    onDelete?(): void;
}

export default function EngineItem({
    icon,
    engineName,
    onSelect,
    onDelete,
    showDelete = false,
}: Props) {
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
