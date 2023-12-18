import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { emitJoinRoom } from "./emits";
import { listenSocketEvents } from "./listens";

export function useInitSocket({ userId = "johndoe@gmail.com", roomIdList }) {
    // LESSON: always use useEffect to initialize methods like io(). It was bugging aorund with many requests and preventing using broadcast.imit to exclude the sender
    const [socketData, setSocketData] = useState(null);

    useEffect(() => {
        const socket = getInitSocket();
        listenSocketEvents(socket);

        emitJoinRoom(socket, userId, roomIdList);

        setSocketData(socket);
        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line
    }, []);

    return socketData;
}

export function useConnectSocket(socket, activeScreenId) {
    const isSocketAvailable = socket != null;

    useEffect(() => {
        if (!socket) return;
        console.log("RUNNING SOCKET");
        // if(socket.disconnected)
        socket.connect();
    }, [activeScreenId, isSocketAvailable]);
}

// HELPERS
export default function getInitSocket() {
    // DOCS: https://socket.io/docs/v4/client-options/
    // every namespace should includes nsp before the actual name. e.g nspApp
    // server test: https://sempre-alerta-backend-72437300b00c.herokuapp.com/socket/nspApp
    // patrick server: http://207.244.226.58:5001/socket/nspApp
    const SOCKET_URI =
        "https://sempre-alerta-backend-72437300b00c.herokuapp.com/socket/nspApp"; // http: // ref: https://stackoverflow.com/questions/37712224/mixed-content-error-when-accessing-websocket-server-hosted-in-a-different-port
    console.log("socket.io URI: " + SOCKET_URI);

    const socket = io(SOCKET_URI, {
        reconnection: true, // default: true - Whether reconnection is enabled or not. If set to false, you need to manually reconnect:
        reconnectionDelay: 1000, // default: 1000 - The initial delay before reconnection in milliseconds (affected by the randomizationFactor value).
        reconnectionDelayMax: 5000, // default: 5000 (before: 1000) The maximum delay between two reconnection attempts. Each attempt increases the reconnection delay by 2x.
        reconnectionAttempts: Infinity, // Default value: Infinity - The number of reconnection attempts before giving up.
        randomizationFactor: 0.5, //  n1
        timeout: 20000, // default: 20000 (before: 2000) The timeout in milliseconds for each connection attempt.
        autoConnect: true, // default: true - Whether to automatically connect upon creation. If set to false, you need to manually connect:
        path: "/socket.io",
        query: { origin: "dashboard" },
        transports: ["polling", "websocket"], // a list of transports to try (in order). Engine always attempts to connect directly with the first one, provided the feature detection test for it passes.
        upgrade: true, // default: true Whether the client should try to upgrade the transport from HTTP long-polling to something better.
        // SOCKET OPTIONS enable retries - https://socket.io/docs/v4/tutorial/step-8#at-least-once
        ackTimeout: 10000, // default: - The default timeout in milliseconds used when waiting for an acknowledgement (not to be mixed up with the already existing timeout option, which is used by the Manager during the connection)
        retries: 3, // default: - The maximum number of retries. Above the limit, the packet will be discarded.
    });

    return socket;
}

/* COMMENTS
n1:
                    The randomization factor used when reconnecting (so that the clients do not reconnect at the exact same time after a server crash, for example).
                    Example with the default values:
                    1st reconnection attempt happens between 500 and 1500 ms (1000 * 2^0 * (<something between -0.5 and 1.5>))
                    2nd reconnection attempt happens between 1000 and 3000 ms (1000 * 2^1 * (<something between -0.5 and 1.5>))
                    3rd reconnection attempt happens between 2000 and 5000 ms (1000 * 2^2 * (<something between -0.5 and 1.5>))
                    next reconnection attempts happen after 5000 ms

*/
