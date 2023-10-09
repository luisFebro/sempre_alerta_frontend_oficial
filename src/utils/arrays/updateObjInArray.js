import isObj from "utils/isObj";
import setUniqueObjsArray from "./setUniqueObjsArray";

// INSTRUCTION
// add or update unique objs in an array.
// new data can be either an obj or array
// newData replaces the found id in the arr.
// if mergeNewData, the newData will be merged with current id in the arr instead of replace it altogether.
export default function updateObjInArray(mainArr = [], newData, options = {}) {
    const { filterId = "id", mergeNewData = true } = options;

    // VALIDATION
    if (!Array.isArray(mainArr))
        throw new Error("first param should be an array");
    // END VALIDATION

    const isNewDataObj = isObj(newData, { noArrays: true });

    // Merge data with old one
    if (mergeNewData) {
        const newDataList = isNewDataObj ? [newData] : newData;

        // set old data first as priority and then add new data if any
        const shapedArray = isNewDataObj
            ? [...mainArr, newData]
            : [...mainArr, ...newData];
        const finalList = !newData ? mainArr : shapedArray;

        // merge data from objects by id
        const finalResult = setUniqueObjsArray(
            finalList.map((elem1) => ({
                ...elem1,
                ...newDataList.find(
                    (elem2) => elem2[filterId] === elem1[filterId]
                ),
            })),
            filterId
        );
        return finalResult || [];
    }

    // Replace new data with old one
    const shapedArray = isNewDataObj
        ? [newData, ...mainArr]
        : [...newData, ...mainArr];
    const finalList = !newData ? mainArr : shapedArray;

    return setUniqueObjsArray(finalList, filterId) || [];
}

// HELPERS

// TEST ZONE
// function isObj(value, options = {}) {
//     const { noArrays = true } = options;

//     const type = typeof value;
//     const generalRes = !!value && (type === "object" || type === "function");

//     if (noArrays) {
//         const isArrayObj = Array.isArray(value);
//         return !isArrayObj && generalRes;
//     }

//     return generalRes;
// }

// TEST with newData as Obj
// const newData = { id: 123, a: 12345, b: 12345, c: 12345 };
// const prevList = [
//     { id: 123, a: 8, b: 10 },
//     { id: 456, a: 1, b: 2 },
//     { id: 789, a: 1, b: 2 },
// ];
// console.log("listNewDataAsObj", updateUniqueObjsInArray(prevList, newData));

// output
// listNewDataAsObj [
//     { id: 123, a: 12345, b: 12345, c: 12345 },
//     { id: 456, a: 1, b: 2 },
//     { id: 789, a: 1, b: 2 }
//   ]

// TEST newData as Array
// const newData = [
//     { id: 123, a: 12345, b: 12345, c: 12345 },
//     { id: 555, a: 999 },
//     { id: 666, a: 999 },
// ];
// const prevList = [
//     { id: 123, a: 8, b: 10 },
//     { id: 456, a: 1, b: 2 },
//     { id: 789, a: 1, b: 2 },
// ];
// console.log("listNewDataAsObj", updateUniqueObjsInArray(prevList, newData));
// output
// listNewDataAsObj [
//     { id: 123, a: 12345, b: 12345, c: 12345 },
//     { id: 456, a: 1, b: 2 },
//     { id: 789, a: 1, b: 2 },
//     { id: 555, a: 999 },
//     { id: 666, a: 999 }
//   ]

/* ARCHIVES

reference: https://stackoverflow.com/questions/54134156/javascript-merge-two-arrays-of-objects-only-if-not-duplicate-based-on-specifi

function mergeUniqueObjArrays(initialArray, newArray, id = "_id") {
    const ids = new Set(initialArray.map((d) => d[id]));
    const merged = [
        ...initialArray,
        ...newArray.filter((d) => !ids.has(d[id])),
    ];
    return merged;
}

*/
