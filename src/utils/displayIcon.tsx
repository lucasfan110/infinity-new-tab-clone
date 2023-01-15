import { Icon } from "../types";

export default function displayIcon(icon: Icon, classNames: string[] = []) {
    const className = classNames.join(" ");

    switch (icon.type) {
        case "basic":
            return (
                <span
                    className={className}
                    style={{
                        backgroundColor: icon.bgColor,
                        fontSize: icon.bgTextSize,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
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
                        borderRadius: "50%",
                    }}
                />
            );
    }
}
