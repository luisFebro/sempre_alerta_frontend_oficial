export default function emitStopEmergencyDashboard(socket, data) {
    // data includes:
    // toAppRoomId - to deactivate emergency for all apps in a specific room only
    // dashboardUserId - identify who deactivated the emergency from dashboard
    socket.emit("stopEmergencyDashboard", data);
}
