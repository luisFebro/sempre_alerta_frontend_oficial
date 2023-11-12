import getItems, { setItems } from "cache/lStorage";
import { useGlobalContext } from "context";

// USAGE
// const { version } = useData();
// const { userName } = useData("user");
// useData will update in real time both locally with uify and localstorage.
export default function useData(store = "global") {
    const [priorData] = getItems(store);

    const context = useGlobalContext();
    const currData = context ? context[store] : {};

    // if not available in ui, then fallback to cache data
    return { ...priorData, ...currData };
}

// const uify = useUify();
export const useUify = () => {
    const { uify } = useGlobalContext();
    return uify;
};

// ex:  const { token } = readData(uify);
export const readData = (uify, store = "global") => {
    const [priorData] = getItems(store);

    const currData = uify ? uify[store] : {};

    // if not available in ui, then fallback to cache data
    return { ...priorData, ...currData };
};

export const updateData = (uify, data = {}) => {
    const { store = "global" } = data;
    const treatedData = treatObjForUify(data);

    setItems(store, treatedData);
    uify([store, treatedData]);
};

// LEGACY
export const setRun = (type, data, uify) => {
    if (!type || !uify)
        throw new Error("missing required arguments: type, data, uify");

    return uify([type, data]);
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
