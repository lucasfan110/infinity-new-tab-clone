import { useState } from "react";
import "./Autocomplete.scss";

declare global {
    function autocomplete(data: any): void;
}

let setAutocomplete: React.Dispatch<
    React.SetStateAction<string[] | null>
> | null = null;

window.autocomplete = data => {
    console.log(data);
    if (!data) {
        setAutocomplete?.(null);
        return;
    }

    const autocomplete = data[1].map((d: any) => {
        return d[0];
    });

    setAutocomplete?.(autocomplete);

    // const renderedAutocomplete = data[1].map((d: any, index: number) => (
    //     <li dangerouslySetInnerHTML={{ __html: d[0] }} key={index}></li>
    // ));

    // setAutocomplete?.(<ul>{renderedAutocomplete}</ul>);
};

export default function Autocomplete() {
    const [autocomplete, _setAutocomplete] = useState<string[] | null>(null);
    setAutocomplete = _setAutocomplete;

    return <div className="autocomplete"></div>;
}
