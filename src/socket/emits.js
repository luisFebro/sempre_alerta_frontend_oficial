export function emitJoinRoom(socket, userId, roomIdList) {
    const roomData = {
        userId,
        roomIdList, // ex: ["central-tajmjcv"]
        origin: "dashboard",
    };

    socket.emit("joinRoom", roomData);
}

export function emitUpdateEmergencyStage(socket, data, cb = () => null) {
    socket.emit("updateEmergencyStage", data, cb);
}

export function emitConfirmEmergency(socket, data, cb = () => null) {
    socket.emit("confirmEmergency", data, cb);
}

export function emitUpdateWorkingHoursDashboard(socket, data) {
    socket.emit("updateWorkingHoursDashboard", data);
}
