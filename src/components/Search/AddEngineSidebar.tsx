import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./AddEngineSidebar.scss";

interface Props {
    show?: boolean;
    onClose?(): void;
}

export default function AddEngineSidebar({ show = true, onClose }: Props) {
    const [width, setWidth] = useState("0vw");
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setWidth(show ? "50vw" : "0vw");
        }, 20);
    }, [show]);

    return (
        <>
            {show && <div className="mask" onClick={onClose} />}
            <div
                className="add-engine-sidebar"
                style={{ width }}
                ref={sidebarRef}
            >
                {show && (
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                )}
            </div>
        </>
    );
}
