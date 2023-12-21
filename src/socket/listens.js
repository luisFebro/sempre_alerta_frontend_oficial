import showToast from "components/toasts/showToast";
import { updateData } from "global-data/useData";
import {
    addItem,
    updateItem,
} from "pages/alerts/alerts_list/items/itemMethods";
import getId from "utils/getId";

// IMPORTANT: if not displaying logs, comment out switchConsoleLogs() from App.js
export function listenSocketEvents(socket, uify) {
    socket.onAny((event, ...args) => {
        console.log(`socket.onAny: ${event}`, args);
    });

    socket.on(
        "connect",
        () => console.log(`socket.io is CONNECTED!`) // : ${JSON.stringify(socket.args)}
    );

    socket.on("disconnect", (reason = " ") => {
        // n1
        console.log("socket.io is DISCONNECTED! Reason: " + reason);

        if (
            reason === "io server disconnect" ||
            (reason && reason.includes("transport"))
        ) {
            console.log("Socket.io reconnecting");
            // ref: https://socket.io/pt-br/docs/v3/client-socket-instance/#disconnect
            // the disconnection was initiated by the server, you need to reconnect manually
            socket.connect();
        }

        // ref: https://github.com/socketio/socket.io/issues/2476#issuecomment-316926924
        // check if socket still be in the manager's connecting list
        // socket.io.connection doesn't exist
        if (socket.connecting && socket.connecting.indexOf(socket) === -1) {
            console.log(
                "Socket.io reconnecting: REASON: socket not in the manager's list"
            );
            //you should renew token or do another important things before reconnecting
            socket.connect();
        }

        // else the socket will automatically try to reconnect
    });

    // ref:
    socket.on("connect_error", (err = {}) => {
        console.log(`socket.io CONNECT_ERROR: ${err.message}`);

        if (err.message === "timeout") {
            // e.g when the server is reloading and gets temporarily off
            updateData(uify, { screenId: getId() });
        }

        if (err.message === "missing required data") {
            showToast("ocorreu um erro ao conectar com socket.io");
        }

        // https://socket.io/docs/v3/client-initialization/#socket-options
        // if (err.message === "invalid credentials") {
        //     socket.auth.token = "efgh";
        //     socket.connect();
        // }
    });

    socket.io.on("reconnection_attempt", () => {
        console.log("socket.io reconnection_attempt");
    });

    socket.io.on("reconnect", () => {
        console.log("socket.io reconnect");
    });
}

// ALL EVENTS
export function listenUpdateEmergencyStage(socket, setData) {
    socket.on("updateEmergencyStage", (options = {}) => {
        const status = options.status;
        const isStartStatus = status === "pending_notify";

        if (isStartStatus) {
            addItem(options, setData);
        } else {
            updateItem(options, setData);
        }
    });
}
// END ALL EVENTS

/* NOTES

N1
Reason	Description
io server disconnect	The server has forcefully disconnected the socket with socket.disconnect()
io client disconnect	The socket was manually disconnected using socket.disconnect()
ping timeout	The server did not send a PING within the pingInterval + pingTimeout range
transport close	The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G)
transport error	The connection has encountered an error (example: the server was killed during a HTTP long-polling cycle)

*/
