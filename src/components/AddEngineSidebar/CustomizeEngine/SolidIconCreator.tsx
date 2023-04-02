import { useState } from "react";
import DisplayIcon from "../../../utils/DisplayIcon";
import Input from "../../Forms/Input";
import Range from "../../Forms/Range";
import TextBubble from "./TextBubble";
import { FaCheck } from "react-icons/fa";

interface Props {
    iconText: string;
    onIconTextChange(value: string): void;
    textSize: number;
    onTextSizeChange(value: number): void;
    color: string;
    onColorChange(value: string): void;
}

export const COLORS = [
    "#ff4734",
    "#ff7c09",
    "#ffcf0c",
    "#2ae979",
    "#2cd5df",
    "#0073ff",
    "#6b09ff",
    "#ff24a0",
];

type ColorSelected = {
    type: "default" | "custom";
    color: string;
};

export default function SolidIconCreator({
    iconText,
    onIconTextChange,
    textSize,
    onTextSizeChange,
    color,
    onColorChange,
}: Props) {
    const [colorSelected, setColorSelected] = useState<ColorSelected>({
        type: "default",
        color,
    });

    const handleColorSelect = (color: string) => {
        setColorSelected({ type: "default", color });
        onColorChange(color);
    };

    const handleColorPick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;

        setColorSelected({ type: "custom", color });
        onColorChange(color);
    };

    const renderedColorPickers = COLORS.map(c => {
        let isSelected =
            colorSelected.type === "default" && colorSelected.color === c;

        return (
            <button key={c} type="button" onClick={() => handleColorSelect(c)}>
                <DisplayIcon
                    icon={{
                        bgColor: c,
                        bgText: isSelected && (
                            <FaCheck className="w-full h-full" />
                        ),
                        bgTextSize: 0,
                        type: "basic",
                    }}
                    className="w-5 h-5 cursor-pointer mr-2 p-1"
                />
            </button>
        );
    });

    renderedColorPickers.push(
        <div
            className="relative w-5 h-5 flex items-center justify-center"
            key="custom"
        >
            <DisplayIcon
                icon={{ type: "img", url: "/images/icons/rainbow.jpg" }}
                className="w-5 h-5 absolute top-0 left-0"
            />
            {colorSelected.type === "custom" && (
                <FaCheck className="absolute top-0 left-0 z-10 w-full h-full text-white p-1" />
            )}
            <input
                type="color"
                className="z-10 opacity-0 cursor-pointer"
                value={colorSelected.color}
                onChange={handleColorPick}
            />
        </div>
    );

    return (
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
    );
}
