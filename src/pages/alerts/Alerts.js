import MainTitle from "components/MainTitle";
import useData from "global-data/useData";
import { useConnectSocket, useInitSocket } from "socket/startSocket";
import AnimatedRankingList from "./alerts_list/AnimatedRankingList";
import useAPI, { readAlertListAll } from "api/useAPI";

export default function Alerts() {
    const {
        userId = "userIdTest",
        userName = "userNameTest",
        role,
    } = useData("user");
    const { instituteId: roomId, roomIdList, screenId } = useData();

    // MAIN SOCKET CONNECTION
    // update socket and list when current tab is visible and focused.
    console.log("UPDATE_SCREEN_ID: " + screenId);

    const socket = useInitSocket({
        userId,
        roomIdList,
        updateId: screenId,
    });
    // END MAIN SOCKET CONNECTION

    // no need loading for real time data, otherwise it will be flicking "loading" every update
    const { data: dbList } = useAPI({
        url: readAlertListAll(),
        params: { userId, roomId },
        trigger: screenId,
    });

    const dataList = {
        dbList,
        userId,
        roomId,
        userName,
        socket,
        role,
    };

    // console.log("RUNNING ALERTS PAGE");

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
                activeScreenId={screenId}
            />
        </section>
    );
}
