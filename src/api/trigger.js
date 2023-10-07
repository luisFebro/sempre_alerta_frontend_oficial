import getId from "utils/getId";

const getUniqueId = () => getId();

// use it for useAPIList only since trigger does not return nothing as data, only works for updating if necessary later...
function watchTrigger({
    comp, // e.g "RecordedClientsList" - current list component's name
    runName, // e.g "RecordedClientsList_123dffds" it should have an id and it is from another component like a delete comp which deletes a card and need to reload the list
    triggerVars, // e.g `${filterName}_${period}_${search}` it should includes all variables which needed to be watched for changing and trigger the list inside the current list component
}) {
    const gotTriggerVars =
        triggerVars && window.sessionStorage.getItem("triggerVars");
    const isNewTriggerVars = gotTriggerVars !== triggerVars;
    if (!gotTriggerVars || isNewTriggerVars)
        window.sessionStorage.setItem("triggerVars", triggerVars);
    // return random runName id to be triggered
    if (!isNewTriggerVars && runName && runName.toString().includes(comp))
        return runName;

    if (isNewTriggerVars) {
        // returns the new sequence of triggerVars
        return triggerVars;
    }

    // allow the trigger for the first loading
    return true;
}

// should be replaced by watchTrigger...
function getTrigger(runNameWithId, targetName, options = {}) {
    const { cond2 } = options;
    let trigger1 = runNameWithId;
    let trigger2 = false;

    if (cond2) {
        const gotCond2 = window.sessionStorage.getItem(cond2);
        if (!gotCond2) {
            window.sessionStorage.setItem("cond2", cond2);
        }

        if (gotCond2 !== cond2) {
            window.sessionStorage.setItem("cond2", cond2);
            trigger2 = cond2;
            if (trigger2) trigger1 = false;
        }
    }

    if (!cond2) {
        if (!runNameWithId || !targetName) return false;
        if (typeof runNameWithId !== "string") return;
    }

    if (trigger1) trigger2 = false;

    const condTrigger =
        trigger2 ||
        (runNameWithId && runNameWithId.toString().includes(targetName));
    return condTrigger ? trigger2 || trigger1 : false;
}

// used for useAPI since requires the trigger to be true in the start.
function needTrigger(runNameWithId, targetName) {
    if (!runNameWithId || !targetName) return true;

    // if runNameWithId is an Array, then it returns -1
    return runNameWithId.indexOf(targetName) !== -1 ? runNameWithId : true;
}

// // const name = "TaskCardfsfdsafsdafds12332132132132321";
// const res = getTriggerRes(name, "TaskCard");
// console.log("res", res); // TaskCardfsfdsafsdafds12332132132132321

// this get boolean from a false status with unique ID so that useEffect can render as a new request, otherwise false will not trigger...
function treatBoolStatus(boolStr) {
    if (!boolStr) return;

    const underScoreInd = boolStr.indexOf("_");
    const bool = boolStr.slice(0, underScoreInd);
    const res = bool === "true";
    return res;
}
// const falseStatus = "false_1321321432432434323"
// const res = treatFalseStatus(falseStatus); // false boolean

export { watchTrigger, getTrigger, needTrigger, getUniqueId, treatBoolStatus };
