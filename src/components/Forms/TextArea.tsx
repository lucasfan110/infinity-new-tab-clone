import classNames from "classnames";

export default function TextArea({
    className,
    ...props
}: React.ComponentPropsWithRef<"textarea">) {
    return (
        <textarea
            className={classNames(
                "bg-transparent outline-none border border-gray-200 rounded-lg w-full mt-2 mb-6 text-sm p-4",
                className
            )}
            {...props}
        />
    );
}
