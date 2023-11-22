import showToast from "components/toasts/showToast";
import {
    addItem,
    updateItem,
} from "pages/alerts/alerts_list/items/itemMethods";
// IMPORTANT: if not displaying logs, comment out switchConsoleLogs() from App.js
export function listenSocketEvents(socket) {
    socket.onAny((event, ...args) => {
        console.log(`socket.onAny: ${event}`, args);
    });

    socket.on(
        "connect",
        () => console.log(`socket.io is CONNECTED!`) // : ${JSON.stringify(socket.args)}
    );

    socket.on("disconnect", () => console.log("socket.io is DISCONNECTED!"));

    socket.on("connect_error", (err) => {
        console.log("socket.io connect_err", JSON.stringify(err));
        if (err.message === "missing required data") {
            showToast("ocorreu um erro ao conectar com socket.io");
        }

        if (err.message === "xhr post error") {
            // removeItems("global", ["chatRoomId", "chatUserId"])
        }
    });
}

// ALL EVENTS
export function listenStartEmergencyDashboard(socket, setData) {
    socket.on("startEmergencyDashboard", (options = {}) => {
        const alertMsg = `Usuário ${options.authorName} acabou de acionar emergência com ID: ${options.alertId}. Verifique o status na lista de histórico de alertas`;
        // TODO showing multiple times. create mechanism to only trigger once in backend. showToast(alertMsg, { type: "warning", dur: 60 * 60 * 60 });

        const newItem = options;
        //     alertId: options.alertId,
        //     authorId: options.authorId,
        //     authorName: options.authorName,
        //     authorRole: options.authorRole,
        //     status: "pending_notify",
        //     alertDate: options.alertDate,
        // };

        addItem(newItem, setData);
    });
}

export function listenUpdateEmergencyStage(socket, setData) {
    socket.on("updateEmergencyStage", (options = {}) => {
        const updatedItem = {
            alertId: options.alertId,
            status: options.status,
        };

        updateItem(updatedItem, setData);
    });
}
// END ALL EVENTS
