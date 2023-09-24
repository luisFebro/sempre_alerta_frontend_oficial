import getId from "utils/getId";

// ALL EVENTS
function eventStartEmergencyDashboard(socket, setData) {
    socket.on("startEmergencyDashboard", (options = {}) => {
        setData((prev) => ({
            ...prev,
            startEmergencyMsg: options.msg,
            startEmergencyMsgId: getId(),
            btnCounter: ++prev.btnCounter,
            userId: options.userId,
            roomId: options.roomId,
            userType: options.userType,
        }));
    });
}
// END ALL EVENTS

export default function eventRunAll(socket, setData) {
    eventStartEmergencyDashboard(socket, setData);
}
