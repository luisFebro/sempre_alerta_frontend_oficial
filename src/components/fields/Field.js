import { useCallback } from "react";
import TextField from "@mui/material/TextField";
import { handleEnterPress, handleOnChange } from "./helpers/index";
import debounce from "utils/performance/debounce";

export default function Field({
    size = "normal",
    textAlign = "text-left",
    name,
    value,
    onChange,
    error,
    placeholder,
    autoComplete = "off",
    variant = "outlined",
    enterCallback,
    onChangeCallback,
    backgroundColor = "var(--mainWhite)",
    multiline = false,
    rows = 3,
    fullWidth = true,
    debounceCallback,
}) {
    const sizes = ["small", "medium", "large"];
    const variants = ["filled", "outlined", "standard"];
    const textAligns = ["text-center", "text-left"];
    if (!sizes.includes(size)) throw new Error("Invalid field size");
    if (!variants.includes(variant)) throw new Error("Invalid variant");
    if (!textAligns.includes(textAlign)) throw new Error("Invalid text align");

    // Warning: use a <form></form> wrapper to a group or even an individual field.
    // TextField is simply rendered as a raw <input /> tag

    // do not use a () => for debounce. If not function, it will return nothing only.
    const handler = useCallback(debounce(debounceCallback), []);

    return (
        <section className="field">
            <TextField
                className={`${size} ${textAlign}`}
                placeholder={placeholder}
                name={name}
                value={value}
                variant={variant}
                onChange={(e) => {
                    handleOnChange(e, onChangeCallback);
                    debounceCallback && handler();
                }}
                onKeyPress={(e) => {
                    handleEnterPress(e, enterCallback);
                }}
                error={error}
                autoComplete={autoComplete}
                multiline={multiline ? true : false}
                rows={multiline ? rows : undefined}
                fullWidth={fullWidth}
            />
            <style jsx global>
                {`
                    .field .MuiInputBase-input {
                        background-color: ${backgroundColor} !important;
                        z-index: 2000;
                        color: var(--themeP) !important;
                        font: var(--mainFont);
                        padding: 10px;
                    }

                    .large {
                        margin: 0 5px !important;
                    }

                    .large div .MuiInputBase-input {
                        font-size: 2.5em;
                    }

                    .large div .MuiInputBase-input .MuiOutlinedInput-input {
                        padding: 10.5px 14px;
                    }

                    .medium div .MuiInputBase-input {
                        font-size: 1.5em;
                    }

                    .small div .MuiInputBase-input {
                        font-size: 1em;
                    }

                    .text-left div .MuiInputBase-input {
                        text-align: left !important;
                    }

                    .text-center div .MuiInputBase-input {
                        text-align: center !important;
                    }
                `}
            </style>
        </section>
    );
}

/*
InputProps={{
    style: styles.fieldFormValue, // alignText is not working here... tried input types and variations
}}
inputProps={{ style: styles.input }}
 */
