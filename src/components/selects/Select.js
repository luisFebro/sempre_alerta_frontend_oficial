import { Fragment } from "react";
import { default as SelectMu } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function Select({
    label = "Select:",
    currValue = "",
    defaultValue = "",
    valueList = [],
    onSelectCallback,
    autoWidth = false, //If true, the width of the popover will automatically be set according to the items inside the menu, otherwise it will be at least the width of the select input."
    displayEmpty = false, // If true, a value is displayed even if no items are selected. In order to display a meaningful value, a function should be passed to the renderValue prop which returns the value to be displayed when no items are selected. You can only use it when the native prop is false (default).
    multiple = false, //If true, value must be an array and the menu will support multiple selections.
    variant = "standard", // outlined, filled, standard
    fullWidth = false,
}) {
    const handleChange = (event) => {
        onSelectCallback(event.target.value);
    };

    return (
        <Fragment>
            <FormControl variant={variant === "outlined" && "outlined"}>
                <InputLabel>{label}</InputLabel>
                <SelectMu
                    value={currValue || defaultValue}
                    onChange={handleChange}
                    autoWidth={autoWidth}
                    variant={variant === "outlined" ? undefined : variant}
                    multiple={multiple}
                    fullWidth={fullWidth}
                >
                    <MenuItem value="">
                        <em className="text-gray">{label}</em>
                    </MenuItem>
                    {valueList.map((item, ind) => (
                        <MenuItem
                            key={ind}
                            className="text-normal"
                            value={item}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </SelectMu>
                <style jsx global>
                    {`
                        .MuiFormControl-root {
                            min-width: 200px !important;
                        }

                        .MuiList-root li:before {
                            display: none !important;
                        }

                        .MuiSelect-selectMenu {
                            min-height: 2.3em;
                        }

                        .MuiSelect-select {
                            display: flex;
                            align-items: center;
                            font-size: 1.2em !important;
                            font-family: var(--mainFont) !important;
                            padding-left: 5px;
                            color: var(--mainPurple) !important;
                        }

                        .MuiInputLabel-root {
                            font-size: 1.3em;
                        }
                    `}
                </style>
            </FormControl>
        </Fragment>
    );
}

/*
<div id="field6" className="my-3">
    <Select
        margin="dense"
        labelId="gender"
        id="value6"
        onChange={handleChange(setData, data)}
        name="gender"
        fullWidth
        value={gender}
        variant="outlined"
        error={errorGender ? true : false}
        style={{ backgroundColor: "var(--mainWhite)" }}
    >
        <MenuItem value={gender}>
            <span
                className="text-p text-normal"
                style={{
                    fontSize: isSmall ? "1.1em" : "",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                selecione forma tratamento:
            </span>
        </MenuItem>
        <MenuItem value={"Ela"}>Ela</MenuItem>
        <MenuItem value={"Ele"}>Ele</MenuItem>
    </Select>
 */
