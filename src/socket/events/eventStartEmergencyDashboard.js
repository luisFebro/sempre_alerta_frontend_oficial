import getId from "utils/getId";

export default function eventStartEmergencyDashboard(socket, setData) {
    socket.on("startEmergencyDashboard", (options = {}) => {
        setData((prev) => ({
            ...prev,
            defaultMsg: options.msg,
            msgId: getId(),
            btnCounter: ++prev.btnCounter,
            userId: options.userId,
            roomId: options.roomId,
            userType: options.userType,
        }));
    });
}
