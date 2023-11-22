export function emitJoinRoom(socket, userId, roomIdList) {
    const roomData = {
        userId,
        roomIdList, // ex: ["central-tajmjcv"]
        origin: "dashboard",
    };

    socket.emit("joinRoom", roomData);
}

export function emitConfirmEmergency(socket, data, cb) {
    socket.emit("confirmEmergency", data, cb);
}

export function emitUpdateEmergencyStage(socket, data, cb) {
    socket.emit("updateEmergencyStage", data, cb);
}

export function emitFinishEmergencyDashboard(socket, data) {
    /*data alertId, userId, roomId, msg */
    socket.emit("finishEmergencyDashboard", data);
}
