import setUniqueObjsArray from "utils/arrays/setUniqueObjsArray";
import updateObjInArray from "utils/arrays/updateObjInArray";

export function addItem(newItem, setList) {
    setList((prevList) => setUniqueObjsArray([newItem, ...prevList], "userId"));
}

export function updateItem(updatedItem, setList) {
    // n1
    setList((prevList) =>
        updateObjInArray(prevList, updatedItem, {
            filterId: "userId",
        })
    );
}

export function removeItem(userId, setList) {
    setList((prevList) => prevList.filter((item) => item.userId !== userId));
}

/* n1
doesn't require full object, only the fields which need to be updated like:
updateItem({ alertId, status: "canceled" }, setData);

/*

// HELPERS
// function shuffleArray(array = []) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// END HELPERS

/* ARCHIVES


    function insert() {
        const newItem = {
            userId: getId() + "@gmail.com",
    
        };

        setData((prev) => ({
            ...prev,
            list: [newItem, ...prev.list],
            updateListId: getId(),
        }));
    }

function insert() {
        const newItem = {
            id: getId() + "@gmail.com",
            lastConnectAttemptDate: !isConnList ? new Date() : null,
            lastConnectedDate: isConnList ? new Date() : null,
            status: isConnList ? 1 : 2,
        };

        setData((prev) => ({
            ...prev,
            list: [newItem, ...prev.list],
            updateListId: getId(),
        }));
    }

    const removeItem = () => {
        if (!list || !list.length) return;

        list.shift();
        setData((prev) => ({
            ...prev,
            updateListId: getId(),
        }));
    };


*/
