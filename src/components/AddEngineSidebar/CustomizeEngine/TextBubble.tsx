/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
    arrowLeftMargin?: string;
}

export default function TextBubble({
    arrowLeftMargin = "12%",
    ...props
}: Props) {
    const style = css({
        "::before": {
            content: '""',
            position: "absolute",
            width: 0,
            height: 0,
            left: arrowLeftMargin,
            top: "-8px",
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "8px solid rgb(243 244 246)",
        },

        position: "relative",
        backgroundColor: "rgb(243 244 246)",
        margin: "2px",
        padding: "8px",
    });

    return <div css={style} {...props} />;
}
