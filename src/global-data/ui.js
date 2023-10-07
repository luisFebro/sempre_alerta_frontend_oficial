import { useGlobalContext } from "context";
import getItems, { setItems } from "init/lStorage";

// these methods aim to update ui data globally
export default function useRun() {
    const data = useGlobalContext();
    if (!data) return {};

    return {
        run: data.run,
        runName: data.runName,
        runObj: data.runObj,
        runArray: data.runArray,
    };
}

export const setRun = (type, data, uify) => {
    if (!type || !uify)
        throw new Error("missing required arguments: type, data, uify");

    return uify([type, data]);
};

// offitial uify
export const useUify = () => {
    const { uify } = useGlobalContext();
    return uify;
};

// pass uify to update data instantly in the UI. Use it only when data is in another component. For local ones, use local states to update instantly
// e.g update picture in the ui
/*
updateUI(
    "global",
    { "clientAdminData.bizLogo": bizLogoLink },
    uify
);
 */
export const updateUI = (storeName = "global", data, uify) => {
    const treatedData = treatObjForUify(data);

    setItems(storeName, treatedData);
    uify([storeName, treatedData]);
};

// use it to recover the saved data from updateUI
export const useReadUI = (coll = "global") => {
    const [priorData] = getItems(coll);

    const context = useGlobalContext();
    const currData = context ? context[coll] : {};

    // if not available in ui, then fallback to cache data
    return { ...priorData, ...currData };
};

// HELPERS
function treatObjForUify(dataObj) {
    const treatedObj = {};
    const allValues = Object.values(dataObj);

    Object.keys(dataObj).forEach((k, ind) => {
        let newKey = k;

        const dotInd = k.lastIndexOf(".");
        const isNested = dotInd > 1;
        if (isNested) newKey = k.slice(dotInd + 1);

        treatedObj[newKey] = allValues[ind];
    });

    return treatedObj;
}
// END HELPERS
