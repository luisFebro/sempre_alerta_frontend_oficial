import { useState } from "react";
import MainBtn from "components/btns/MainBtn";
import ModalYesNo from "components/modals/ModalYesNo";
import { emitUpdateEmergencyStage, emitConfirmEmergency } from "socket/emits";
import showToast from "components/toasts/showToast";

export default function ItemModalBtn({ type = "finish", socket, data }) {
    const [fullOpen, setFullOpen] = useState(false);

    const handleFullOpen = () => {
        setFullOpen(true);
    };

    const handleFullClose = () => {
        setFullOpen(false);
    };

    // CTA METHODS
    const updateEmergencyStageFinished = () => {
        if (!socket)
            return console.log(
                "Socket.io not ready. Maybe you rushed up too early to click on this btn"
            );

        emitUpdateEmergencyStage(socket, { ...data, status: "finished" });

        handleFullClose();
    };

    const confirmEmergency = () => {
        if (!socket)
            return console.log(
                "Socket.io not ready. Maybe you rushed up too early to click on this btn"
            );

        const cb = ({ msg }) => {
            showToast(msg);
        };

        console.log("data confirmEmergency: " + JSON.stringify(data));

        emitConfirmEmergency(
            socket,
            {
                alertId: data.alertId,
                roomId: data.roomId,
                confirmCollector: {
                    origin: "dashboard",
                    role: data.role,
                    userId: data.userId,
                    userName: data.userName,
                    answer: true,
                },
            },
            cb
        );

        handleFullClose();
    };

    const isFinished = type === "finish";
    const title = isFinished
        ? "Conclusão - Alerta SOS"
        : "Confirmação - Alerta SOS";
    const subtitle = isFinished
        ? "Se a emergência foi concluída ou resolvida, clique em SIM para aviso de conclusão para os demais e marcar alerta como concluído"
        : `Para prosseguir com o protocolo de emergência, faça confirmação do alerta: <span style="font-weight:bold;">Você confirma que a emergência real?</span>`;
    const ctaFunc = isFinished
        ? updateEmergencyStageFinished
        : confirmEmergency;
    const ctaTitle = isFinished ? "SIM, CONCLUÍDA" : "SIM, CONFIRMO";

    return (
        <>
            {isFinished ? (
                <MainBtn title="finalizar" onClick={handleFullOpen} />
            ) : (
                <MainBtn title="confirmar" onClick={handleFullOpen} />
            )}
            <ModalYesNo
                title={title}
                noTitle="voltar"
                noCallback={() => null}
                subTitle={subtitle}
                fullOpen={fullOpen}
                yesTitle={ctaTitle}
                setFullOpen={() => {
                    setFullOpen(false);
                }}
                actionFunc={ctaFunc}
            />
        </>
    );
}
