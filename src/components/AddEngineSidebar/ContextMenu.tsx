import { forwardRef } from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
    show?: boolean;
}
export type Ref = HTMLDivElement;

const ContextMenu = forwardRef<Ref, Props>(({ show }, ref) => {
    if (!show) {
        return null;
    }

    return (
        <div
            className={`absolute border mt-8 bg-white shadow w-24`}
            ref={ref}
        />
    );
});

export default ContextMenu;
