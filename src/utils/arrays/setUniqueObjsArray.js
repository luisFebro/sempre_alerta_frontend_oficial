export default function setUniqueObjsArray(list, filterId) {
    return list.filter(
        (val, ind, selfArr) =>
            selfArr.findIndex((t) => t[filterId] === val[filterId]) === ind
    );
}
