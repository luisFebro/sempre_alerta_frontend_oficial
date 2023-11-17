import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import showToast from "components/toasts";
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
    }, [roomIdList]);

    return socketData;
}

export function useConnectSocket(socket, focusScreenId) {
    const isSocketAvailable = socket != null;

    useEffect(() => {
        if (!socket) return;
        if (socket.disconnected) socket.connect();
    }, [focusScreenId, isSocketAvailable]);
}

// HELPERS
export default function getInitSocket() {
    // every namespace should includes nsp before the actual name. e.g nspApp
    // server test: https://sempre-alerta-backend-test-eaa42b8e19ca.herokuapp.com/socket/nspApp
    const SOCKET_URI = "wss://207.244.226.58:5001/socket/nspApp";
    console.log("socket.io URI: " + SOCKET_URI);

    const socket = io(SOCKET_URI, {
        reconnection: true,
        reconnectionDelay: 1000, // The initial delay before reconnection in milliseconds (affected by the randomizationFactor value).
        reconnectionDelayMax: 5000, // The maximum delay between two reconnection attempts. Each attempt increases the reconnection delay by 2x.
        randomizationFactor: 0.5, //  n1
        timeout: 2000,
        autoConnect: true,
        path: "/socket.io",
        query: { origin: "dashboard" },
        transports: ["websocket", "polling"], // a list of transports to try (in order). Engine always attempts to connect directly with the first one, provided the feature detection test for it passes.
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
