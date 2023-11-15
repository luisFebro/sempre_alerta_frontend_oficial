import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";
import formatRelative from "date-fns/formatRelative";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import addMinutes from "date-fns/addMinutes";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import isToday from "date-fns/isToday";
import startOfWeek from "date-fns/startOfWeek";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import isAfter from "date-fns/isAfter";
import set from "date-fns/set";
import getMonth from "date-fns/getMonth";
import { getPureParsedDate } from "./helpers/dateFnsHelpers";
import getDayMonthBr from "./getDayMonthBr"; // 20 de Junho de 2020 is better than 20º de junho, 2020...
import diffInDays from "date-fns/differenceInDays";
import isSameDay from "date-fns/isSameDay";
import isSameHour from "date-fns/isSameHour";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

const localeObj = {
    default: ptBR,
    ptBR,
};

const dateFnsUtils = DateFnsUtils;
const ptBRLocale = ptBR;

const treatZero = (number) => {
    if (Number(number) <= 9) {
        return `0${number}`;
    }
    return number;
};

// tools
const pick = (locale) => (locale ? localeObj[locale] : localeObj.default);
const now = new Date();

const formatDMY = (date, short = false, needYear = true) =>
    getDayMonthBr(date, { needYear, short });
const fromNow = (pastDate, options = {}) => {
    const { locale, addSuffix = true } = options;

    const formatDistanceLocale = {
        lessThanXSeconds: "{{count}} segundo",
        xSeconds: "{{count}} segundo",
        halfAMinute: "30 segundos",
        lessThanXMinutes: "{{count}}",
        xMinutes: "{{count}} minuto",
        aboutXHours: "{{count}} hora",
        xHours: "{{count}} hora",
        xDays: "{{count}} dia",
        aboutXWeeks: "{{count}} semana",
        xWeeks: "{{count}} semana",
        aboutXMonths: "{{count}}",
        xMonths: "{{count}}",
        aboutXYears: "{{count}} ano",
        xYears: "{{count}} ano",
        overXYears: "{{count}} ano",
        almostXYears: "{{count}} ano",
    };

    function formatDistance(token, count, options) {
        // token like xSeconds // count is the correscoiding value
        options = options || {};

        const result = formatDistanceLocale[token].replace("{{count}}", count);
        if (options.addSuffix) {
            const isSingular = count === 1;

            const pickPtBrPlural = () => {
                if (token === "xMonths" || token === "xMonths") {
                    return !isSingular ? " mês" : " meses";
                }
                return isSingular ? "" : "s";
            };

            const plural = pickPtBrPlural();

            // up to 5 seconds since real time in production area is producing 4 seconds ahead
            const needNowTxt =
                count <= 5 &&
                (token === "lessThanXSeconds" || token === "xSeconds");

            if (needNowTxt) return "agora";

            if (options.comparison > 0) {
                return "há " + result + plural; // return "em " + result;
            } else {
                return "há " + result + plural + " atrás";
            }
        }

        return result;
    }

    return formatDistanceToNowStrict(new Date(pastDate), {
        addSuffix,
        locale: {
            ...pick(locale),
            formatDistance,
        },
        includeSeconds: true,
    });
};
// calendar needs a customformatlike ``{ sameElse: 'll'}`` in moment.
const calendar = (date, locale) => {
    return formatRelative(new Date(date), now, {
        locale: pick(locale),
    });
};

const getLocalHour = (date, options = {}) => {
    const { sumup = false } = options;

    if (sumup) {
        const hour = getHours(new Date(date));

        const min = getMinutes(new Date(date));
        const isSingleMinDigit = min <= 9;

        const minOutput = isSingleMinDigit ? `0${min}` : min;
        // every number should have 3 (up to 9 hours) and 4 digits for others.
        // minutes always have 2 digits.
        // If not, 20:00 (20) would be less than 19:30 (1930)

        return Number(String(hour) + String(minOutput));
    }

    return `${getHours(new Date(date))}:${treatZero(
        getMinutes(new Date(date))
    )}`;
};

// targetDate is inclusive. it will only be expired after the targetDate has passed.
// in other words, check if a future date is still pending
const isScheduledDate = (targetDate, options = {}) => {
    const { isDashed = false } = options; // dashed Date = 2020-12-30 format
    if (!targetDate) return null;

    const today = getPureParsedDate(new Date(), { minHour: true });
    const scheduled = getPureParsedDate(targetDate, { isDashed });

    if (today < scheduled) return true;
    return false;
};

const checkToday = (date) => isToday(new Date(date));
const endWeek = endOfWeek(new Date(), { weekStartsOn: 1 });
const startWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
const endMonth = endOfMonth(new Date());

const formatSlashDMY = (newDate = new Date(), customFormat) =>
    format(new Date(newDate), customFormat || "dd/MM/yy");
const formatDate = (newDate = new Date(), param = "dd/MMM") =>
    format(new Date(newDate), param, { locale: pick() });
// n1 - especially useful for expiration date
const setUTCDateTime = (options = {}) => {
    // 4 hour is the most late offset so that we can UTC dates from midnight of the date. If in SP when the UTC offset is 3, it will be triggered 1am and so on... 4 hour offset is only valid in the backend because this date will be handled in a foreign server and UTC is 0, no diff.
    // In frontend, this should be 0 hour as default and it will be converted auto to UTC hour timezone+
    const { date = new Date(), hours = 0, minutes = 0, seconds = 0 } = options;
    return set(new Date(date), { hours, minutes, seconds });
};

const getCurrMonth = (date = new Date()) => {
    const monthes = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];

    const indMonth = getMonth(date);
    return monthes[indMonth];
};

const hasPassedDate = (lateDate, initDate) => {
    // Is the first date after the second one?
    // LESSON: always compare two dates in the same time zone, if the lateDate is UTC, should be converted to local with new Date();

    const currDate = initDate || new Date();
    return isAfter(currDate, new Date(lateDate));
};

export {
    getCurrMonth,
    dateFnsUtils,
    ptBRLocale,
    formatDMY,
    formatSlashDMY,
    formatDate,
    fromNow,
    calendar,
    addDays,
    subDays,
    getLocalHour,
    checkToday,
    isScheduledDate,
    endWeek,
    startWeek,
    isAfter,
    hasPassedDate,
    endMonth,
    setUTCDateTime,
    addMinutes,
    diffInDays,
    isSameDay,
    isSameHour,
};

// reference: https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time
// function convertUTCToLocale(date) {
//     if(typeof date === "string") {
//         date = new Date(date);
//     }

//     var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

//     var offset = date.getTimezoneOffset() / 60;
//     var hours = date.getHours();

//     newDate.setHours(hours - offset);

//     return newDate;
// }

/* COMMENTS
n1:
// some dates should have hour modified so that some cron-jobs can be triggered in the exact date, for instance.
// if a date is recorded with a later hour and a cron-job is triggered by 6am earlier, this means the date will only be triggered next day.
// if desired date is the recorded date, we want this instead a plus day.
// https://www.ursahealth.com/new-insights/dates-and-timezones-in-javascript
*/
