export default function Range({
    ...props
}: React.ComponentPropsWithoutRef<"input">) {
    return (
        <div className={`flex items-center range ${props.className}`}>
            <input {...props} type="range" className="w-full" />
            <span className="ml-3">{props.value}</span>
        </div>
    );
}
