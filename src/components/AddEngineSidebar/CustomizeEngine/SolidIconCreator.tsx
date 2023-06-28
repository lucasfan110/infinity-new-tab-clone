import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import DisplayIcon from "../../../utils/DisplayIcon";
import Input from "../../Forms/Input";
import Range from "../../Forms/Range";
import TextBubble from "./TextBubble";
import { BasicIcon, DEFAULT_BASIC_ICON } from "../../../store";

interface Props {
    icon: BasicIcon;
    onIconChange?(value: BasicIcon): void;
    /**
     * This is used for when the icon text change then the
     * icon's background text will be dependent on the icon text input
     * instead of the search engine input
     */
    onIconTextChange?(value: string): void;
}

export const DEFAULT_TEXT_SIZE = 30;

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
    icon,
    onIconChange,
    onIconTextChange,
}: Props) {
    const defaultColor: ColorSelected = {
        type: COLORS.includes(icon.bgColor) ? "default" : "custom",
        color: icon.bgColor,
    };

    const [colorSelected, setColorSelected] =
        useState<ColorSelected>(defaultColor);

    const handleColorSelect = (color: string) => {
        setColorSelected({ type: "default", color });
        onIconChange?.({ ...icon, bgColor: color });
    };

    const handleColorPick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;

        setColorSelected({ type: "custom", color });
        onIconChange?.({ ...icon, bgColor: color });
    };

    const handleIconTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onIconChange?.({ ...icon, bgText: e.target.value });
        onIconTextChange?.(e.target.value);
    };

    const renderedColorPickers = COLORS.map(c => {
        let isSelected =
            colorSelected.type === "default" && colorSelected.color === c;

        return (
            <button key={c} type="button" onClick={() => handleColorSelect(c)}>
                <DisplayIcon
                    icon={{
                        type: "basic",
                        basicIcon: {
                            bgColor: c,
                            bgText: "",
                            bgTextSize: 0,
                        },
                        imgIcon: null,
                    }}
                    className="w-5 h-5 cursor-pointer mr-2 p-1"
                >
                    {isSelected && <FaCheck className="w-full h-full" />}
                </DisplayIcon>
            </button>
        );
    });

    renderedColorPickers.push(
        <div
            className="relative w-5 h-5 flex items-center justify-center"
            key="custom"
        >
            <DisplayIcon
                icon={{
                    type: "img",
                    imgIcon: { url: "/images/icons/rainbow.jpg" },
                    basicIcon: DEFAULT_BASIC_ICON,
                }}
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
            <label htmlFor="display-name" className="mb-2 text-sm">
                Icon Text
            </label>
            <Input
                placeholder="Display name"
                id="display-name"
                value={icon.bgText}
                onChange={handleIconTextChange}
                className="text-xs"
            />

            <label htmlFor="text-size" className="mb-2 text-sm">
                Text Size
            </label>
            <Range
                min={14}
                max={74}
                value={icon.bgTextSize}
                onChange={e =>
                    onIconChange?.({
                        ...icon,
                        bgTextSize: e.target.valueAsNumber,
                    })
                }
                className="w-full my-2"
                id="text-size"
            />

            <label className="text-sm">Color</label>
            <div className="mt-2 flex">{renderedColorPickers}</div>
        </TextBubble>
    );
}
