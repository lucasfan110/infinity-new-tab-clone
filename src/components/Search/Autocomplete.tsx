import { useState } from "react";
import "./Autocomplete.scss";

declare global {
    function generateAutocompleteJsx(data: any): void;
}

let setAutocomplete: React.Dispatch<React.SetStateAction<JSX.Element>> | null =
    null;

window.generateAutocompleteJsx = data => {
    console.log(data);
    if (!data) {
        setAutocomplete?.(<></>);
        return;
    }

    const renderedAutocomplete = data[1].map((d: any, index: number) => (
        <li dangerouslySetInnerHTML={{ __html: d[0] }} key={index}></li>
    ));

    setAutocomplete?.(<ul>{renderedAutocomplete}</ul>);
};

export default function Autocomplete() {
    const [autocomplete, _setAutocomplete] = useState(<></>);
    setAutocomplete = _setAutocomplete;

    return <div className="autocomplete">{autocomplete}</div>;
}
