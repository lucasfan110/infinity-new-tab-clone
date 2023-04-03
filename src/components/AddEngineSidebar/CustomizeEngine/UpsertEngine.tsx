import { useState } from "react";
import { FaPlus, FaRegQuestionCircle } from "react-icons/fa";
import { CustomizedSearchEngine } from "../../../store";
import DisplayIcon from "../../../utils/DisplayIcon";
import Input from "../../Forms/Input";
import TextArea from "../../Forms/TextArea";
import CustomEngineHowTo from "./CustomEngineHowTo";
import SolidIconCreator, {
    COLORS,
    DEFAULT_TEXT_SIZE,
} from "./SolidIconCreator";

interface Props {
    defaultEngine?: CustomizedSearchEngine;
    onSubmit?(): void;
}

export default function UpsertEngine({ defaultEngine, onSubmit }: Props) {
    const [showHowTo, setShowHowTo] = useState(false);

    const [engineName, setEngineName] = useState("");
    const substringLength = engineName.length === 3 ? 3 : 2;
    const iconNameFromEngineName = engineName.substring(0, substringLength);

    const [iconColor, setIconColor] = useState(COLORS[0]);
    const [iconTextSize, setIconTextSize] = useState(DEFAULT_TEXT_SIZE);
    const [iconName, setIconName] = useState<string | null>(null);

    const handleSubmit = () => {
        onSubmit?.();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white px-5 py-6 mt-6">
                <label htmlFor="engine-name">Search Engine</label>
                <Input
                    id="engine-name"
                    name="engine-name"
                    placeholder="Name"
                    value={engineName}
                    onChange={e => setEngineName(e.target.value)}
                />

                <label htmlFor="url" className="flex items-center">
                    Url (use %s to replace search word)
                    <button
                        className="w-4 h-4 ml-2"
                        type="button"
                        onClick={() => setShowHowTo(true)}
                    >
                        <FaRegQuestionCircle className="text-gray-300 w-full h-full" />
                    </button>
                </label>
                <TextArea id="url" name="url" placeholder="URL" />

                <label htmlFor="select-icon">Select Icon</label>

                <div className="flex items-center mb-8">
                    <div className="w-16 h-16 my-2 shadow-2xl">
                        <DisplayIcon
                            icon={{
                                type: "basic",
                                bgColor: iconColor,
                                bgText: iconName ?? iconNameFromEngineName,
                                bgTextSize: iconTextSize,
                            }}
                            className="w-full h-full"
                        />
                        <p className="text-xs">Solid color icon</p>
                    </div>

                    <div className="border h-16 w-0 ml-4" />

                    <button className="w-16 h-16 ml-4" type="button">
                        <div className="border border-dashed w-full h-full rounded border-2 flex items-center justify-center cursor-pointer">
                            <FaPlus className="w-1/2 h-1/2 text-gray-300" />
                        </div>

                        <p className="text-xs text-center">Local icon</p>
                    </button>
                </div>

                <SolidIconCreator
                    color={iconColor}
                    onColorChange={setIconColor}
                    textSize={iconTextSize}
                    onTextSizeChange={setIconTextSize}
                    iconText={iconName ?? ""}
                    onIconTextChange={setIconName}
                />
            </form>

            <CustomEngineHowTo
                show={showHowTo}
                onClose={() => setShowHowTo(false)}
            />
        </>
    );
}
