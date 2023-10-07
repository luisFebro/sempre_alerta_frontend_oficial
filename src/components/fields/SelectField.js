// prefer this component over Select from selects/Select
import { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import handleChange from "utils/form/use-state/handleChange";
import { InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

/* EXAMPLES
title = "selecione valor:"
valuesArray={[
    { val:"optionA", showVal: "opção A" },
    { val:"optionB", showVal: "opção B" },
]}

 */

// warning: if inside a modal, verify the zIndex in case of not appearing the popup menu. set needIndex={false} to ModalFullContent if this is the case...;
export default function SelectField({
    id,
    title = null, // "selecione:"
    label = null, // "Selecione:"
    width = 300,
    valuesArray,
    rootClassName,
    handleValue,
    defaultValue, // if there is a constant back and forth change
    firstDefault = false, // first item default
    zIndex = 20000,
}) {
    const [data, setData] = useState({
        selected: "",
    });
    const { selected } = data;

    const firstVal =
        defaultValue ||
        (valuesArray && valuesArray.length && valuesArray[0].val);
    const isDefaultValue = Boolean(defaultValue);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            selected: isDefaultValue || firstDefault ? firstVal : title,
        }));
    }, [title, isDefaultValue, firstDefault, firstVal]);

    useEffect(() => {
        if (!selected) return;
        // IMPORTANT: the first selected value is actually the showVal, afterwards it is val (original val)
        if (typeof handleValue === "function") handleValue(selected);
        // eslint-disable-next-line
    }, [selected]);

    return (
        <Box sx={{ width }}>
            <FormControl fullWidth size="lg">
                <InputLabel
                    variant="filled"
                    id="period-filter-label"
                    color="primary"
                >
                    {label}
                </InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    onChange={handleChange(setData, data)}
                    name="selected"
                    value={selected}
                    variant="filled"
                    error={false}
                    style={{
                        background: "#ffff",
                        color: "var(--themeS)",
                        fontSize: 23,
                        top: 25,
                    }}
                >
                    {(typeof title === "string" ||
                        typeof label === "string") && (
                        <MenuItem value={selected}>
                            <span
                                className="text-p text-normal"
                                style={{
                                    fontSize: "1.2em",
                                    fontFamily: "Poppins, sans-serif",
                                }}
                            >
                                {label || title}
                            </span>
                        </MenuItem>
                    )}
                    {valuesArray &&
                        valuesArray.map((elem, ind) => (
                            <MenuItem key={ind} value={elem.val}>
                                {elem.showVal}
                            </MenuItem>
                        ))}
                </Select>
                <style jsx global>
                    {`
                        .MuiMenuItem-root.MuiListItem-root,
                        .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu {
                            font-size: 1.2rem;
                            color: var(--themeS);
                        }
                        .MuiPopover-root {
                            z-index: ${zIndex} !important;
                        }
                    `}
                </style>
            </FormControl>
        </Box>
    );
}
