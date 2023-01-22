import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./index.scss";
import Nav from "./Nav";

const PAGES = {
    Default: <div>Default</div>,
    Customize: <div>Customize</div>,
};

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
            {show && (
                <div
                    className="add-engine-sidebar"
                    style={{ width }}
                    ref={sidebarRef}
                >
                    {show && (
                        <button className="close-button" onClick={onClose}>
                            <div className="icon">
                                <FaTimes />
                            </div>
                        </button>
                    )}

                    <h1>Add Search Engine</h1>
                    <Nav pages={PAGES} />
                </div>
            )}
        </>
    );
}
