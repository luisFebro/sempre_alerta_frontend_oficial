import useData from "init";

export default function useAuth() {
    const [success] = useData(["success"], {
        dots: false,
    });

    // token needs to be consistent and not wait loading to avoid possible variable of false/true status
    const token = null;

    // success is an empty {} if the user collection is removed. But user collection removal is no longer made
    return Boolean(token || success);
}
