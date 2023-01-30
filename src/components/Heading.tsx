import classNames from "classnames";
import React from "react";

type Size = 1 | 2 | 3 | 4 | 5 | 6;

interface Props extends React.ComponentPropsWithRef<"h1"> {
    size: Size;
}

export default function Heading({
    size,
    className: additionalClassName,
    ...props
}: Props) {
    const className = classNames(
        {
            "text-5xl": size === 1,
            "text-4xl": size === 2,
            "text-3xl": size === 3,
            "text-2xl": size === 4,
            "text-xl": size === 5,
            "text-lg": size === 6,
        },
        "text-bold",
        additionalClassName
    );

    return React.createElement(
        `h${size}`,
        { className, ...props },
        props.children
    );
}
