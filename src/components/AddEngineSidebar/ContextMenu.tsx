interface Props extends React.ComponentPropsWithRef<"div"> {
    show?: boolean;
}

export default function ContextMenu({
    show = false,
    className,
    ...props
}: Props) {
    if (!show) {
        return null;
    }

    return (
        <div
            className={`absolute border mt-8 bg-white shadow w-24 ${className}`}
            {...props}
        ></div>
    );
}
