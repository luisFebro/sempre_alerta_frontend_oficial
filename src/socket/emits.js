export default function emitStopEmergencyDashboard(socket, data) {
    socket.emit("stopEmergencyDashboard", data);
}
