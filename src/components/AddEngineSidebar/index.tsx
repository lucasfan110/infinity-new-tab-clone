import classNames from "classnames";
import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Heading from "../Heading";
import CustomizeEngine from "./CustomizeEngine";
import DefaultEngines from "./DefaultEngines";
import Nav from "./Nav";

const PAGES = {
    Default: <DefaultEngines />,
    Customize: <CustomizeEngine />,
};

interface Props {
    show?: boolean;
    onClose?(): void;
}

export default function AddEngineSidebar({ show = true, onClose }: Props) {
    const sidebarRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {show && (
                <div className="absolute inset-0 z-20" onClick={onClose} />
            )}
            <div
                className={classNames(
                    "absolute right-0 inset-y-0 bg-white z-20 transition-all",
                    {
                        "w-[50vw]": show,
                        "w-0": !show,
                    }
                )}
                ref={sidebarRef}
            >
                {show && (
                    <button
                        className="bg-none text-white font-lg border-none cursor-pointer w-10 h-10 absolute right-[50vw] hover:bg-gray-500 transition"
                        onClick={onClose}
                    >
                        <div className="flex items-center justify-center">
                            <FaTimes />
                        </div>
                    </button>
                )}

                <Heading size={3} className="m-6">
                    Add Search Engine
                </Heading>
                <Nav pages={PAGES} />
            </div>
        </>
    );
}
