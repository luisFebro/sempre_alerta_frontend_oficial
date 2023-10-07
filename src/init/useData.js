import { useMemo, useEffect, useState } from "react";
import { getVars } from "init/var";
import getItems from "init/lStorage";
import repeat from "utils/arrays/repeat";
import { useGlobalContext } from "context";

// updateUI will update in real time both locally and ui vars with uify. In order to read the most updated data, handle it with useReadUI
// update collections at global-data/useGlobalApp.
// e.g updateUI("filter", { base: "sempre-alerta"}, uify); // useReadUI("filter"); //  const uify = useUify();
export { updateUI, useReadUI } from "global-data/ui";

// USAGE
// localStorage = simply use an empty function. e.g const { role } = useData();
// indexedDB = use an array of strings = const [userRole] = useData(["role"]);
export default function useData(dataArray, options) {
    const globalData = useGlobalContext();
    const profile = globalData ? globalData.profile : {};
    const { store, trigger, dots, local } = handleOptions(dataArray, options);

    // eslint-disable-next-line
    const thisArray = useMemo(() => dataArray, []);

    // LESSON: this condition is responsible to update indexedDB data in bootup
    const updateIndexedDB = Boolean(profile.userId);

    const finalData = useIndexedLoader({
        thisArray,
        trigger,
        store,
        local,
        updateIndexedDB,
    });

    if (local) return updateLocalStorage("profile", { currData: profile });

    // this will automatically set a ... for dataArray loading
    const isLoading = !finalData.length;
    const arrayPattern = repeat(dataArray.length, { placeholder: dots });

    // the last value is always the loading status.
    return isLoading ? [...arrayPattern, true] : [...finalData, false];
}

export function useSysData() {
    const globalData = useGlobalContext();
    const sysData = globalData ? globalData.sysData : {};

    return updateLocalStorage("sysData", { currData: sysData });
}

// HOOKS
function useIndexedLoader({
    thisArray,
    trigger,
    store,
    local,
    updateIndexedDB,
}) {
    const [finalData, setFinalData] = useState([]);

    useEffect(() => {
        let unmounted;
        if (local || (thisArray && !thisArray.length) || !trigger || unmounted)
            return null;

        (async () => {
            const updatedIndexedDB = await getVars(thisArray, store).catch(
                (err) => {
                    throw new Error(`${err}`);
                }
            );

            setFinalData(updatedIndexedDB);
            return null;
        })();

        return () => {
            unmounted = true;
        };
    }, [thisArray, trigger, store, local, updateIndexedDB]);

    return finalData;
}
// END HOOKS

// HELPERS
function handleOptions(dataArray, options) {
    if (!Array.isArray(dataArray) && dataArray !== undefined)
        throw new Error("Requires an array data format");

    let store = options || "profile";
    let trigger = true;
    let dots = "...";
    const local = dataArray === undefined; // fetch data from localstorage

    if (typeof options === "object") {
        store = options.store || "profile";
        trigger = options.trigger === undefined ? true : options.trigger;
        dots = options.dots === false ? null : dots;
    }

    return {
        store,
        trigger,
        dots,
        local,
    };
}

function updateLocalStorage(collection, { currData }) {
    const [priorData] = getItems(collection);
    return { ...priorData, ...currData };
}
// END HELPERS
