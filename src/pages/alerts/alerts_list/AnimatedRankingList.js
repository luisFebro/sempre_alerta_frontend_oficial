import { useEffect, useState } from "react";
import { calendar } from "utils/dates/dateFns";
import sortDatesFront from "utils/dates/sortDatesFront";
import showToast from "components/toasts/showToast";
import AnimatedRankingItems from "./AnimatedRankingItems";
import {
    listenStartEmergencyDashboard,
    listenUpdateEmergencyStage,
} from "socket/listens";
import ItemModalBtn from "./items/ItemModalBtns";

export default function AnimatedRankingList({ dataList, focusScreenId }) {
    const { dbList, userId, roomId, authorName, socket } = dataList;

    const [data, setData] = useState({
        list: [],
        updateListId: null,
        alertMsg: null,
    });
    const { list, updateListId, alertMsg } = data;

    const listCount = (list && list.length) || 0;
    const isPlural = listCount > 1;

    const gotlist = Boolean(list.length);

    useEffect(() => {
        if (alertMsg)
            showToast(alertMsg, { type: "warning", dur: 60 * 60 * 60 });
    }, [alertMsg]);

    useEffect(() => {
        if (!socket) return;
        listenStartEmergencyDashboard(socket, setData);
        listenUpdateEmergencyStage(socket, setData);
    }, [socket]);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            list: dbList,
        }));
    }, [dbList.length]);

    sortDatesFront(list, {
        target: "createdAt",
    });

    useEffect(() => {
        // update list by date when a change happens
        setData((prev) => ({
            ...prev,
            list: prev.list,
            updateListId: focusScreenId,
        }));
    }, [focusScreenId]);

    const getIcon = (connStatus) => {
        if (connStatus.includes("pending"))
            return "/img/siren_status/siren_history_pending.png";
        if (connStatus === "canceled")
            return "/img/siren_status/siren_history_canceled.png";
        if (connStatus === "requested")
            return "/img/siren_status/siren_history_requested.png";
        if (connStatus === "finished")
            return "/img/siren_status/siren_history_finished.png";
    };

    const showTotal = () => (
        <section className="text-normal mt-5">
            <span>Total: </span>
            <span className="text-title">{listCount}</span>{" "}
            {isPlural ? "alertas" : "alerta"}
        </section>
    );

    const showEmptyIllustration = () => (
        <section>
            <div className="relative -top-14 flex list-center flex-col justify-center items-center">
                <span>
                    <img
                        src="/img/illustra/illustration_no_data_history_oficial.svg"
                        width="300"
                        height="300"
                    />
                </span>
                <span className="text-title text-center text-gray-500 py-5 font-bold">
                    Nenhum alerta
                </span>
            </div>
        </section>
    );

    const dataModalBtns = {
        authorName,
        userId,
        roomId,
    };

    return (
        <section className="mx-3 my-[200px]">
            {gotlist ? (
                <>
                    {showTotal()}
                    <AnimatedRankingItems updateListId={updateListId}>
                        {list.map((item) => (
                            <section
                                key={item.alertId}
                                data-key={item.alertId}
                                className="relative overflow-hidden item flex-col lg:flex-row lg:max-w-3xl px-[20px] py-[10px] lg:py-[32px] lg:px-[45px]"
                            >
                                <section className="absolute top-0 left-2.5 text-sm font-bold bg-slate-500 text-white px-3 rounded-lg">
                                    ID ALERTA:{" "}
                                    <span className="font-thin">
                                        {item.alertId}
                                    </span>
                                </section>
                                <div className="lg:flex-[50%] pt-5 lg:pt-0">
                                    <strong className="text-normal">
                                        Usuário:
                                    </strong>
                                    <br />
                                    <span className="break-words text-center">
                                        {item.authorName} ({item.authorRole})
                                    </span>
                                </div>
                                <div className="lg:flex-[30%] lg:justify-center">
                                    <strong className="text-normal">
                                        Alertou:
                                    </strong>
                                    <br />{" "}
                                    {Boolean(item.alertDate)
                                        ? item.alertDate
                                        : "sem data"}
                                </div>
                                <div className="lg:flex-[45%] self-center mt-5 lg:mt-0">
                                    <div className="flex list-center items-center justify-center">
                                        {item.sosRequested !== null && (
                                            <section className="relative">
                                                <img
                                                    src={getIcon(item.status)}
                                                    width="90px"
                                                    height="90px"
                                                />
                                            </section>
                                        )}

                                        {item.sosRequested !== null &&
                                            item.status.includes("pending") && (
                                                <ItemModalBtn
                                                    type="confirm"
                                                    alertId={item.alertId}
                                                    socket={socket}
                                                    data={dataModalBtns}
                                                    setData={setData}
                                                />
                                            )}

                                        {item.sosRequested === null && (
                                            <p className="text-normal font-bold">
                                                Aguardando confirmação...
                                            </p>
                                        )}

                                        {item.sosRequested &&
                                            item.status === "requested" && (
                                                <ItemModalBtn
                                                    type="finish"
                                                    alertId={item.alertId}
                                                    socket={socket}
                                                    data={dataModalBtns}
                                                    setData={setData}
                                                />
                                            )}
                                    </div>
                                </div>
                            </section>
                        ))}
                    </AnimatedRankingItems>
                </>
            ) : (
                showEmptyIllustration()
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
        </section>
    );
}
