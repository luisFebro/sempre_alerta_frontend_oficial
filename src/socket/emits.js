export function emitJoinRoom(
    socket,
    userId,
    roomIdList = ["central", "school1", "school2"]
) {
    const roomData = {
        userId,
        roomIdList: roomIdList,
        origin: "dashboard",
    };

    socket.emit("joinRoom", roomData);
}

export function emitFinishEmergencyDashboard(socket, data) {
    /*data alertId, userId, roomId, msg */
    socket.emit("finishEmergencyDashboard", data);
}
