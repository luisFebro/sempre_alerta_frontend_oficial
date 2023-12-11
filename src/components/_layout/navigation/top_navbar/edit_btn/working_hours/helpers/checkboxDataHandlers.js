import getMinMaxObjInArray from "utils/arrays/getMinMaxObjInArray";
import { getLocalHour } from "utils/dates/dateFns";

export function getCheckboxData(dbList = []) {
    return [
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado",
        "Domingo",
    ].map((itemLabel, ind) => {
        const currDbData = dbList[ind];

        return {
            label: itemLabel,
            checked: currDbData.isDayOn,
            fieldData: {
                alertOnAt: new Date(currDbData.raw[0]),
                alertOffAt: new Date(currDbData.raw[1]),
            },
            fieldError: {
                alertOnAt: false,
                alertOffAt: false,
            },
        };
    });
}

export function convertCheckboxDataToList(dataCheckbox = []) {
    return dataCheckbox.map((elem = {}) => {
        const handleDay = () => {
            const label = elem.label.toLowerCase();

            const weekdayMappings = {
                "segunda-feira": "monday",
                "terça-feira": "tuesday",
                "quarta-feira": "wednesday",
                "quinta-feira": "thursday",
                "sexta-feira": "friday",
                sábado: "saturday",
                domingo: "sunday",
            };

            return weekdayMappings[label];
        };

        const alertOnAtDate = elem.fieldData && elem.fieldData.alertOnAt;
        const alertOffAtDate = elem.fieldData && elem.fieldData.alertOffAt;

        return {
            day: handleDay(),
            isDayOn: elem.checked,
            display: [
                getLocalHour(alertOnAtDate),
                getLocalHour(alertOffAtDate),
            ],
            weight: [
                getLocalHour(alertOnAtDate, {
                    weight: true,
                }),
                getLocalHour(alertOffAtDate, {
                    weight: true,
                }),
            ],
            raw: [alertOnAtDate, alertOffAtDate],
        };
    });
}

export function getCheckboxDisplayData(cachedList = []) {
    const onlyAvailableDaysList = [];
    const sequenceDaysOnList = [];

    cachedList.forEach((elem = {}) => {
        // n1 data example
        const weekdayTranslations = {
            monday: "Segunda",
            tuesday: "Terça",
            wednesday: "Quarta",
            thursday: "Quinta",
            friday: "Sexta",
            saturday: "Sábado",
            sunday: "Domingo",
        };

        const weekdayTranslationsAbbreviated = {
            monday: "Seg.",
            tuesday: "Ter.",
            wednesday: "Qua.",
            thursday: "Qui.",
            friday: "Sex.",
            saturday: "Sáb.",
            sunday: "Dom.",
        };

        const finalData = {
            day: weekdayTranslations[elem.day],
            dayShort: weekdayTranslationsAbbreviated[elem.day],
            display: [elem.display[0], elem.display[1]],
            weight: [elem.weight[0], elem.weight[1]],
        };

        if (elem.isDayOn) {
            onlyAvailableDaysList.push(finalData);
            sequenceDaysOnList.push(1);
        } else {
            sequenceDaysOnList.push(0);
        }
    });

    let alertStartDay = null;
    let alertEndDay = null;
    let gotWeekDayGaps = false;
    let keepSequence = true;
    let keepSequenceCount = 0;
    let alertDaysOnCount = 0;
    let alertDaysOffCount = 0;

    let displayEarliestHour = null;
    let displayLatestHour = null;

    const isAlertsDisabled =
        Boolean(onlyAvailableDaysList && onlyAvailableDaysList.length) ===
        false;

    const isSingleDayMarked =
        onlyAvailableDaysList && onlyAvailableDaysList.length === 1;

    // LIMITATION: if not selected two sequential days off (except weekends), it will display each day, not such a such day
    if (!isAlertsDisabled) {
        const dataMinMax = getMinMaxWeekDaysData(onlyAvailableDaysList);
        displayEarliestHour = dataMinMax.displayEarliestHour;
        displayLatestHour = dataMinMax.displayLatestHour;

        alertStartDay = onlyAvailableDaysList[0].dayShort;

        const indLastOne = onlyAvailableDaysList.length - 1;
        alertEndDay = onlyAvailableDaysList[indLastOne].dayShort;

        sequenceDaysOnList.forEach((elem, ind) => {
            const maxInd = sequenceDaysOnList.length - 1; // always 6

            if (elem === 1) ++alertDaysOnCount;
            else ++alertDaysOffCount;

            if (keepSequence && elem === 1) ++keepSequenceCount;
            else keepSequence = false;

            const saturday = sequenceDaysOnList[maxInd - 1];
            const sunday = sequenceDaysOnList[maxInd];
            const isWeekendDaysOff = `${saturday}${sunday}` === "00";

            const firstElem = elem;
            const secondElem =
                sequenceDaysOnList[ind + 1 >= maxInd ? maxInd : ind + 1];
            const thirdElem =
                sequenceDaysOnList[ind + 2 >= maxInd ? maxInd : ind + 2];

            const sequenceCode = Number(
                `${firstElem}${secondElem}${thirdElem}`
            );

            const gotGap =
                sequenceCode === 101 ||
                (alertDaysOffCount >= 2 && !isWeekendDaysOff) ||
                alertDaysOffCount > alertDaysOnCount;
            if (gotGap) gotWeekDayGaps = true;
        });

        const noGapConds = keepSequenceCount >= 3 && !gotWeekDayGaps;
        if (noGapConds) gotWeekDayGaps = false;
    }

    // if user doesn't check any day, show "alertas desativados".
    // if user only marks one day, show `Só Segunda`
    // if day off only saturday and sunday: format: Segunda a Sexta
    // if there is day off between weekdays and thus with gaps and not sequential: format: Seg., Quar., Sex e Dom.

    const handleDisplayDays = () => {
        if (isAlertsDisabled) return "desativados";
        if (isSingleDayMarked) return `Só ${onlyAvailableDaysList[0].day}`;

        if (gotWeekDayGaps) {
            return onlyAvailableDaysList.map((elem, ind) => {
                const isLastOne = ind === onlyAvailableDaysList.length - 1;
                const isLastButOneItem =
                    ind === onlyAvailableDaysList.length - 2;

                const handleWeekDayGapsDisplay = () => {
                    if (isLastButOneItem)
                        return elem.dayShort.replace(".", " e ");

                    return !isLastOne
                        ? elem.dayShort.replace(".", ", ")
                        : elem.dayShort;
                };

                return handleWeekDayGapsDisplay();
            });
        }
        return `${alertStartDay} a ${alertEndDay}`;
    };

    return {
        displayDays: handleDisplayDays(),
        displayEarliestHour,
        displayLatestHour,
        isAlertsDisabled,
        gotWeekDayGaps,
        isSingleDayMarked,
    };
}

// HELPERS
function getMinMaxWeekDaysData(list = []) {
    const earliestItem = getMinMaxObjInArray(
        "min",
        list,
        (obj) => obj.weight[0]
    );

    const earliestHour = earliestItem.display[0];
    // const earliestHourDayShort = earliestItem.dayShort;

    const latestItem = getMinMaxObjInArray("max", list, (obj) => obj.weight[1]);

    const latestHour = latestItem.display[1];
    // const latestHourDayShort = latestItem.dayShort;

    return {
        displayEarliestHour: `hora + cedo: <span className="text-white">${earliestHour}</span>`, //  (${earliestHourDayShort})
        displayLatestHour: `hora + tarde: <span className="text-white">${latestHour}</span>`, // (${latestHourDayShort})
    };
}

/* NOTES
N1
const alertDaysData = [
        {
            day: "Segunda",
            dayShort: "Seg.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Terça",
            dayShort: "Ter.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Quarta",
            dayShort: "Qua.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Quinta",
            dayShort: "Qui.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Sexta",
            dayShort: "Sex.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Sábado",
            dayShort: "Sab.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Domingo",
            dayShort: "Dom.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
    ];

*/

// const defaultFields = {
//     fieldData: {
//         alertOnAt: new Date(),
//         alertOffAt: new Date(),
//     },
//     fieldError: {
//         alertOnAt: false,
//         alertOffAt: false,
//     },
// };

// const [dataCheckbox, updateCheckbox] = useState([
//     {
//         label: "Segunda-Feira",
//         checked: false,
//         fieldData: defaultFields.fieldData,
//         fieldError: defaultFields.fieldError,
//     },
//     {
//         label: "Terça-Feira",
//         checked: false,
//         fieldData: defaultFields.fieldData,
//         fieldError: defaultFields.fieldError,
//     },
//     {
//         label: "Quarta-Feira",
//         checked: false,
//         fieldData: defaultFields.fieldData,
//         fieldError: defaultFields.fieldError,
//     },
//     {
//         label: "Quinta-Feira",
//         checked: false,
//         fieldData: defaultFields.fieldData,
//         fieldError: defaultFields.fieldError,
//     },
//     {
//         label: "Sexta-Feira",
//         checked: false,
//         fieldData: defaultFields.fieldData,
//         fieldError: defaultFields.fieldError,
//     },
//     {
//         label: "Sábado",
//         checked: false,
//         fieldData: defaultFields.fieldData,
//         fieldError: defaultFields.fieldError,
//     },
//     {
//         label: "Domingo",
//         checked: false,
//         fieldData: defaultFields.fieldData,
//         fieldError: defaultFields.fieldError,
//     },
// ]);

// const alertWorkingHours = [
//     {
//         day: "monday",
//         isDayOn: true,
//         display: ["7:00", "18:00"],
//         weight: [700, 1800],
//         raw: [
//            new Date("2023-12-29T10:00:00.000+00:00"),
//            new Date("2023-11-17T21:00:32.673+00:00"),
//         ],
//     },
//     {
//         day: "tuesday",
//         isDayOn: true,
//         display: ["7:00", "18:00"],
//         weight: [700, 1800],
//         raw: [
//             new Date("2023-12-29T10:00:00.000+00:00"),
//             new Date("2023-11-17T21:00:32.673+00:00"),
//         ],
//     },
//     {
//         day: "wednesday",
//         isDayOn: true,
//         display: ["7:00", "18:00"],
//         weight: [700, 1800],
//         raw: [
//             new Date("2023-12-29T10:00:00.000+00:00"),
//             new Date("2023-11-17T21:00:32.673+00:00"),
//         ],
//     },
//     {
//         day: "thursday",
//         isDayOn: true,
//         display: ["7:00", "18:00"],
//         weight: [700, 1800],
//         raw: [
//             new Date("2023-12-29T10:00:00.000+00:00"),
//             new Date("2023-11-17T21:00:32.673+00:00"),
//         ],
//     },
//     {
//         day: "friday",
//         isDayOn: true,
//         display: ["7:00", "18:00"],
//         weight: [700, 1800],
//         raw: [
//             new Date("2023-12-29T10:00:00.000+00:00"),
//             new Date("2023-11-17T21:00:32.673+00:00"),
//         ],
//     },
//     {
//         day: "saturday",
//         isDayOn: true,
//         display: ["0:00", "18:00"],
//         weight: [100, 1800],
//         raw: [
//             new Date("2023-12-29T10:00:00.000+00:00"),
//             new Date("2023-11-17T21:00:32.673+00:00"),
//         ],
//     },
//     {
//         day: "sunday",
//         isDayOn: false,
//         display: ["7:00", "18:00"],
//         weight: [700, 1800],
//         raw: [
//             new Date("2023-12-29T10:00:00.000+00:00"),
//             new Date("2023-11-17T21:00:32.673+00:00"),
//         ],
//     },
// ];
