import { Icon } from "../store";

export default function displayIcon(icon: Icon, className: string = "") {
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
