import classNames from "classnames";

export default function Input({
    className,
    ...props
}: React.ComponentPropsWithRef<"input">) {
    return (
        <input
            className={classNames(
                "block bg-transparent outline-none border-b border-gray-200 w-full mt-2 mb-6 text-sm",
                className
            )}
            {...props}
        />
    );
}
