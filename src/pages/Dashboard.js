import loadInit from "auth/api";
import ChartBar from "components/ChartBar";
import ChartLine from "components/ChartLine";
import MainTitle from "components/MainTitle";
import StatusCard from "components/StatusCard";
import { useGlobalContext } from "context/Context";
import { useReadUI } from "init/useData";
import { useMemo, useEffect, useState } from "react";
import { useConnectSocket, useInitSocket } from "socket/startSocket";
import watchWindowFocus from "utils/window/watchWindowFocus";
import "./style_home.css";
import showToast from "components/toasts/showToast";
import AnimatedRankingList from "./alerts/alerts_list/AnimatedRankingList";

export default function Dashboard() {
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
        {
            alertId: "4:031023:04gdfsgds2652",
            userId: "johndow@gmail.com",
            userDisplayName: "John Doe",
            userType: "equipe",
            alertStatus: "finished",
            utcDate: new Date(),
        },
    ];

    // update socket when user focusing.
    const focusScreenId = globalData.screenId;

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
        <>
            <div
                className="px-3 md:px-8 h-0"
                style={{
                    background: "#1372a7",
                }}
            />
            <div
                className="custom-shape-divider-top-1665201393"
                style={{ top: 120 }}
            >
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 900 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".2"
                        className="shape-fill"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        className="shape-fill"
                    ></path>
                </svg>
            </div>

            <section className="relative">
                <MainTitle
                    className="absolute whitespace-nowrap -top-20 md:-top-12 absolute-center"
                    classNameTitle="text-black-500"
                    title="Histórico de Alertas"
                    desc="Usuários que acionaram o alerta SOS"
                />
                <AnimatedRankingList {...dataList} />
            </section>
        </>
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
