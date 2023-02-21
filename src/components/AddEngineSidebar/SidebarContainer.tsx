export default function SidebarContainer({
    children,
    ...props
}: React.ComponentPropsWithRef<"div">) {
    return (
        <div className="bg-gray-100 border min-h-screen" {...props}>
            <div className="mx-8">{children}</div>
        </div>
    );
}
