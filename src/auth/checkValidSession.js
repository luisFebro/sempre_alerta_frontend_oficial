import getAPI, { checkValidSession as check } from "api";
import disconnect from "auth/access/disconnect";
import { HOST_INTERNAL_URL, HOST_URL } from "config/root";
import { readData, updateData } from "global-data/useData";
import getId from "utils/getId";

export default async function checkValidSession(uify) {
    // LESSON: if event triggers simutaneously, then the last triggered will executed and override the previous one

    window.addEventListener("visibilitychange", (e) => {
        const screenVisibility = document && document.visibilityState;
        //ref: https://stackoverflow.com/questions/10338704/javascript-to-detect-if-user-changes-tab
        console.log(`EVENT VISIBILITY STATE: ${screenVisibility}`);

        if (screenVisibility == "visible") runSessionCheck(uify);
    });

    window.addEventListener("focus", (e) => {
        const screenVisibility = document && document.visibilityState;
        //ref: https://stackoverflow.com/questions/10338704/javascript-to-detect-if-user-changes-tab
        // console.log(`VISIBILITY STATE FROM FOCUS: ${document.visibilityState}`);
        console.log(
            "EVENT FOCUS TRIGGERED - SCREEN VISIBILITY: " + screenVisibility
        );

        if (screenVisibility == "hidden") runSessionCheck(uify);
    });

    // const hasFocus = document && document.hasFocus();
    // if (hasFocus) {
    //     console.log("EVENT FOCUS TRIGGERED FROM HAS FOCUS");
    //     // visibilityState is always hidden when focusing and unfocusing the current screen. Whereas visible when switching back and forth the current tab
    //     if (document && document.visibilityState == "hidden")
    //         runSessionCheck(uify);
    // }
}

export async function runSessionCheck(uify) {
    updateData(uify, { screenId: getId() });

    const { token } = readData(uify);
    const isLoggedIn = Boolean(token);

    // redirect users logout in whatever private page
    if (!isPrivatePage()) return;

    if (isPrivatePage() || !isLoggedIn) {
        const isUnauthPriPage = isPrivatePage() && !isLoggedIn;
        if (isUnauthPriPage) await disconnect();
        if (!isLoggedIn) return;
    }

    const isValidSession = await getAPI({
        url: check(),
    }).catch(console.log);

    if (!isValidSession) await disconnect();
}

// HELPERS
export function isAccessOrMainPage() {
    const result =
        window.location.href === HOST_URL + "/" ||
        window.location.href === "www.semprealertasos.com" + "/" ||
        window.location.href === HOST_INTERNAL_URL + "/" ||
        window.location.href.indexOf("acesso") >= 0;

    return result;
}

export function isPrivatePage() {
    const privatePages = ["/alertas", "/cadastros"];

    return privatePages.some((pg) => window.location.href.includes(pg));
}
// END HELPERS
