import { useEffect } from "react";
import { getCheckboxData } from "./helpers/checkboxDataHandlers";

export default function useUpdateCheckboxesData({ list = [], updateCheckbox }) {
    const listSize = Boolean(list && list.length);

    useEffect(() => {
        if (listSize) updateCheckbox(getCheckboxData(list));
    }, [listSize]);
}
