import { useEffect, useRef, useState } from "react";

declare global {
    function autocomplete(data: any): void;
}

let setAutocomplete: React.Dispatch<React.SetStateAction<string[]>> | null =
    null;

window.autocomplete = data => {
    if (!data) {
        setAutocomplete?.([]);
        return;
    }

    const autocomplete = data[1];

    setAutocomplete?.(autocomplete);
};

interface Props {
    search(query: string): void;
}

export default function Autocomplete({ search }: Props) {
    const [autocomplete, _setAutocomplete] = useState<string[]>([]);
    setAutocomplete = _setAutocomplete;

    const autocompleteDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!autocompleteDiv.current) {
                return;
            }

            // User clicked outside the autocomplete, hide it
            if (!autocompleteDiv.current.contains(event.target as Node)) {
                _setAutocomplete([]);
            }
        };

        document.body.addEventListener("click", handleClick, true);
        return () => {
            document.body.removeEventListener("click", handleClick, true);
        };
    }, []);

    if (autocomplete.length === 0) {
        return null;
    }

    const renderedAutocomplete = autocomplete.map((a, index) => (
        <div
            className="w-full py-1.5 pl-16 box-border text-md cursor-pointer transition hover:bg-gray-200"
            onClick={() => search(a)}
            key={index}
        >
            <p>{a}</p>
        </div>
    ));

    return (
        <div
            className="w-full bg-white mt-2.5 box-border rounded"
            ref={autocompleteDiv}
        >
            {renderedAutocomplete}
        </div>
    );
}
