import { setItems } from "cache/lStorage";

// for both indexDB and localstorage in one place
// also for bootup Login.js data and recurring access with loadUserInit rest API
export default async function setInitData(uify, initData) {
    if (!uify) return Promise.reject("missing uify");

    // DEFAULT DATA TO BE SET WHEN THERE IS NO DATA IN INIT TO AVOID UNDEFINED ERRORS OR BAD CONFIG
    if (!initData) return await setDefaultData(uify);

    const { user, global } = initData; // token is used in the authenticate method

    // update app's UI
    uify(["user", user]); // only data sent from backend related to user.
    uify(["global", global]); // everything else goes here
    // uify(["custom"]) // only for data that requires persistent even when user logs out

    await setLocalStorageData(initData);

    return "done setting init data";
}

// LOCAL STORAGE
async function setLocalStorageData(initData) {
    const { user, global } = initData;

    const run = (resolve, reject) => {
        if (!initData) reject("no initData passed as argument");

        setItems("user", user);
        setItems("global", global); // system related data

        resolve("done!");
    };

    return new Promise(run);
}
// END LOCALSTORAGE

// HELPERS
export async function setDefaultData(uify) {
    const defaultuser = {};
    const defaultGlobalData = {};

    setItems("user", defaultuser);
    setItems("global", defaultGlobalData);

    uify(["user", defaultuser]);
    uify(["global", defaultGlobalData]);
    return Promise.resolve("default init values set");
}

// END HELPERS

/* ARCHIVES

const getIndexCommonData = (initData) => ({
    ...initData.user,
    appId: initData.appId,
});

const getDataByRole = (role, initData) => {
    const cliUser = {
        rememberAccess: true,
        success: true,
    };

    const roleLib = {
        cliente: cliUser,
    };

    return roleLib[role];
};

async function setIndexedDbData(role, initData) {
    const indexCommonData = getIndexCommonData(initData);
    const dataByRole = getDataByRole(role, initData);

    const indexedPayload = {
        ...indexCommonData,
        ...dataByRole,
    };

    return await setVars(indexedPayload, "global");
}

*/
