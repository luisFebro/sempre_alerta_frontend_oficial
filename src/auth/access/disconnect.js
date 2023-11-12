import { removeCollection } from "cache/lStorage"; // removeCollection, setItems,
import showToast from "components/toasts";
import showProgress from "components/loadingIndicators/progress";
import wait from "utils/promises/wait";
import { setVars } from "cache/indexedDB";

export default async function disconnect(options = {}) {
    const {
        needRedirect = true,
        onlyRedirect = false,
        msg = false,
        navigate,
        // rememberAccess = true,
    } = options;
    if (!needRedirect && !history) return null;

    function redirect() {
        if (!navigate) {
            // don't show toasts when redirecting with href
            const accessScreen = "/";
            window.location.href = accessScreen;

            showProgress("end");
            return;
        }

        showProgress("end");
        navigate("/");
        return null;
    }

    showProgress("go");
    if (onlyRedirect) return redirect();

    removeCollection("user");
    removeCollection("global");
    await setVars({ success: false, token: null, userId: null });

    if (msg) showToast("Desconectando...", { dur: 3000 });

    // allow show progress bar for a little while since the access is too fast in a normal internet connection
    await wait(2000);

    redirect();
    return null;
}

/* ARCHIVES

async function removeLocalCollectionAsync() {
    const run = (resolve) => {
        removeCollection("user");
        resolve("ok");
    };

    return new Promise(run);
}

*/
