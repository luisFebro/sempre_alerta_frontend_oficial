export default function emitStopEmergencyDashboard(socket, data) {
    // data includes:
    // roomId - to deactivate emergency for all apps in a specific room only
    // dashboardUserId - identify who deactivated the emergency from dashboard
    socket.emit("stopEmergencyDashboard", data);
}
