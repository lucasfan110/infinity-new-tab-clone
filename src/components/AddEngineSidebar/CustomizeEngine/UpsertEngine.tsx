import { useState } from "react";
import { FaPlus, FaRegQuestionCircle } from "react-icons/fa";
import { CustomizedSearchEngine } from "../../../store";
import DisplayIcon from "../../../utils/DisplayIcon";
import Input from "../../Forms/Input";
import Range from "../../Forms/Range";
import TextArea from "../../Forms/TextArea";
import CustomEngineHowTo from "./CustomEngineHowTo";
import TextBubble from "./TextBubble";

const COLORS = [
    "rgb(255 71 52)",
    "rgb(255 122 9)",
    "rgb(255 207 12)",
    "rgb(42 233 121)",
    "rgb(44 213 223)",
    "rgb(0 116 255)",
    "rgb(109 9 255)",
    "rgb(255 36 160)",
];

interface Props {
    defaultEngine?: CustomizedSearchEngine;
    onSubmit?(): void;
}

export default function UpsertEngine({ defaultEngine, onSubmit }: Props) {
    const handleSubmit = () => {
        onSubmit?.();
    };

    const [showHowTo, setShowHowTo] = useState(false);
    const [engineName, setEngineName] = useState("");
    const substringLength = engineName.length === 3 ? 3 : 2;

    const renderedColorPickers = COLORS.map(c => (
        <DisplayIcon
            icon={{ bgColor: c, bgText: "", bgTextSize: 0, type: "basic" }}
            className="w-5 h-5 cursor-pointer mr-2"
        />
    ));

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white px-4 py-2 mt-6">
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
                                bgColor: "red",
                                bgText: engineName.substring(
                                    0,
                                    substringLength
                                ),
                                bgTextSize: 16,
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

                <TextBubble>
                    <label htmlFor="display-name" className="mb-2">
                        Icon Text
                    </label>
                    <Input placeholder="Display name" id="display-name" />

                    <label htmlFor="text-size" className="mb-2">
                        Text Size
                    </label>
                    <Range
                        min={14}
                        max={74}
                        defaultValue={30}
                        className="w-full my-2"
                        id="text-size"
                    />

                    <label>Color</label>
                    <div className="mt-2 flex">{renderedColorPickers}</div>
                </TextBubble>
            </form>

            <CustomEngineHowTo
                show={showHowTo}
                onClose={() => setShowHowTo(false)}
            />
        </>
    );
}
