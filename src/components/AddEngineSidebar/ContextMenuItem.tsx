export default function ContextMenuItem({
    className,
    ...props
}: React.ComponentPropsWithRef<"div">) {
    return (
        <div
            className={`px-4 py-2 cursor-pointer hover:bg-gray-200 transition ${className}`}
            {...props}
        ></div>
    );
}
