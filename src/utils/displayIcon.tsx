import { Icon } from "../store";

interface Props {
    icon: Icon;
    className?: string;
}

export default function DisplayIcon({ icon, className = "" }: Props) {
    switch (icon.type) {
        case "basic":
            return (
                <span
                    className={`text-white flex items-center justify-center rounded-lg truncate ${className}`}
                    style={{
                        backgroundColor: icon.bgColor,
                        fontSize: icon.bgTextSize,
                    }}
                >
                    {icon.bgText}
                </span>
            );
        case "img":
            return (
                <img
                    src={icon.url}
                    alt="search engine icon"
                    className={className}
                    style={{
                        borderRadius: "10px",
                    }}
                />
            );
    }
}
