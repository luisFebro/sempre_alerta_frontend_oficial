import {
    addItem,
    updateItem,
} from "pages/alerts/alerts_list/items/itemMethods";
//
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
        setData((prev) => ({
            ...prev,
            alertMsg: `Usuário ${options.userDisplayName} acabou de acionar emergência com ID: ${options.alertId}. Verifique o status na lista de histórico de alertas`,
        }));

        const newItem = {
            alertId: options.alertId,
            userId: options.userId,
            userDisplayName: options.userDisplayName,
            userType: options.userType,
            alertStatus: "pending_notify",
            utcDate: options.utcDate,
        };

        addItem(newItem, setData);
    });
}

export function listenUpdateEmergencyStage(socket, setData) {
    socket.on("updateEmergencyStage", (options = {}) => {
        const updatedItem = {
            alertId: options.alertId,
            alertStatus: options.status,
        };

        updateItem(updatedItem, setData);
    });
}
// END ALL EVENTS
