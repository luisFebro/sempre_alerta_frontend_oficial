import { useUifyComponent, handleAction } from "context";

const runners = {
    runObj: {}, // better for key/value to be used in different components
    run: false,
    runName: "",
    runArray: [], // for history of executed elements...
};

const initState = {
    profile: {}, // all user data
    global: {}, // all system data
    ...runners,
};

const reducer = (state, action) => {
    const [type, payload] = handleAction(action, initState);

    if (type === "profile")
        return { ...state, profile: { ...state.profile, ...payload } }; // inner ...state.profile so that variables can be inserted individually when updating data with updateUser.
    // al other types of data (use scarcely, only in the last case for transfering data from distant components)
    if (type === "global")
        return { ...state, global: { ...state.global, ...payload } };

    if (type === "run") return { ...state, run: !state.run };
    if (type === "runName")
        return { ...state, runName: payload && payload.toString() };
    if (type === "runObj")
        return { ...state, runObj: { ...state.runObj, ...payload } };
    if (type === "runArray") {
        const prior = state.runArray;

        return {
            ...state,
            runArray: [...new Set([...prior, payload])],
        };
    }
    return state;
};

// ONLY FOR INIT AND AUTH DATA.
// useUify can be used in other specif man components though
// useUify return the state and the uify (or dispatch to be used with useContext in any component)
// data should be nested inside GlobalProvider
export default function useGlobalApp() {
    return useUifyComponent(reducer, initState);
}
