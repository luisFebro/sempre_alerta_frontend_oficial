import MainBtn from "components/btns/MainBtn";
import useRun from "global-data/ui";
import { setRun, useUify } from "global-data/ui";
import { useEffect, useState } from "react";
import { fromNow } from "utils/dates/dateFns";
import sortDatesFront from "utils/dates/sortDatesFront";
import scrollIntoView from "utils/document/scrollIntoView";
import AnimatedRankingItems from "./AnimatedRankingItems";
import FilterIcon from "@mui/icons-material/FilterAlt";
import showToast from "components/toasts/showToast";
import { Icon } from "@material-tailwind/react";

// TEMP
function getMarkerIcon({ iconColor }) {
    const finalIcon =
        '<svg id="map-svg-marker" style="display: inline-block;padding:0;margin:0;" preserveAspectRatio="none" height="40" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 41.009998">' +
        '<path d="m -8.5,-3 h 48 v 48 h -48 z m 0,0 h 48 v 48 h -48 z" fill="none" id="path2" />' +
        `<path d="M 5.5,12.14 8.36,15 c 1.83,-1.83 4.35,-2.96 7.14,-2.96 2.79,0 5.31,1.13 7.14,2.96 L 25.5,12.14 C 22.94,9.59 19.41,8 15.5,8 11.59,8 8.06,9.59 5.5,12.14 Z M 15.5,0 C 9.45,0 3.97,2.45 0,6.42 L 2.82,9.24 C 6.07,5.99 10.55,3.99 15.5,3.99 c 4.95,0 9.43,2 12.68,5.25 L 31,6.42 C 27.03,2.45 21.55,0 15.5,0 Z M 21.21,17.01 9.79,17 C 8.53,17 7.5,18.03 7.5,19.29 v 19.43 c 0,1.26 1.03,2.29 2.29,2.29 h 11.43 c 1.26,0 2.29,-1.03 2.29,-2.29 V 19.29 C 23.5,18.03 22.47,17.01 21.21,17.01 Z M 21.5,37 H 9.5 V 21 h 12 z" style="fill:${iconColor};width:100%;height:100%;" />` +
        `<path d="m 17.348825,28.96249 0.722603,0.775278 a 0.88861081,0.89471025 47.014061 0 1 -0.355341,1.447143 L 12.08356,33.227819 A 0.62143516,0.6257007 47.014061 0 1 11.451091,32.18794 l 3.019423,-2.814273 -0.567254,-0.647969 a 0.88861081,0.89471025 47.014061 0 1 0.06882,-1.2384 l 2.584399,-2.408806 a 0.88861081,0.89471025 47.014061 0 1 1.260371,0.04001 l 1.093801,1.173535 a 0.88861081,0.89471025 47.014061 0 1 -0.04863,1.260068 z" id="path420" style="fill:${iconColor};stroke-width:0.594437;width:100%;height:100%;" /></svg>`;

    const markerIcon = {
        url:
            "data:image/svg+xml;charset=utf-8," + encodeURIComponent(finalIcon),
        // These options below don't work with data str64
        // fillColor: "#1cf499",
        // fillOpacity: 1,
        // strokeWeight: 0,
        // rotation: 0,
        // anchor: window.google && new google.maps.Point(0, 0), // 0, 20 or 16, 16 ->  // set marker width and height
    };

    return markerIcon;
}

export default function AnimatedRankingList({
    listType,
    connIcon,
    disconnIcon,
    connectingIcon,
}) {
    const isAllList = listType === "all";
    const isConnList = listType === "success";

    const { runObj = {} } = useRun();
    const filteredMarkerList = runObj.filteredMarkerList || [];
    const updateListIdFromMap = runObj.filteredMarkerListId;
    const isFilterOn = runObj.isFilterOn;
    const reinitMap = runObj.reinitMap;
    const handleMarkerClick = runObj.handleMarkerClick;

    const [data, setData] = useState({
        items: [],
        updateListId: null,
    });
    const { items, updateListId } = data;
    const uify = useUify();

    // const filteredMarkerListCount =
    //     (filteredMarkerList && filteredMarkerList.length) || 0;
    const filteredItemsCount = (items && items.length) || 0;
    const isPlural = filteredItemsCount > 1;

    const gotItems = Boolean(items.length);

    useEffect(() => {
        if (!filteredMarkerList || !filteredMarkerList.length) return;

        let filteredList = [];

        if (isAllList) {
            filteredList = filteredMarkerList;
        } else if (isConnList) {
            filteredList = filteredMarkerList.filter(
                (elem) => elem.connectStatus === 1
            );
        } else {
            // noConnList
            filteredList = filteredMarkerList.filter(
                (elem) => elem.connectStatus !== 1
            );
        }

        setData((prev) => ({
            ...prev,
            items: filteredList,
            updateListId: updateListIdFromMap,
        }));
    }, [isConnList, updateListIdFromMap]);

    sortDatesFront(items, {
        target: isConnList ? "lastConnectedDate" : "lastConnectAttemptDate",
    });

    useEffect(() => {
        // update list by date when a change happens
        setData((prev) => ({
            ...prev,
            items: prev.items,
        }));
    }, [updateListId, listType]);

    const markerIcon = getMarkerIcon({ iconColor: "#1372a7" });

    const handleMapView = (clickedItem) => {
        const userId = clickedItem.userId;
        const elem = {
            userId,
            lat: clickedItem.lat,
            lng: clickedItem.lng,
        };

        const config = {
            mode: "center",
            duration: 1500,
            onDone: () => {
                if (handleMarkerClick) handleMarkerClick(elem); // run close view here
                setRun("runObj", { currClickedMarkerId: userId }, uify);
            },
        };
        scrollIntoView("#mapArea", config);
    };

    const getIcon = (connStatus) => {
        if (connStatus === 1) return connIcon.url;
        if (connStatus === 2) return connectingIcon.url;
        return disconnIcon.url;
    };

    const filterIconFinal = <FilterIcon style={{ fontSize: 30 }} />;
    const showMapFilterStatus = () => (
        <section className="mt-5 mb-8 flex items-center justify-start">
            <p className="text-normal font-bold italic mr-5">
                {filterIconFinal} Filtro do mapa ativo.
            </p>
            <MainBtn
                title="desativar"
                onClick={() => {
                    if (reinitMap) reinitMap({ isBtn: true });
                    showToast("Filtro do mapa desativado", { type: "success" });
                }}
            />
        </section>
    );

    const showTotal = () => (
        <section className="text-normal mt-5">
            <span>Total: </span>
            <span className="text-title">{filteredItemsCount}</span>{" "}
            {isPlural ? "conexões" : "conexão"}
        </section>
    );

    return (
        <>
            {gotItems ? (
                <>
                    {isFilterOn && showMapFilterStatus()}
                    {showTotal()}
                    <AnimatedRankingItems updateListId={updateListId}>
                        {items.map((item) => (
                            <section
                                key={item.userId}
                                data-key={item.userId}
                                className="relative overflow-hidden item flex-col lg:flex-row lg:max-w-3xl px-[20px] py-[10px] lg:py-[32px] lg:px-[45px]"
                            >
                                <section className="conn-icon-container absolute right-10 -left- lg:-left-6 lg:right-auto -top-1">
                                    <div className="circus p-2 lg:p-3 justify-end flex-col items-end">
                                        <img
                                            src={getIcon(item.connectStatus)}
                                            width="25px"
                                        />
                                    </div>
                                    <style>
                                        {`
                                        .conn-icon-container .circus {
                                            display: flex;
                                            background: var(--themePDark);
                                            border-radius: 50%;
                                        }

                                        `}
                                    </style>
                                </section>

                                <div className="lg:flex-[50%] pt-5 lg:pt-0">
                                    <strong className="text-normal">ID:</strong>
                                    <br />
                                    <span className="break-words">
                                        {item.userId}
                                    </span>
                                </div>
                                <div className="lg:flex-[35%] lg:justify-center">
                                    <strong className="text-normal">
                                        {isConnList
                                            ? "Última conexão:"
                                            : "Última tentativa:"}
                                    </strong>
                                    <br />{" "}
                                    {Boolean(
                                        isConnList
                                            ? item.lastConnectedDate
                                            : item.lastConnectAttemptDate
                                    )
                                        ? fromNow(
                                              isConnList
                                                  ? item.lastConnectedDate
                                                  : item.lastConnectAttemptDate
                                          )
                                        : isConnList
                                        ? "sem conexão"
                                        : "sem tentativa"}
                                </div>
                                <div className="lg:flex-[25%] self-center mt-5 lg:mt-0">
                                    <MainBtn
                                        title="ver no mapa"
                                        onClick={() => handleMapView(item)}
                                    />
                                </div>
                            </section>
                        ))}
                    </AnimatedRankingItems>
                </>
            ) : (
                <section className="mt-5 text-normal">
                    <div className="flex items-center">
                        <span className="table">
                            <Icon name="notifications_active" size="3xl" />{" "}
                        </span>
                        <span className="px-3 text-gray-500">
                            Nenhum alerta
                        </span>
                    </div>
                </section>
            )}
            <style>{`
                .item {
                    display: flex;
                    margin-top: 5px;
                    margin-bottom: 5px;
                    background-color: white;
                    border-radius: 6px 50px 50px 6px;
                    box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.2);
                    color: #585858;
                    transition: 0.3s ease-out;
                }

                .item div {
                    margin-left: 15px;
                }

                .item:hover {
                    box-shadow: 1px 4px 12px 0px rgba(68, 66, 132, 0.4);
                }
            `}</style>
        </>
    );
}

// HELPERS
// function shuffleArray(array = []) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// END HELPERS

/* ARCHIVES


    function insert() {
        const newItem = {
            userId: getId() + "@gmail.com",
            lastConnectAttemptDate: !isConnList
                ? "2023-03-25T23:50:29.298Z"
                : null,
            lastConnectedDate: isConnList ? new Date() : null,
            connectStatus: isConnList ? 1 : 2,
        };

        setData((prev) => ({
            ...prev,
            items: [newItem, ...prev.items],
            updateListId: getId(),
        }));
    }

function insert() {
        const newItem = {
            id: getId() + "@gmail.com",
            lastConnectAttemptDate: !isConnList ? new Date() : null,
            lastConnectedDate: isConnList ? new Date() : null,
            connectStatus: isConnList ? 1 : 2,
        };

        setData((prev) => ({
            ...prev,
            items: [newItem, ...prev.items],
            updateListId: getId(),
        }));
    }

    const removeItem = () => {
        if (!items || !items.length) return;

        items.shift();
        setData((prev) => ({
            ...prev,
            updateListId: getId(),
        }));
    };


*/
