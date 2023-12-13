import convertPhoneStrToInt from "utils/numbers/convertPhoneStrToInt";
import autoPhoneMask from "utils/validation/masks/autoPhoneMask";

export function addNumberAlertList({
    isAuthority,
    allMarkedAlerts,
    userPhone,
    isPhoneWhatsapp,
}) {
    if (isAuthority) {
        return allMarkedAlerts.map((elem) => {
            const handleType = () => {
                const label = elem.label;
                if (label === "Whatsapp") return "whatsapp";
                if (label === "SMS") return "sms";
                return "ligação";
            };

            console.log(
                "convertPhoneStrToInt(elem.fieldData): " +
                    convertPhoneStrToInt(elem.fieldData)
            );
            return {
                contact: convertPhoneStrToInt(elem.fieldData),
                type: handleType(),
            };
        });
    } else {
        // admin, team
        return [
            {
                contact: convertPhoneStrToInt(userPhone),
                type: isPhoneWhatsapp ? "whatsapp" : "sms",
            },
        ];
    }
}

export function getNumberAlertListToData({
    isAuthority,
    numberAlertList = [],
}) {
    if (isAuthority) {
        return ["Ligação", "SMS", "Whatsapp"].map((itemLabel) => {
            const handleFieldTitle = () => {
                if (itemLabel === "Whatsapp")
                    return "Informe número de Whatsapp:";
                if (itemLabel === "SMS") return "Informe número de SMS:";

                return "Informe telefone fixo ou celular:";
            };

            let checkboxData = {
                label: itemLabel,
                checked: false,
                fieldData: "",
                fieldTitle: handleFieldTitle(),
                fieldError: false,
            };

            const foundAddedItem = numberAlertList.find((elem) => {
                return elem.type.toLowerCase() === itemLabel.toLowerCase();
            });

            if (foundAddedItem) {
                checkboxData = {
                    ...checkboxData,
                    checked: true,
                    fieldData: autoPhoneMask(String(foundAddedItem.contact)),
                };
            }

            return checkboxData;
        });
    } else {
        // admin or team
        const { type, contact } = numberAlertList[0];
        const isWhatsup = type === "whatsapp";

        return {
            isPhoneWhatsapp: isWhatsup,
            userPhone: autoPhoneMask(String(contact)),
        };
    }
}
