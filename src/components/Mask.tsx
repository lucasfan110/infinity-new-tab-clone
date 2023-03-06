import React, { useEffect, useState } from "react";

interface Props extends React.ComponentPropsWithRef<"div"> {
    show?: boolean;
}

export default function Mask({
    show = true,
    className,
    style,
    ...props
}: Props) {
    const [backgroundColor, setBackgroundColor] = useState("rgba(0, 0, 0, 0)");

    useEffect(() => {
        setTimeout(() => {
            if (!show) {
                setBackgroundColor("rgba(0, 0, 0, 0)");
                return;
            }

            setTimeout(() => {
                setBackgroundColor("rgba(0, 0, 0, 0.5)");
            }, 50);
        }, 50);
    }, [show]);

    return (
        <div
            className={`fixed inset-0 transition duration-500 ${className}`}
            style={{ backgroundColor, ...style }}
            {...props}
        />
    );
}
