import { setVars } from "init/var";
import getItems, { setItems } from "init/lStorage";

// for both indexDB and localstorage in one place
// also for bootup Login.js data and recurring access with loadUserInit rest API
export default async function setInitData(data, options = {}) {
    const { uify } = options;
    if (!uify) return Promise.reject("missing role, uify or data");

    // DEFAULT DATA TO BE SET WHEN THERE IS NO DATA IN INIT TO AVOID UNDEFINED ERRORS OR BAD CONFIG
    if (!data) return await setDefaultData(uify);

    const { role } = data.profile;

    // update app's UI
    uify(["profile", data.profile]);
    uify(["global", data.global]);

    await Promise.all([setIndexedDbData(role, data), setLstorageData(data)]);
    // dispatch here used to update all indexDB variables. otherwise, null in the bootup. So it is extremely important to update UI with the new variables in indexedDB

    return "done setting init data";
}

const getIndexCommonData = (initData) => ({
    ...initData.profile,
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

    return await setVars(indexedPayload, "user");
}

// LOCAL STORAGE
async function setLstorageData(initData) {
    const run = (resolve, reject) => {
        if (!initData) reject("no initData passed as argument");

        setItems("profile", initData.profile);
        setItems("global", initData.global); // system related data

        resolve("done!");
    };

    return new Promise(run);
}
// END LOCALSTORAGE

// HELPERS
export async function setDefaultData(uify) {
    const defaultSysData = {
        // themePColor: "default",
        // themeSColor: "default",
        // themeBackColor: "default",
    };

    const defaultProfileData = {};
    const defaultGlobalData = {};

    setItems("profile", defaultProfileData);
    setItems("global", defaultGlobalData);

    uify(["profile", defaultProfileData]);
    uify(["global", defaultGlobalData]);
    return Promise.resolve("default init values set");
}

// END HELPERS
