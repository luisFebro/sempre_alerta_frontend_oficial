import MainTitle from "components/MainTitle";
import { useGlobalContext } from "context/Context";
import { useReadUI } from "init/useData";
import { useMemo, useEffect, useState } from "react";
import { useConnectSocket, useInitSocket } from "socket/startSocket";
import watchWindowFocus from "utils/window/watchWindowFocus";
import AnimatedRankingList from "./alerts_list/AnimatedRankingList";

export default function Alerts() {
    const { uify } = useGlobalContext();

    const [data, setData] = useState({
        alertMsg: "",
    });
    const { alertMsg } = data;

    const {
        userId = "johndoe@gmail.com",
        userDisplayName = "John Doe",
        role,
    } = useReadUI("profile");
    const globalData = useReadUI("global");
    const { roomId = "central" } = globalData;

    // TEST (on)
    // dbList is loaded every time user loads the page (read only)
    // only update in backend.
    const dbList = [
        // {
        //     alertId: "1:031023:042652",
        //     userId: "johndow@gmail.com",
        //     userDisplayName: "Roberta Lira",
        //     userType: "equipe",
        //     alertStatus: "finished",
        //     utcDate: "2023-10-13T20:15:52.315Z",
        //     sosRequested: false,
        // },
    ];

    // update socket when user is focusing.
    const focusScreenId = globalData.screenId;
    console.log("focusScreenId: " + focusScreenId);

    // eslint-disable-next-line
    const setUify = useMemo(() => uify, []);

    useEffect(() => {
        // init main dashboard data

        // loadInit(setUify);

        watchWindowFocus(setUify);
    }, [setUify]);

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

/* ARCHIVES

<div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <ChartLine />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <ChartBar />
                        </div>
                    </div>
                </div>
            </div>

  // TEST
    // useEffect(() => {
    //     setTimeout(() => {
    //         setData((prev) => ({
    //             ...prev,
    //             allConnectStatusChangeId: `statusChange_${getId()}`, // set randomId to change list data in every change
    //             allConnectStatusChangeList: updateUniqueObjsInArray(
    //                 prev.allConnectStatusChangeList,
    //                 {
    //                     userId: "901b20c1a54dc208@gmail.com",
    //                     connectStatus: 1,
    //                 },
    //                 { filterId: "userId" }
    //             ),
    //         }));
    //     }, 5000);
    //     setTimeout(() => {
    //         setData((prev) => ({
    //             ...prev,
    //             allConnectStatusChangeId: `statusChange_${getId()}`, // set randomId to change list data in every change
    //             allConnectStatusChangeList: updateUniqueObjsInArray(
    //                 prev.allConnectStatusChangeList,
    //                 {
    //                     userId: "418243226e6a11f9@gmail.com",
    //                     connectStatus: 1,
    //                 },
    //                 { filterId: "userId" }
    //             ),
    //         }));
    //     }, 10000);
    // }, []);

            */
