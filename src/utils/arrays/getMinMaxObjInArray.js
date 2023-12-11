export default function getMinMaxObjInArray(
    type = "min",
    list = [],
    getData = () => null
) {
    if (!list || !list.length) return [];

    const getMainCond = (prev, curr) =>
        type === "min"
            ? getData(prev) < getData(curr)
            : getData(prev) > getData(curr);

    return (
        list.reduce((prev, curr) =>
            prev && getMainCond(prev, curr) ? prev : curr
        ) || {}
    );
}
