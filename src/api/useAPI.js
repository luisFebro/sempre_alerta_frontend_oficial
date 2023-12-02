// API, in English, please: https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/
// for requests required when the pages are loading.
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import isObjEmpty from "utils/objects/isObjEmpty";
import useToken, { chooseHeader } from "auth/useToken";
import disconnect from "auth/access/disconnect.js";
import showToast from "components/toasts";
import { isPrivatePage } from "auth/checkValidSession";
import { setRun, useUify } from "global-data/useData.js";

export * from "./requestsLib.js";
export * from "./trigger.js";

useAPI.propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.oneOf(["get", "post", "delete", "update"]),
    params: PropTypes.object, // e.g { q: query, page: pageNumber } the same as ?q=${query}&page=${pageNumber}
    body: PropTypes.object, // body is the data to be sent as the request body - Only applicable for request methods 'PUT', 'POST', 'DELETE , and 'PATCH'
    timeout: PropTypes.number, // `timeout` specifies the number of milliseconds before the request times out. -- If the request takes longer than `timeout`, the request will be aborted.
};

export default function useAPI({
    method = "get",
    url,
    params = null,
    body = null,
    timeout = 10000,
    trigger = true,
    runName = null,
    snackbar = {},
    needAuth = true,
    loadingStart, // change default initial loading status
    needOnlyOnce = false,
    dataName, // offline usage
    callback,
}) {
    const [data, setData] = useState(null);
    const [onlyOnce, setOnlyOnce] = useState(false);
    const [loading, setLoading] = useState(true); // WARNING> do not change to null since many request depend on the truthness to disnnull undefied object values...
    const [alreadyReqId, setAlreadyReqId] = useState(null);
    const [error, setError] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);

    const uify = useUify();

    const thisData = data;
    // const { offlineData } = useOfflineData({ dataName, data: thisData });
    // useEffect(() => {
    //     if (offlineData) {
    //         setData(offlineData);
    //         setLoading(false);
    //     }
    // }, [offlineData]);

    useEffect(() => {
        if (needOnlyOnce && data) setOnlyOnce(true);
    }, [data, needOnlyOnce]);

    useEffect(() => {
        if (typeof loadingStart === "boolean") setLoading(loadingStart);
    }, [loadingStart]);

    const {
        txtPending,
        timePending,
        txtSuccess = "Operação realizada com sucesso!",
        timeSuccess,
        txtFailure = "Não foi possível realizar operação. Tente novamente.",
    } = snackbar;

    const needSnack = !isObjEmpty(snackbar);

    const token = useToken();

    const getSnack = (msg, opts = {}) => {
        const { type = "warning", status = "success" } = opts;
        if (!needSnack || !msg) return true;

        let time = 4000;
        if (status === "pending" && timePending) time = timePending;
        if (status === "success" && timeSuccess) time = timeSuccess;

        showToast(msg, { type, dur: time });
        return true;
    };

    const handleUpdateData = () => {
        // same target component NAME which is being requesting to...
        // you can use it in the target component since setRun and uify is passed as parameter
        if (!runName) return;

        setRun("runName", runName, uify);
        if (typeof callback === "function") {
            callback();
        }
    };

    function handleSuccess({ response, stopRequest }) {
        const ok = getSnack(txtSuccess, { type: "success" });
        if (ok) {
            clearTimeout(stopRequest);
            setData(response.data);
            handleUpdateData();
            setLoading(false);
            setAlreadyReqId(trigger);
        }
    }

    function handleError(status = 200) {
        setAlreadyReqId(null);
        setLoading(false);
        if (txtFailure) getSnack(txtFailure, { type: "error" });

        const gotExpiredToken = status === 401 || status === 403;

        if (gotExpiredToken && isPrivatePage()) {
            (async () => {
                await disconnect();
                showToast("Sua sessão terminou.");
            })();
        }
    }

    useEffect(() => {
        let cancel;
        const alreadyPassed = alreadyReqId === trigger;
        if (alreadyPassed) return;
        if (onlyOnce) return;
        if (!trigger) return;

        const stopRequest = setTimeout(() => {
            cancel();
            handleError();
        }, timeout);

        setLoading(true);

        const config = {
            url,
            method,
            data: body,
            params,
            headers: chooseHeader({ token, needAuth }),
            cancelToken: new axios.CancelToken((c) => {
                cancel = c;
            }), // n1
        };

        async function doRequest() {
            try {
                getSnack(txtPending, { status: "pending" });
                const response = await axios(config);
                handleSuccess({ response, stopRequest });
            } catch (e) {
                if (axios.isCancel(e)) {
                    setIsCanceled(true);
                    return;
                }
                if (e.response) {
                    const thisStatus = e.response.status;
                    handleError(thisStatus);
                    if (thisStatus !== 200) setError(e.response.data);
                    console.log(
                        `${JSON.stringify(
                            e.response.data
                        )}. STATUS: ${thisStatus}`
                    );
                } else {
                    setError(true);
                }
            }
        }

        doRequest();

        return () => {
            cancel();
            clearTimeout(stopRequest);
        };
    }, [trigger, onlyOnce]);

    const gotData = Boolean(data && data.length);

    const ShowError = () => (
        <p className="text-center font-weight-bold text-red text-normal">
            Oops! Esta parte não funcionou como esperado. Tente recarregar.
        </p>
    );
    return {
        data,
        gotData,
        loading,
        setRun,
        uify,
        error,
        ShowError,
        isCanceled,
        gotError: error || isCanceled,
    };
}

/* COMMENTS
n1:
cancelToken` specifies a cancel token that can be used to cancel the request
You can also create a cancel token by passing an executor function to the CancelToken constructor:

const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
Note: you can cancel several requests with the same cancel token.

n2:
 // loading inside of this component wasn't update and delay much in dev env.
    // it is been declared in the target component like {loading && <Component />}
*/
