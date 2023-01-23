import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
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
            {show && (
                <>
                    <div className="absolute inset-0 z-20" onClick={onClose} />

                    <div
                        className="absolute right-0 inset-y-0 bg-white z-20 transition-all"
                        style={{ width }}
                        ref={sidebarRef}
                    >
                        <button
                            className="bg-none text-white font-lg border-none cursor-pointer w-10 h-10 absolute right-[50vw] hover:bg-gray-500 transition"
                            onClick={onClose}
                        >
                            <div className="flex items-center justify-center">
                                <FaTimes />
                            </div>
                        </button>

                        <h1>Add Search Engine</h1>
                        <Nav pages={PAGES} />
                    </div>
                </>
            )}
        </>
    );
}
