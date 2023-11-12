import getAPI, { checkValidSession as check } from "api";
import disconnect from "auth/access/disconnect";
import { CLIENT_URL } from "config/clientUrl";
import { readData, updateData } from "global-data/useData";
import getId from "utils/getId";
import watchWindowFocus from "utils/window/watchWindowFocus";

export default async function checkValidSession(uify) {
    watchWindowFocus(() => runSessionCheck(uify));
}

export async function runSessionCheck(uify) {
    updateData(uify, { screenId: getId() });

    const { token } = readData(uify);
    const isLoggedIn = Boolean(token);

    // redirect users logout in whatever private page
    if (isThisPublicPage()) return;

    if (isPrivatePage() || !isLoggedIn) {
        const isUnauthPriPage = isPrivatePage() && !isLoggedIn;
        if (isUnauthPriPage) await disconnect();
        if (!isLoggedIn) return;
    }

    const isValidSession = await getAPI({
        url: check(),
    });

    if (!isValidSession) await disconnect();
}

// HELPERS
export function isThisPublicPage() {
    const exceptionList = [];
    const isException = exceptionList.some((pg) =>
        window.location.href.includes(pg)
    );
    if (isException) return false;

    const result =
        window.location.href === CLIENT_URL + "/" ||
        window.location.href.indexOf("acesso") >= 0;

    return result;
}

function isPrivatePage() {
    const privatePages = ["/alertas", "/usuarios"];

    return privatePages.some((pg) => window.location.href.includes(pg));
}
// END HELPERS
