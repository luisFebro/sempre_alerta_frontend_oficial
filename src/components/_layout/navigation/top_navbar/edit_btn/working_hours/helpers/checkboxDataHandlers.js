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
