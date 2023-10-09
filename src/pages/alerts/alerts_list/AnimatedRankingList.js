import MainBtn from "components/btns/MainBtn";
import useRun from "global-data/ui";
import { setRun, useUify } from "global-data/ui";
import { useEffect, useState } from "react";
import { calendar } from "utils/dates/dateFns";
import sortDatesFront from "utils/dates/sortDatesFront";
import scrollIntoView from "utils/document/scrollIntoView";
import FilterIcon from "@mui/icons-material/FilterAlt";
import showToast from "components/toasts/showToast";
import { Icon } from "@material-tailwind/react";
import { emitFinishEmergencyDashboard } from "socket/emits";
import AnimatedRankingItems from "./AnimatedRankingItems";
import {
    listenStartEmergencyDashboard,
    listenUpdateEmergencyStage,
} from "socket/listens";

export default function AnimatedRankingList({
    dbList,
    userId,
    roomId,
    userDisplayName,
    socket,
}) {
    const { runObj = {} } = useRun();

    const [data, setData] = useState({
        list: [],
        updateListId: null,
        alertMsg: null,
    });
    const { list, updateListId, alertMsg } = data;
    const uify = useUify();

    const listCount = (list && list.length) || 0;
    const isPlural = listCount > 1;

    const gotlist = Boolean(list.length);

    const handleCTATitle = (status) => {
        return status === "requested" ? "finalizar" : "confirmar";
    };

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
        target: "utcDate",
    });

    useEffect(() => {
        // update list by date when a change happens
        setData((prev) => ({
            ...prev,
            list: prev.list,
        }));
    }, [updateListId]);

    const finishEmergency = (alertId) => {
        if (!socket)
            return console.log(
                "Socket.io not ready. Maybe you rush up too early to click on this btn"
            );

        emitFinishEmergencyDashboard(socket, {
            alertId,
            userId,
            roomId,
            msg: `Alerta SOS com ID ${alertId} foi marcada como concluída pelo admin ${userDisplayName}.`,
        });
    };

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
                                <section className="absolute top-0 left-2.5  pt-1 text-sm font-bold text-gray-600">
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
                                        {item.userDisplayName} ({item.userType})
                                    </span>
                                </div>
                                <div className="lg:flex-[30%] lg:justify-center">
                                    <strong className="text-normal">
                                        Alertou:
                                    </strong>
                                    <br />{" "}
                                    {Boolean(item.utcDate)
                                        ? calendar(item.utcDate)
                                        : "sem data"}
                                </div>
                                <div className="lg:flex-[40%] self-center mt-5 lg:mt-0">
                                    <div className="flex list-center items-center justify-center">
                                        <section className="relative">
                                            <img
                                                src={getIcon(item.alertStatus)}
                                                width="80px"
                                                height="80px"
                                            />
                                        </section>
                                        {(item.alertStatus === "requested" ||
                                            item.alertStatus.includes(
                                                "pending"
                                            )) && (
                                            <MainBtn
                                                title={handleCTATitle(
                                                    item.alertStatus
                                                )}
                                                onClick={() =>
                                                    finishEmergency(
                                                        item.alertId
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </section>
                        ))}
                    </AnimatedRankingItems>
                </>
            ) : (
                <section className="mt-5 text-normal">
                    <div className="flex list-center">
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
        </section>
    );
}
