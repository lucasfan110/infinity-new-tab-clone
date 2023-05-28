import { Icon } from "../store";

interface Props {
    icon: Icon;
    className?: string;
    children?: React.ReactNode;
}

export default function DisplayIcon({ icon, className = "", children }: Props) {
    switch (icon.type) {
        case "basic":
            return (
                <svg
                    className={`rounded-lg ${className}`}
                    viewBox="0,0,90,90"
                    style={{
                        backgroundColor: icon.bgColor,
                    }}
                >
                    <foreignObject className="w-full h-full">
                        <span
                            className={`text-white flex shrink-0 items-center justify-center truncate w-full h-full`}
                            style={{
                                fontSize: icon.bgTextSize,
                            }}
                        >
                            {icon.bgText}
                            {children}
                        </span>
                    </foreignObject>
                </svg>
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
