import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ROOT_DOMAIN } from "api/root";
import getItems, { setItems } from "init/lStorage";
import showToast from "components/toasts";

export function useInitSocket({ namespace, origin = "dashboard" }) {
    // LESSON: always use useEffect to initialize methods like io(). It was bugging aorund with many requests and preventing using broadcast.imit to exclude the sender
    const [socketData, setSocketData] = useState(null);

    useEffect(() => {
        const data = {
            origin,
        };

        const socket = getInitSocket({ namespace, data });
        startInitialListeners(socket);

        return setSocketData(socket);
        // eslint-disable-next-line
    }, [namespace]);

    return socketData;
}

// HELPERS
export default function getInitSocket({ namespace, data }) {
    // every namespace should includes nsp before the actual name. e.g nspApp
    const URL = `${ROOT_DOMAIN}/${namespace}`;

    const socket = io(URL, {
        reconnection: true,
        reconnectionDelay: 1000, // The initial delay before reconnection in milliseconds (affected by the randomizationFactor value).
        reconnectionDelayMax: 5000, // The maximum delay between two reconnection attempts. Each attempt increases the reconnection delay by 2x.
        randomizationFactor: 0.5, //  n1
        timeout: 20000,
        autoConnect: true,
        path: "/socket.io",
        query: data,
        transports: ["websocket", "polling"], // a list of transports to try (in order). Engine always attempts to connect directly with the first one, provided the feature detection test for it passes.
    });

    return socket;
}

// save locally and socket - used both in every reconnection and starting right after click on continue button to enter in the support page
// export function getSocketQueryData(data = {}) {
//     const [roomId, userId, role] = getItems("global", [
//         "roomId",
//         "userId",
//         "role",
//     ]);

//     const values = {
//         roomId: data.roomId || roomId,
//         userId: data.userId || userId,
//         role: data.role || role,
//     };

//     setItems("global", values);
//     return values;
// }

function startInitialListeners(socket) {
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    socket.on(
        "connect",
        () => console.log(`connected!`) // : ${JSON.stringify(socket.args)}
    );

    socket.on("connect_error", (err) => {
        console.log("socket connect_err", err);
        if (err.message === "missing required data") {
            showToast("ocorreu um erro ao conectar com socket.io");
        }

        if (err.message === "xhr post error") {
            // removeItems("global", ["chatRoomId", "chatUserId"])
        }
    });
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
