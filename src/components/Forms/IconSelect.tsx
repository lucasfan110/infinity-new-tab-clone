import { FaPlus } from "react-icons/fa";
import { Icon, newChangedIconType } from "../../store";
import DisplayIcon from "../../utils/DisplayIcon";
import SolidIconCreator from "../AddEngineSidebar/CustomizeEngine/SolidIconCreator";
import UrlIconCreator from "../AddEngineSidebar/CustomizeEngine/UrlIconCreator";
import { FaXmark } from "react-icons/fa6";

interface Props {
    icon: Icon;
    setIcon: (icon: Icon) => void;
    onIconTextChange?: () => void;
}

export default function IconSelect({ icon, setIcon, onIconTextChange }: Props) {
    const solidIconDisplay = () => {
        return (
            <DisplayIcon
                icon={newChangedIconType("basic", icon)}
                className="w-full h-full"
            />
        );
    };

    const handleSolidIconClick = () => {
        setIcon({ ...icon, type: "basic" });
    };

    const handleLocalIconClick = () => {
        setIcon({ ...icon, type: "img" });
    };

    const displayIconCreator = () => {
        if (icon.type === "basic") {
            return (
                <SolidIconCreator
                    icon={icon.basicIcon}
                    onIconChange={basicIcon => setIcon({ ...icon, basicIcon })}
                    onIconTextChange={onIconTextChange}
                />
            );
        } else {
            return (
                <UrlIconCreator
                    urlLink={icon.urlIcon?.url}
                    onUrlLinkChange={url =>
                        setIcon({ ...icon, urlIcon: { url } })
                    }
                />
            );
        }
    };

    const handleUrlIconDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

    const urlIconDisplay = () => {
        if (icon.urlIcon === null) {
            return (
                <div className="border border-dashed w-full h-full rounded-lg border-2 flex items-center justify-center cursor-pointer">
                    <FaPlus className="w-1/2 h-1/2 text-gray-300" />
                </div>
            );
        } else {
            return (
                <div className="group relative w-full h-full">
                    <button
                        className="absolute top-[-5px] right-[-5px] bg-gray-700 rounded-full"
                        type="button"
                        onClick={handleUrlIconDelete}
                    >
                        <FaXmark className="text-white" />
                    </button>
                    <DisplayIcon
                        icon={newChangedIconType("img", icon)}
                        className="w-full h-full object-center object-cover rounded-lg"
                    />
                </div>
            );
        }
    };

    return (
        <>
            <label htmlFor="select-icon">Select Icon</label>

            <div className="flex items-center mb-8">
                <div
                    className="w-14 h-14 my-2 shadow-2xl cursor-pointer"
                    onClick={handleSolidIconClick}
                >
                    {solidIconDisplay()}
                    <p className="text-xs">Solid color icon</p>
                </div>

                <div className="border h-16 w-0 ml-4" />

                <div
                    className="w-14 h-14 ml-4 cursor-pointer"
                    onClick={handleLocalIconClick}
                >
                    {urlIconDisplay()}
                    <p className="text-xs text-center">Url icon</p>
                </div>
            </div>

            {displayIconCreator()}
        </>
    );
}
