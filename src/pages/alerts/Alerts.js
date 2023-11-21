import MainTitle from "components/MainTitle";
import useData from "global-data/useData";
import { useState } from "react";
import { useConnectSocket, useInitSocket } from "socket/startSocket";
import AnimatedRankingList from "./alerts_list/AnimatedRankingList";
import useAPI, { readAlertListAll } from "api/useAPI";

export default function Alerts() {
    const [data, setData] = useState({
        alertMsg: "",
    });
    const { alertMsg } = data;

    const { userId, userName } = useData("user");
    const { instituteId } = useData();

    const globalData = useData();
    const { roomId = "central" } = globalData;

    const { data: dbList, loading = false } = useAPI({
        url: readAlertListAll(),
        params: { userId, roomId: instituteId },
    });

    // update socket when user is focusing.
    const focusScreenId = globalData.screenId;

    // MAIN SOCKET CONNECTION
    const socket = useInitSocket({
        userId,
        roomIdList: globalData.roomIdList,
    });
    useConnectSocket(socket, focusScreenId);
    // END MAIN SOCKET CONNECTION

    const dataList = {
        dbList,
        userId,
        roomId,
        userName,
        socket,
    };

    return (
        <section className="relative">
            <MainTitle
                className="relative top-32"
                classNameTitle="text-black-500"
                title="Histórico de Alertas"
                desc="Usuários que acionaram o alerta SOS"
            />
            {loading ? (
                <p className="text-subtitle text-center font-bold relative top-36">
                    Carregando...
                </p>
            ) : (
                <AnimatedRankingList
                    dataList={dataList}
                    focusScreenId={focusScreenId}
                />
            )}
        </section>
    );
}
