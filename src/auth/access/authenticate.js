import { isThisPublicPage } from "auth/checkValidSession";
import getVar, { setVars } from "cache/indexedDB";
import showToast from "components/toasts/showToast";
import { updateData } from "global-data/useData";
import { useEffect } from "react";

const handleDestiny = () => {
    return "/alertas";
};

const handleRedirect = ({ destiny, navigate }) => {
    if (navigate) navigate(destiny);
    else window.location.href = destiny;

    // if (role === "cliente-admin") {
    //     setTimeout(() => {
    //         window.location.href = destiny;
    //     }, 1500); // data is being deleted from localstorage.
    // }
};

export default async function authenticate(uify, data = {}) {
    const { userId, token, navigate, accessType = "email", msg = null } = data;

    if (!uify) return Promise.reject("authenticate: missing uify");

    if (!token)
        return Promise.reject(
            "authenticate requires an valid JWT token as the first parameter from login access"
        );

    updateData(uify, {
        token,
        accessType,
    });

    // use indexDB for super important and authentication and frequent methods only
    await setVars({ success: true, token, userId });

    if (msg)
        showToast(msg, {
            type: "success",
            dur: 8000,
        });

    const destiny = handleDestiny();
    handleRedirect({ destiny, navigate });

    return "ok";
}

// redirect user to main authorized page if s/he is logged in
// use it on App and Navigation component (which applies to all tabs pages)

export async function useLoggedIn(navigate = null) {
    useEffect(() => {
        (async () => {
            const isLoggedIn = await getVar("success");
            const isPublicPage = isThisPublicPage();

            const isPrivatePage = !isPublicPage;
            const isLoggedOut = !isLoggedIn;

            if (isPublicPage && isLoggedIn) {
                const destiny = handleDestiny();
                handleRedirect({ destiny, navigate });
            } else if (isPrivatePage && isLoggedOut) {
                // disconnect unthorized user

                const destiny = "/";
                handleRedirect({ destiny, navigate });

                // msg only appears if navigate is passed thru as argument
                showToast("ACE-4 | Acesso não autorizado. Faça seu acesso.", {
                    type: "error",
                });
            }
        })();
    }, []);
}
