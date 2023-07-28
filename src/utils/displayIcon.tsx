import { useEffect, useState } from "react";
import { DEFAULT_BASIC_ICON, Icon } from "../store";
import classNames from "classnames";

export const DEFAULT_IMG_URL =
    "https://res.cloudinary.com/dxh0z73s8/image/upload/v1659563955/YelpCamp/image-not-found_kyrpw6.webp";

interface Props {
    icon: Icon;
    className?: string;
    children?: React.ReactNode;
}

export default function DisplayIcon({ icon, className = "", children }: Props) {
    const [validImg, setValidImg] = useState(true);

    useEffect(() => {
        setValidImg(true);
    }, [icon]);

    switch (icon.type) {
        case "basic":
            const basicIcon = icon.basicIcon ?? DEFAULT_BASIC_ICON;
            return (
                <svg
                    className={classNames("rounded-lg", className)}
                    viewBox="0,0,90,90"
                    style={{
                        backgroundColor: basicIcon.bgColor,
                    }}
                >
                    <foreignObject className="w-full h-full">
                        <span
                            className={`text-white flex shrink-0 items-center justify-center truncate w-full h-full`}
                            style={{
                                fontSize: basicIcon.bgTextSize,
                            }}
                        >
                            {basicIcon.bgText}
                            {children}
                        </span>
                    </foreignObject>
                </svg>
            );
        case "img": {
            if (validImg) {
                return (
                    <img
                        src={icon.urlIcon?.url ?? ""}
                        alt="icon"
                        className={className}
                        onError={() => setValidImg(false)}
                        onLoad={() => setValidImg(true)}
                    />
                );
            } else {
                return (
                    <img
                        src={DEFAULT_IMG_URL}
                        className={className}
                        alt="not found"
                    />
                );
            }
        }
    }
}
