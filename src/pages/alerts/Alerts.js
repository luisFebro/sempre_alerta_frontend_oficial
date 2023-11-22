import MainTitle from "components/MainTitle";
import useData from "global-data/useData";
import { useConnectSocket, useInitSocket } from "socket/startSocket";
import AnimatedRankingList from "./alerts_list/AnimatedRankingList";
import useAPI, { readAlertListAll } from "api/useAPI";

export default function Alerts() {
    // const d = {
    //     userId: "mr.febro@gmail.com ",
    //     userName: "Luis Febro",
    //     instituteId: "central-tajmjcv",
    // };
    const { userId = "userIdTest", userName = "userNameTest" } =
        useData("user");
    const { instituteId = "instituteIdTest" } = useData();

    const globalData = useData();
    const { roomId = "central" } = globalData;

    // MAIN SOCKET CONNECTION
    const socket = useInitSocket({
        userId,
        roomIdList: globalData.roomIdList,
    });

    // update socket and list when user is focusing.
    const activeScreenId = globalData.screenId;

    const { data: dbList } = useAPI({
        url: readAlertListAll(),
        params: { userId, roomId: instituteId },
        trigger: activeScreenId,
    });

    useConnectSocket(socket, activeScreenId);
    // END MAIN SOCKET CONNECTION

    const dataList = {
        dbList,
        userId,
        roomId,
        userName,
        socket,
    };

    console.log("RUNNING ALERTS PAGE");

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
                activeScreenId={activeScreenId}
            />
        </section>
    );
}
