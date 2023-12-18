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
export function listenUpdateEmergencyStage(socket, setData) {
    socket.on("updateEmergencyStage", (options = {}) => {
        const status = options.status;
        const isStartStatus = status === "pending_notify";

        if (isStartStatus) {
            addItem(options, setData);
        } else {
            updateItem(options, setData);
        }
    });
}
// END ALL EVENTS
