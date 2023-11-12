import MainTitle from "components/MainTitle";
import useData from "global-data/useData";
import { useState } from "react";
import { useConnectSocket, useInitSocket } from "socket/startSocket";
import AnimatedRankingList from "./alerts_list/AnimatedRankingList";

export default function Alerts() {
    const [data, setData] = useState({
        alertMsg: "",
    });
    const { alertMsg } = data;

    const {
        userId,
        role,
        userName: userDisplayName = "L. Febro",
    } = useData("user");

    console.log("userId ALERTS" + userId);
    const globalData = useData();
    const { roomId = "central" } = globalData;

    // TEST
    // dbList is loaded every time user loads the page (read only)
    // only update in backend.
    const dbList = [
        // {
        //     alertId: "1:031023:042652",
        //     userId: "johndow@gmail.com",
        //     userDisplayName: "Roberta Lira",
        //     role: "equipe",
        //     alertStatus: "finished",
        //     utcDate: "2023-10-13T20:15:52.315Z",
        //     sosRequested: false,
        // },
    ];

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
        userDisplayName,
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
            <AnimatedRankingList
                dataList={dataList}
                focusScreenId={focusScreenId}
            />
        </section>
    );
}
