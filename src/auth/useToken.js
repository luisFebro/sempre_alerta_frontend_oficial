import useData from "global-data/useData";
import getVar from "cache/indexedDB";

export default function useToken() {
    const { token } = useData();
    return token;
}

export const chooseHeaderAsync = async ({ needAuth = true }) => {
    if (needAuth) {
        // const [token] = getItems("global", ["token"]);
        // console.log("token: " + token);
        // if(token) {

        // }

        const forageToken = await getVar("token");
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${forageToken}`,
        };

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    }

    return { "Content-Type": "application/json" };
};

// for axios http request
export const chooseHeader = ({ token, needAuth = true }) => {
    if (needAuth) {
        return {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    }

    return { "Content-type": "application/json" };
};
