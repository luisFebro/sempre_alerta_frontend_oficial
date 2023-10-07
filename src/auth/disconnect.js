import isThisApp from "utils/window/isThisApp";
import { removeItems } from "init/lStorage"; // removeCollection, setItems,
import getVar, { setVars } from "init/var";
import showToast from "components/toasts";
import showProgress from "components/loadingIndicators/progress";

const isApp = isThisApp();

export default async function disconnect(options = {}) {
    const {
        needRedirect = true,
        onlyRedirect = false,
        msg = false,
        history,
        rememberAccess = true,
    } = options;
    if (!needRedirect && !history) return null;

    function redirect() {
        if (history) return isApp ? history.push("/app") : history.push("/");
        const destiny = isApp ? "/app" : "/acesso/verificacao";

        // TEST - this is redirecting the dashboard to /acesso/verificacao
        // window.location.href = destiny;

        // setTimeout(() => {
        //     showProgress("end");
        // }, 10000);
        return null;
    }

    showProgress("go");
    if (onlyRedirect) return redirect();

    if (msg) showToast("Finalizando sua sessão...", { dur: 15000 });

    const [role] = await Promise.all([
        getVar("role", "user"),
        setVars(
            {
                success: false,
                token: false,
                appId: false,
                birthday: false,
                email: false,
            },
            "user"
        ),
    ]);
    // data from user remains for avoiding login requests every login-password access. The local data will be reusable // For future updates, we can delete the entire user data if they logout from their account instead of simply logout from session
    removeItems("profile", ["token"]);

    // post essential data set
    const isCliAdmin = role === "cliente-admin";
    if (isCliAdmin)
        await setVars(
            { rememberAccess }, // userId, name,
            "user"
        ).catch((err) => `ERROR disconnect setVars ${err}`);
    // end

    redirect();
    return null;
}

/* ARCHIVES

const [role, userId, name, twoLastCpsfDigits] = await getVars(
    ["role", "userId", "name", "twoLastCdpfDigits"],
    "user"
);
async function removeLocalCollectionAsync() {
    const run = (resolve) => {
        removeCollection("profile");
        resolve("ok");
    };

    return new Promise(run);
}

*/
