import { useEffect } from "react";

// ref: https://stackoverflow.com/a/51429408/10010404
export default function useBackColor(colorCss) {
    if (typeof colorCss !== "string")
        throw new Error("Need the first argument COLOR as a string");

    useEffect(() => {
        document.body.classList.add(colorCss);

        return () => {
            document.body.classList.remove(colorCss);
        };
    }, [colorCss]);
}
