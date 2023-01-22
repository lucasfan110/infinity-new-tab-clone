import { useEffect, useRef } from "react";

export default function useAutoComplete(query: string) {
    let timerId = useRef<number | null>(null);

    useEffect(() => {
        const oldScript = document.querySelector("script#autocomplete");

        if (oldScript) {
            document.body.removeChild(oldScript as Node);
        }

        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        if (!query) {
            autocomplete(null);
            return;
        }

        timerId.current = setTimeout(() => {
            const script = document.createElement("script");

            script.id = "autocomplete";
            script.src = `https://google.com/complete/search?client=chrome&output=json&q=${query}&callback=autocomplete`;
            script.async = true;

            document.body.append(script);
        }, 200);
    }, [query]);
}
