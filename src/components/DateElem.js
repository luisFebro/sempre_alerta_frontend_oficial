import { formatFree, parseISO } from "../utils/dates/dateFns";
// 29 de Novembro, 2020
export default function DateElem({ dateString }) {
    const date = parseISO(dateString); // n1 n2 about dateTime attr

    return (
        <time dateTime={date}>
            {formatFree(dateString, "d 'de' LLLL, yyyy")}
        </time>
    );
}

/* COMMENTS
n1: The datetime attribute of this element is used translate the time into a machine-readable format so that browsers can offer to add date reminders through the user's calendar, and search engines can produce smarter search results.

n2: parseISO
// Convert string '2014-02-11T11:30:30' to date:
var result = parseISO('2014-02-11T11:30:30')
//=> Tue Feb 11 2014 11:30:30
*/
