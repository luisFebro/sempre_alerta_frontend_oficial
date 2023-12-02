import getAPI, { checkValidSession as check } from "api";
import disconnect from "auth/access/disconnect";
import { HOST_INTERNAL_URL, HOST_URL } from "config/root";
import { readData, updateData } from "global-data/useData";
import getId from "utils/getId";

export default async function checkValidSession(uify) {
    window.addEventListener("visibilitychange", (e) => {
        //ref: https://stackoverflow.com/questions/10338704/javascript-to-detect-if-user-changes-tab
        if (document && document.visibilityState == "visible")
            runSessionCheck(uify);
    });
}

export async function runSessionCheck(uify) {
    console.log("runningWindowFOCUS");
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
    const privatePages = ["/alertas", "/usuarios"];

    return privatePages.some((pg) => window.location.href.includes(pg));
}
// END HELPERS
