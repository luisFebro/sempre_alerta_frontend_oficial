import showToast from "components/toasts";
import getAPI, { login, register, loadDataInit } from "api";
import setInitData from "global-data/setInitData";

export default async function loadInit(uify, userId) {
    const data = await getAPI({
        method: "post",
        url: loadDataInit(),
        fullCatch: true,
        body: { userId },
        timeoutMsgOn: false,
    }).catch(async (err) => {
        if (!err) return;

        if (err.status === 401) {
            setInitData(uify, undefined); // set init default values
        }
    });

    if (!data) return;

    await setInitData(uify, data);
}

// objToSend: { name, email, password, registeredBy = email }
export const doRegister = async (objToSend) =>
    await getAPI({
        method: "post",
        url: register(),
        body: objToSend,
        timeout: 30000,
        loader: true,
        fullCatch: true,
    });

export const doLogin = async (
    uify,
    body = { userId: "", origin: "dashboard" }
) => {
    const data = await getAPI({
        method: "post",
        url: login(),
        body,
        timeout: 30000,
        loader: true,
        fullCatch: true,
        waitInSec: 2000,
    }).catch((err) => {
        if (!err) return null;
        const errorMsg = err.data && err.data.error;
        if (errorMsg) return showToast(errorMsg, { type: "error" });

        showToast(
            "Não foi possível conectar. Verifique sua conexão e tente novamente.",
            {
                type: "error",
            }
        );
        return null;
    });

    if (!data) return null;

    await setInitData(uify, data);

    return data;
};

/* COMMENTS
n1: eg when user authenticated
{
    headers: {
        Content-type: "application/json"
        x-auth-token: "eyJhbGciOiJIUzI1NiIsInR5..."
    }
}

n2: getState need to be wrapped inside redux dispatch function in order to work properly. eg dispatch(loadUser(getState))
*/

/* ARCHIVES
Setup config/headers and token
export const tokenConfig = (getState) => {
    // n2
    // getState method accesses redux store outside of a react component
    const { token } = getState().authReducer.cases;
    console.log("token from tokenConfig", token);
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    // N1 If token, add to headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config;
};

*/
