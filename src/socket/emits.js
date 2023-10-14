export function emitJoinRoom(
    socket,
    userId,
    roomIdList = ["central", "central-teste"]
) {
    const roomData = {
        userId,
        roomIdList: roomIdList,
        origin: "dashboard",
    };

    socket.emit("joinRoom", roomData);
}

export function emitConfirmEmergency(socket, data, cb) {
    socket.emit("confirmEmergency", data, cb);
}

export function emitFinishEmergencyDashboard(socket, data) {
    /*data alertId, userId, roomId, msg */
    socket.emit("finishEmergencyDashboard", data);
}
