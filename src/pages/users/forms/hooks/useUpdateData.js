import { useEffect } from "react";
import { getNumberAlertListToData } from "../helpers/numberAlertList";

export default function useUpdateData({
    updateData,
    isAuthority,
    setData,
    updateCheckbox,
}) {
    useEffect(() => {
        if (updateData) {
            const numberAlertList = updateData.numberAlertList;

            if (isAuthority) {
                setData((prev) => ({
                    ...prev,
                    userId: updateData.userId,
                    userName: updateData.userName,
                }));

                updateCheckbox(
                    getNumberAlertListToData({
                        isAuthority: true,
                        numberAlertList,
                    })
                );
            } else {
                setData((prev) => ({
                    ...prev,
                    userId: updateData.userId,
                    userName: updateData.userName,
                    ...getNumberAlertListToData({
                        isAuthority: false,
                        numberAlertList,
                    }),
                }));
            }
        }
    }, [isAuthority]);
}
