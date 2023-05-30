import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CustomizedSearchEngine } from "../../../store";
import DisplayIcon from "../../../utils/DisplayIcon";
import Heading from "../../Heading";
import ContextMenu from "../ContextMenu";
import ContextMenuItem from "../ContextMenuItem";

interface Props {
    engine: CustomizedSearchEngine;
    isAdded: boolean;
    onAdd?(engine: CustomizedSearchEngine): void;
    onEdit?(engine: CustomizedSearchEngine): void;
    onDelete?(engine: CustomizedSearchEngine): void;
}

export default function CustomEngineCard({
    engine,
    onAdd,
    onEdit,
    onDelete,
    isAdded,
}: Props) {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const ctxMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (!buttonRef.current || !ctxMenuRef.current) {
                return;
            }

            if (
                buttonRef.current.contains(event.target as Node) ||
                ctxMenuRef.current.contains(event.target as Node)
            ) {
                return;
            }

            setShowContextMenu(false);
        };

        document.body.addEventListener("click", onClick, true);

        return () => {
            document.body.removeEventListener("click", onClick, true);
        };
    }, []);

    const hideContextMenu = () => {
        setShowContextMenu(false);
    };

    const handleAdd = () => {
        if (isAdded) {
            return;
        }

        onAdd?.(engine);
    };

    return (
        <div className="flex bg-white h-24 items-center rounded group no-select">
            <DisplayIcon
                icon={engine.icon}
                className="w-16 h-16 ml-4 shrink-0"
            />

            <div className="ml-4 w-48">
                <Heading size={6}>{engine.name}</Heading>
                <p className="text-gray-400 text-xs truncate">
                    {engine.searchUrl}
                </p>
            </div>

            <div className="mr-4 flex justify-end">
                <button
                    className={classNames(
                        "w-8 h-8 opacity-0 transition p-1 box-border cursor-pointer rounded duration-300",
                        {
                            "opacity-0": !showContextMenu,
                            "opacity-60": showContextMenu,
                        },
                        "flex items-center align-center",
                        "hover:bg-gray-200 group-hover:opacity-60"
                    )}
                    onClick={() => setShowContextMenu(!showContextMenu)}
                    ref={buttonRef}
                >
                    <BsThreeDotsVertical className="w-full h-full" />
                </button>

                <ContextMenu
                    show={showContextMenu}
                    ref={ctxMenuRef}
                    onClick={hideContextMenu}
                >
                    <ContextMenuItem
                        onClick={handleAdd}
                        className={classNames({
                            "text-gray-300 cursor-default": isAdded,
                        })}
                    >
                        {isAdded ? "Added" : "Add"}
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => onEdit?.(engine)}>
                        Edit
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => onDelete?.(engine)}>
                        Delete
                    </ContextMenuItem>
                </ContextMenu>
            </div>
        </div>
    );
}
