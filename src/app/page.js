"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useInitSocket } from "socket/startSocket";
import Snackbar from "components/Snackbar";
import RadiusBtn from "components/buttons/RadiusBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Field from "components/fields/Field";
import Select from "components/selects/Select";
import eventsListenAll from "socket/listens";
import emitStopEmergencyDashboard from "socket/emits";
import getId from "utils/getId";

export default function Home() {
    const [data, setData] = useState({
        startEmergencyMsg: null,
        startEmergencyMsgId: null,
        stopEmergencyMsg: null,
        stopEmergencyMsgId: null,
        btnCounter: 0,
        // last one clicked data
        userId: "n/a",
        roomId: "n/a",
        userType: "n/a",
        // dashboard to app data
        toAppMsg: "Usuário ver esse mensagem quando painel desativa alerta",
        toAppRoomId: "central",
    });
    const {
        startEmergencyMsg,
        startEmergencyMsgId,
        stopEmergencyMsg,
        stopEmergencyMsgId,
        btnCounter,
        userId,
        roomId,
        userType,
        toAppMsg,
        toAppRoomId,
    } = data;

    const dashboardUserId = "febroFromDashboard";

    const socket = useInitSocket({ namespace: "nspApp" });
    const isSocketAvailable = socket != null;

    // SOCKET HANDLING
    useEffect(() => {
        if (!isSocketAvailable) return;
        if (socket.disconnected) socket.connect();

        eventsListenAll(socket, setData);
    }, [isSocketAvailable]);

    const triggerStopEmergency = () => {
        if (!isSocketAvailable)
            return console.log(
                "Socket.io not ready. Maybe you rush up too early to click on this btn"
            );

        if (toAppMsg == "") return {};

        emitStopEmergencyDashboard(socket, {
            dashboardUserId,
            roomId: toAppRoomId,
            msg: toAppMsg,
        });
        setData((prev) => ({
            ...prev,
            stopEmergencyMsgId: getId(),
            stopEmergencyMsg: `A emergência foi DESATIVADA em todos os apps da sala ${
                toAppRoomId && toAppRoomId.toUpperCase()
            }`,
        }));
    };

    return (
        <main className="min-h-screen p-10">
            <h2 className="py-8 text-4xl text-center font-semibold">
                DO APP <FontAwesomeIcon icon={faArrowAltCircleRight} /> PAINEL
            </h2>
            <section className="flex items-start justify-center">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/sempre-alerta-icon.png"
                    alt="Sempre Alerta Logo"
                    width={200}
                    height={50}
                    priority={false}
                />

                <div className="pl-10 z-10 text-5xl">
                    <p className="text-2xl text-black">Botão clicado no app:</p>
                    <span className="text-9xl">{btnCounter}</span>
                    {btnCounter == 1 ? "vez" : "vezes"}
                </div>
            </section>

            <h3 className="pt-8 pb-4 text-2xl text-center font-semibold">
                Último Usuário Clicou:
            </h3>
            <section className="px-5 py-3 last-user-container flex justify-between mx-20 bg-black rounded-lg">
                <div>
                    <p className="text-1xl font-bold">ID Usuário:</p>
                    <p className="text-1xl">{userId}</p>
                </div>

                <div>
                    <p className="text-1xl font-bold">Tipo Usuário:</p>
                    <p className="text-1xl">{userType}</p>
                </div>

                <div>
                    <p className="text-1xl font-bold">Sala/Escola:</p>
                    <p className="text-1xl">{roomId}</p>
                </div>
            </section>

            <hr className="lazer-purple" />

            <h2 className="pb-8 text-4xl text-center font-semibold">
                PARA APP <FontAwesomeIcon icon={faArrowAltCircleLeft} /> PAINEL
            </h2>
            <p className="text-2xl text-black text-center mb-5">
                Mensagem de desativação para apps:
            </p>

            <Field
                size="small"
                name="toAppMsg"
                backgroundColor="#fff"
                value={toAppMsg}
                multiline
                fullWidth
                onChangeCallback={setData}
                enterCallback={() => null}
            />

            <div className="mt-10">
                <Select
                    label="Selecione Sala/Escola:"
                    currValue={toAppRoomId}
                    defaultValue="central"
                    valueList={["central", "school teste 1"]}
                    onSelectCallback={(val) =>
                        setData((prev) => ({ ...prev, toAppRoomId: val }))
                    }
                />
            </div>

            <div className="mt-10 justify-center flex">
                <RadiusBtn
                    position="relative"
                    onClick={triggerStopEmergency}
                    title="DESATIVAR ALERTA"
                    backgroundColor="#8e44ad"
                    size="normal"
                />
            </div>

            <style jsx>
                {`
                    .last-user-container div p {
                        color: #ffffff;
                    }

                    hr {
                        font-size: 20px;
                        width: 250px;
                    }

                    hr.lazer {
                        margin: 40px 0;
                        width: 100%;
                        border: 0;
                        height: 2px;
                        background-image: linear-gradient(
                            to right,
                            rgba(0, 0, 0, 0),
                            rgba(0, 0, 0, 0.75),
                            rgba(0, 0, 0, 0)
                        );
                    }

                    hr.lazer-purple {
                        margin: 40px 0;
                        width: 100%;
                        border: 0;
                        height: 2px;
                        background-image: linear-gradient(
                            to right,
                            rgba(0, 0, 0, 0),
                            rgba(74, 20, 140, 0.75),
                            rgba(0, 0, 0, 0)
                        );
                    }
                `}
            </style>

            {startEmergencyMsgId && (
                <Snackbar
                    snackId={startEmergencyMsgId}
                    txt={startEmergencyMsg}
                    type="warning"
                    duration={10000}
                />
            )}

            {stopEmergencyMsgId && (
                <Snackbar
                    snackId={stopEmergencyMsgId}
                    txt={stopEmergencyMsg}
                    type="warning"
                    duration={10000}
                />
            )}
        </main>
    );
}
