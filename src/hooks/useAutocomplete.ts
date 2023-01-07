import { useEffect, useRef } from "react";

export default function useAutoComplete(query: string) {
    let timerId = useRef<number | null>(null);

    useEffect(() => {
        const oldScript = document.querySelector("#autocomplete");

        if (oldScript) {
            document.body.removeChild(oldScript as Node);
        }

        if (!query) {
            generateAutocompleteJsx(null);
            return;
        }

        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            const script = document.createElement("script");

            script.id = "autocomplete";
            script.src = `https://www.google.com/complete/search?client=hp&hl=en&sugexp=msedr&gs_rn=62&gs_ri=hp&cp=1&gs_id=9c&q=${query}&xhr=t&callback=generateAutocompleteJsx`;
            script.async = true;

            document.body.append(script);
        }, 1000);
    }, [query]);
}
