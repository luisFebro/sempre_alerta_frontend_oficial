// API, in English, please: https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import MainBtn from "components/btns/MainBtn.js";
import useOfflineListData from "hooks/storage/useOfflineListData";
import getFirstName from "utils/string/getFirstName";
import useData from "init";
import useToken, { chooseHeader } from "auth/useToken";
import disconnect from "auth/access/disconnect.js";
import Skeleton from "components/multimedia/Skeleton";
import { IS_DEV } from "config/clientUrl";
import extractStrData from "utils/string/extractStrData";
// import isThisApp from "utils/window/isThisApp";
import Spinner from "components/loadingIndicators/Spinner";

// const isApp = isThisApp();

export * from "./requestsLib.js";
export * from "./trigger.js";

/*
use default:
const {
    data: list = [],
    loading, ShowLoading,
    error, ShowError,
} = useAPIList({ method: "put", url: someMethod(userId), params: { cliAdminId: businessId } })
<List />
{loading && <ShowLoading />}
{error && <ShowError />}
 */

const ShowLoadingComp = ({ marginY = 100, size = "small" }) => (
    <Spinner marginY={marginY} size={size} />
);

export default function useAPIList({
    method = "GET",
    url,
    params = null,
    body = null,
    skip = null,
    limit = 5,
    timeout = IS_DEV ? 30000 : 10000, // default: 10000
    trigger = true,
    forceTrigger = false, // by default, in this API, trigger only serves as a reload rathan than preventing the list loading. To activate this later behavior, put it as true
    listName, // offline usage
    needAuth = true,
    filterId = "_id",
    disableDupFilter = false, // disable equal matching filter
    heightSkeleton,
}) {
    const isSmall = window.Helper.isSmallScreen();

    const [data, setData] = useState({
        list: [],
        listTotal: 0,
        chunksTotal: null,
        content: null,
    });
    const { list, listTotal, chunksTotal, content } = data;

    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(false);
    const [reload, setReload] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [reachedChunksLimit, setReachedChunksLimit] = useState(false);
    const [updateFirstChunkOnly, setUpdateFirstChunkOnly] = useState("");
    const [offlineBtn, setOfflineBtn] = useState(false);
    const [ignore, setIgnore] = useState(false);

    const token = useToken();
    let { name: userName } = useData();
    userName = getFirstName(userName);

    // IMPORTABLE VARIABLES
    const isPlural = listTotal > 1 ? "s" : "";
    const gotListItems = list.length;
    const noBlocking = !loading && !error;
    const needEmptyIllustra = !loading && noBlocking && !list.length;
    const readyShowElems = noBlocking && !needEmptyIllustra;
    let emptyType = "virgin";
    // END IMPORTABLE VARIABLES

    let moreData = null;
    if (content) {
        // most common content needs
        const extractedData = extractStrData(content);
        if (extractedData.emptyType) emptyType = extractedData.emptyType;
        moreData = extractedData;
    }

    const thisList = list;
    const { isOffline, offlineList } = useOfflineListData({
        listName,
        list: thisList,
        trigger: listName && offlineBtn && !ignore,
    });

    useEffect(() => {
        if (trigger) setUpdateFirstChunkOnly(trigger);
    }, [trigger]);

    useEffect(() => {
        if (data.list.length) setLoading(false);
    }, [data.list]);

    useEffect(() => {
        if (isOffline || offlineBtn) {
            setData({ ...data, list: offlineList });
            setError(false);
            setReload(true);
            setLoading(false);
            timeout = 2000;
            setIgnore(true);
        }

        return () => setIgnore(true);
    }, [isOffline, offlineBtn, offlineList]);

    function handleSuccess({ response, stopRequest, updateOnly }) {
        clearTimeout(stopRequest);
        const responseData = response && response.data;
        const responseList = responseData.list || [];

        setData((prev) => {
            const handledListUnion = disableDupFilter
                ? [...prev.list, ...responseList]
                : [...prev.list, ...responseList].filter(
                      (val, ind, arr) =>
                          arr.findIndex(
                              (t) => t[filterId] === val[filterId]
                          ) === ind
                  );

            return {
                ...prev,
                list: updateOnly ? responseList : handledListUnion,
                listTotal: responseData && response.data.listTotal,
                chunksTotal: responseData && response.data.chunksTotal,
                content: responseData && response.data.content,
            };
        });

        const hasCards = listTotal > skip;
        const firstCards = listTotal <= limit;
        setHasMore(hasCards && !firstCards);
        setReachedChunksLimit(skip >= chunksTotal);
        setOfflineBtn(false);
        setLoading(false);
    }

    function handleError(status = 200) {
        setError(true);
        setLoading(false);

        const gotExpiredToken = status === 401;
        if (gotExpiredToken) disconnect();
    }

    useEffect(() => {
        if (forceTrigger) {
            if (!trigger) return;
        }

        if (reachedChunksLimit && !updateFirstChunkOnly) {
            if (hasMore) setHasMore(false);
            return;
        }

        let cancel;

        const updateOnly = skip === 0 || updateFirstChunkOnly;
        if (skip === 0 && !updateFirstChunkOnly) return;
        if (skip > limit) return;

        const stopRequest = setTimeout(() => {
            cancel();
            handleError();
        }, timeout);

        setError(false);
        setLoading(true);

        const config = {
            url,
            method,
            data: body,
            params: { ...params, skip, limit },
            headers: chooseHeader({ token, needAuth }),
            cancelToken: new axios.CancelToken((c) => {
                cancel = c;
            }), // n1
        };

        setUpdateFirstChunkOnly(false);

        async function doRequest() {
            try {
                const response = await axios(config);
                handleSuccess({ response, stopRequest, updateOnly });
            } catch (e) {
                if (axios.isCancel(e)) return;
                if (e.response) {
                    console.log(
                        `${JSON.stringify(e.response.data)}. STATUS: ${
                            e.response.status
                        }`
                    );

                    const { status } = e.response;
                    handleError(status);
                    setUpdateFirstChunkOnly(false);
                }
            }
        }

        doRequest();

        return () => {
            // cancel();
            clearTimeout(stopRequest);
        };
    }, [trigger, reload, skip, reachedChunksLimit, updateFirstChunkOnly]);

    const handleReloadBtn = () => {
        if (isOffline) window.location.href = "/app";
        setReload((reload) => !reload);
    };

    const handleOfflineBtn = () => {
        setOfflineBtn(true);
        setLoading(false);
    };

    const ShowLoading = ({ size = "small" }) => <ShowLoadingComp size={size} />; // n2
    const ShowLoadingSkeleton = (options = {}) => {
        const { height } = options;

        return (
            <section
                className={isSmall ? "mx-2" : ""}
                style={{
                    maxWidth: 500,
                    margin: "0 auto",
                }}
            >
                <Skeleton height={height} />
                <Skeleton height={height} />
                <Skeleton height={height} />
                <Skeleton height={height} />
                <Skeleton height={height} />
            </section>
        );
    };

    const ShowError = () => (
        <section>
            {!isOffline && !offlineBtn && (
                <Fragment>
                    <h1 className="text-title text-center text-expense-red">
                        Oops!
                    </h1>
                    <p className="text-normal mx-2 text-grey text-left">
                        Não foi possível carregar esta lista.
                        <br />
                        <strong>Se sua conexão estiver lenta,</strong> tente
                        acesso offline da última lista carregada.
                    </p>
                </Fragment>
            )}

            {(isOffline || offlineBtn) && (
                <p
                    className="text-normal mx-2 text-grey text-left"
                    style={{ marginTop: "100px" }}
                >
                    Não há mais nenhum dado a exibir no{" "}
                    <strong>modo offline.</strong>
                    <br />
                    Você pode ter mais dados online.
                </p>
            )}

            <div className="container-center-nowrap">
                <MainBtn
                    title="Recarregar"
                    onClick={handleReloadBtn}
                    color="var(--mainWhite)"
                    backgroundColor="var(--mainDark)"
                />
                {!isOffline && !offlineBtn && (
                    <MainBtn
                        titleNowrap
                        title="Acesso offline"
                        onClick={handleOfflineBtn}
                        color="var(--mainWhite)"
                        backgroundColor="var(--mainDark)"
                    />
                )}
            </div>
        </section>
    );

    const ShowListTotals = ({
        analysingTxt = "Analisando...",
        offlineTxt = "Lista offline gerada",
        noItemsTxt = "sem tarefas geradas",
        foundItemsTxt = `tarefa${isPlural} gerada${isPlural}`,
    }) => (
        <Fragment>
            {loading ? (
                <p className="text-normal text-center font-weight-bold text-purple">
                    {analysingTxt}
                </p>
            ) : (
                <Fragment>
                    {(isOffline || offlineBtn) && (
                        <div className="text-normal font-weight-bold text-purple">
                            {offlineTxt}
                        </div>
                    )}

                    {((!gotListItems && offlineBtn && !isOffline) ||
                        (!listTotal && !isOffline && !error)) && (
                        <div className="text-normal font-weight-bold text-grey">
                            {userName}, {noItemsTxt}.
                        </div>
                    )}

                    {!offlineBtn && Boolean(listTotal) && !error && (
                        <div className="text-normal font-weight-bold text-purple">
                            Você tem{" "}
                            <span style={{ fontSize: "25px" }}>
                                {listTotal}
                            </span>{" "}
                            {foundItemsTxt}.
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );

    const ShowOverMsg = (options = {}) => {
        const { txtColor = "text-purple", brand = false } = options;

        return (
            <Fragment>
                {!hasMore && readyShowElems && (
                    <p
                        className={`${txtColor} text-lg text-center font-bold`}
                        style={{
                            margin: "70px 0 100px",
                        }}
                    >
                        Isso é tudo
                        {`${userName ? `, ${userName}.` : "."}`}
                    </p>
                )}

                {isOffline && (
                    <p className="my-5 text-normal text-center font-weight-bold text-purple">
                        Isso é tudo guardado offline.
                    </p>
                )}
            </Fragment>
        );
    };

    const isOffList = offlineBtn;
    error = error || isOffline;
    loading = loading && !isOffline;

    return {
        list: gotListItems ? list : [],
        listTotal,
        isPlural,
        noBlocking,
        readyShowElems,
        needEmptyIllustra,
        emptyType,
        loading,
        error,
        ShowLoading,
        ShowLoadingSkeleton,
        ShowError,
        ShowListTotals,
        ShowOverMsg,
        hasMore,
        isOffline,
        isOffList,
        content,
        gotData: Boolean(gotListItems),
        extractStrData,
        moreData: moreData && moreData.content, // from content field
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
*/
