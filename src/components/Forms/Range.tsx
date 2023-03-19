import { useState } from "react";

interface Props {
    className?: string;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    id?: string;
}

export default function Range({
    className,
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    id,
}: Props) {
    const [value, setValue] = useState(defaultValue ?? min);

    return (
        <div className={`flex items-center range ${className}`}>
            <input
                type="range"
                className="w-full"
                value={value}
                onChange={e => setValue(e.target.valueAsNumber)}
                min={min}
                max={max}
                step={step}
                defaultValue={defaultValue}
                id={id}
            />
            <span className="ml-3">{value}</span>
        </div>
    );
}
