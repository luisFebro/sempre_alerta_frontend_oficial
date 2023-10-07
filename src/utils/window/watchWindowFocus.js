import { updateUI } from "init/useData";
import getId from "utils/getId";

export default function watchWindowFocus(uify) {
    window.addEventListener("focus", () => runIt(uify));
}

function runIt(uify) {
    updateUI("global", { screenId: getId() }, uify);
    console.log("window is focused!");
}
