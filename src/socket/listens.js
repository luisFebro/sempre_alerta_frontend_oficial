import { addItem, updateItem } from "pages/alerts/alerts_list/itemMethods";

export function listenSocketEvents(socket) {
    socket.onAny((event, ...args) => {
        console.log(`socket.onAny: ${event}`, args);
    });

    socket.on(
        "connect",
        () => console.log(`socket is connected!`) // : ${JSON.stringify(socket.args)}
    );

    socket.on("connect_error", (err) => {
        0;
        console.log("socket connect_err", err);
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
            alertMsg: options.msg,
        }));

        const newItem = {
            alertId: options.alertId,
            userId: options.userId,
            userDisplayName: options.userDisplayName,
            userType: options.userType,
            alertStatus: options.alertStatus,
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
