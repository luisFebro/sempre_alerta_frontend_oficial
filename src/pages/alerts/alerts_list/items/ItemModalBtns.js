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

        const cb = ({ status = {} }) => {
            const isError = status.ok === false;
            const msg = status.msg;

            if (isError) showToast(msg, { type: "error" });
            else showToast(msg, { type: "success" });
        };

        emitUpdateEmergencyStage(socket, { ...data, status: "finished" }, cb);

        handleFullClose();
    };

    const updateEmergencyStageCanceled = () => {
        if (!socket)
            return console.log(
                "Socket.io not ready. Maybe you rushed up too early to click on this btn"
            );

        const cb = ({ status = {} }) => {
            const isError = status.ok === false;
            const msg = status.msg;

            if (isError) showToast(msg, { type: "error" });
            else showToast(msg, { type: "success" });
        };

        emitUpdateEmergencyStage(socket, { ...data, status: "canceled" }, cb);

        handleFullClose();
    };

    const confirmEmergency = () => {
        if (!socket)
            return console.log(
                "Socket.io not ready. Maybe you rushed up too early to click on this btn"
            );

        const cb = ({ status = {} }) => {
            const isError = status.ok === false;
            const msg = status.msg;

            if (isError) showToast(msg, { type: "error" });
            else showToast(msg, { type: "success" });
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
    const isCancel = type === "cancel";

    const handleTitle = () => {
        if (isCancel) return "Cancelamento - Alerta SOS";

        return isFinished
            ? "Conclusão - Alerta SOS"
            : "Confirmação - Alerta SOS";
    };

    const handleSubtitle = () => {
        if (isCancel)
            return "O alerta SOS será cancelado e uma mensagem avisando a todos os contatos da instituição será enviada. Você confirma que não é uma emergência?";

        return isFinished
            ? "Se a emergência foi concluída ou resolvida, clique em SIM para aviso de conclusão para os demais e marcar alerta como concluído"
            : `Para prosseguir com o protocolo de emergência, faça confirmação do alerta: <span style="font-weight:bold;">Você confirma que a emergência real?</span>`;
    };

    const handlePopupCtaYesTitle = () => {
        if (isCancel) return "SIM, CANCELAR";
        return isFinished ? "SIM, CONCLUIR" : "SIM, CONFIRMAR";
    };

    const handleBtnName = () => {
        if (isFinished) return "finalizar";
        if (isCancel) return "cancelar";

        return "confirmar";
    };

    const handleCtaFunc = () => {
        if (isFinished) return updateEmergencyStageFinished;
        if (isCancel) return updateEmergencyStageCanceled;

        return confirmEmergency;
    };

    const title = handleTitle();
    const subtitle = handleSubtitle();
    const ctaYesPopupTitle = handlePopupCtaYesTitle();
    const ctaFunc = handleCtaFunc();
    const btnName = handleBtnName();

    return (
        <>
            <MainBtn title={btnName} onClick={handleFullOpen} />
            <ModalYesNo
                title={title}
                noCallback={() => null}
                subTitle={subtitle}
                addBackBtn={isFinished || isCancel ? false : true}
                fullOpen={fullOpen}
                yesTitle={ctaYesPopupTitle}
                noTitle={isFinished || isCancel ? "voltar" : "NÃO, CANCELAR"}
                setFullOpen={() => {
                    setFullOpen(false);
                }}
                actionFunc={ctaFunc}
                actionNoOptionFunc={updateEmergencyStageCanceled}
            />
        </>
    );
}
