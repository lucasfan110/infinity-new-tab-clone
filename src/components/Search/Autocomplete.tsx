import { useState } from "react";
import "./Autocomplete.scss";

declare global {
    function autocomplete(data: any): void;
}

let setAutocomplete: React.Dispatch<React.SetStateAction<string[]>> | null =
    null;

window.autocomplete = data => {
    console.log(data);

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

    if (autocomplete.length === 0) {
        return null;
    }

    const renderedAutocomplete = autocomplete.map((a, index) => (
        <div
            className="autocomplete-item"
            onClick={() => search(a)}
            key={index}
        >
            <p>{a}</p>
        </div>
    ));

    return <div className="autocomplete">{renderedAutocomplete}</div>;
}
