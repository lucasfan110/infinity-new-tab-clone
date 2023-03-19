import classNames from "classnames";
import "./TextBubble.css";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function TextBubble({ className, ...props }: Props) {
    return (
        <div
            className={classNames(
                "text-bubble",
                "relative bg-gray-100 m-1 p-4",
                className
            )}
            {...props}
        />
    );
}
