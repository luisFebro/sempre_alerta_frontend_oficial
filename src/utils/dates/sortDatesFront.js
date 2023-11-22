/**
 * [sortDates]
 * @param  {Array} dates [an array with objects]
 * @param  {String} sortBy
 * @param  {String} target [the element which is the date to be sorted like createdAt]
 * @return {Array} Array with sorted dates
 */
export default function sortDatesFront(obj, options = {}) {
    const { sortBy = "latest", target = "createdAt" } = options;

    const newArrayWithObjDate = obj || [];

    const validSort = ["latest", "oldest"];
    if (!validSort.includes(sortBy))
        return console.log("sortBy can only be these values: " + validSort);

    if (sortBy === "latest") {
        newArrayWithObjDate.sort((a, b) => {
            // equal items sort equally
            if (a[target] === b[target]) {
                return 0;
            }

            // nulls sort after anything else
            if (!a[target]) {
                return 1;
            }

            if (!b[target]) {
                return -1;
            }

            return (
                new Date(b[target]).getTime() - new Date(a[target]).getTime()
            );
        }); // n1
    } else {
        newArrayWithObjDate.sort(
            (a, b) =>
                new Date(a[target]).getTime() - new Date(b[target]).getTime()
        );
    }

    return newArrayWithObjDate;
}

/* COMMENTS
n1: about getTime()
The getTime() method returns the number of milliseconds* since the Unix Epoch.

const moonLanding = new Date('July 20, 69 00:20:18 GMT+00:00');

// milliseconds since Jan 1, 1970, 00:00:00.000 GMT
console.log(moonLanding.getTime());
// expected output: -14254782000
*/
