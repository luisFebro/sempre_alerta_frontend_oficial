import { useCallback } from "react";
import TextField from "@mui/material/TextField";
import debounce from "utils/performance/debounce";
import { handleEnterPress, handleOnChange } from "./helpers/index";
import { Box, InputAdornment } from "@mui/material";

// Warning: use a <form></form> wrapper to a group or even an individual field.
// TextField is simply rendered as a raw <input /> tag

export default function Field({
    id,
    label,
    size = "medium",
    textAlign = "text-left",
    name,
    value = " ",
    // onChange,
    error,
    placeholder,
    autoFocus = false,
    autoComplete = "off",
    variant = "outlined",
    enterCallback = () => null,
    onChangeCallback = () => null,
    multiline = false,
    width,
    rows = 1,
    fullWidth = true,
    debounceCallback = () => null,
    zIndex = 0,
    maxLength,
    maxWitdth = 500,
    classNameRoot = "", // px-2 md:px-5
    FieldIcon,
    callbackEventOnly = false,
    disabled = false,
    txtColor = "var(--themeS)",
    fancyMode = false,
}) {
    //
    if (!name) throw new Error("it requires to pass name and value params");
    const sizes = ["small", "medium", "large"];
    const variants = ["filled", "outlined", "standard"];
    const textAligns = ["text-center", "text-left"];
    if (!sizes.includes(size)) throw new Error("Invalid field size");
    if (!variants.includes(variant)) throw new Error("Invalid variant");
    if (!textAligns.includes(textAlign)) throw new Error("Invalid text align");

    // do not use a () => for debounce. If not function, it will return nothing only.
    const handler = useCallback(debounce(debounceCallback), []);

    const getInputProps = FieldIcon
        ? {
              startAdornment: (
                  <InputAdornment position="start">{FieldIcon}</InputAdornment>
              ),
          }
        : undefined;

    return (
        <div className={`single-field--root field ${classNameRoot}`}>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": {
                        width: width || "100%",
                        maxWidth: fullWidth ? undefined : maxWitdth,
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label={label}
                    id={id}
                    className={`${size} ${textAlign}`}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    variant={variant}
                    onChange={(e) => {
                        if (callbackEventOnly) return onChangeCallback(e);
                        handleOnChange(e, onChangeCallback);
                        if (debounceCallback) handler();
                    }}
                    onKeyPress={(e) => {
                        handleEnterPress(e, enterCallback);
                    }}
                    error={error}
                    autoComplete={autoComplete}
                    multiline={multiline}
                    rows={multiline ? rows : undefined}
                    inputProps={{
                        maxLength: maxLength,
                    }}
                    autoFocus={autoFocus}
                    InputProps={getInputProps}
                    disabled={disabled}
                />
            </Box>
            {fancyMode && (
                <style jsx>{`
                    .single-field--root .MuiOutlinedInput-root,
                    .single-field--root .MuiInputBase-root {
                        border-radius: 25px;
                        border-width: 4px;
                        border-color: var(--grayDark);
                    }
                    .single-field--root .MuiOutlinedInput-root:hover {
                        border-color: var(--themeP);
                    }
                `}</style>
            )}
            <style jsx>
                {`
                    .single-field--root.field.width${width}
                        .MuiFormControl-root {
                        width: ${width ? `${width}px` : "none"};
                    }
                `}
            </style>
            <style jsx>
                {`
                    .single-field--root.field .MuiInputBase-input {
                        // background-color: var(--mainWhite) !important;
                        z-index: 2000;
                        color: ${txtColor} !important;
                        font: var(--mainFont);
                        //padding: 10px;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .single-field--root.field .large {
                        margin: 0 5px !important;
                    }

                    .single-field--root.field .large div .MuiInputBase-input {
                        font-size: 2.5em;
                    }

                    .single-field--root.field
                        .large
                        div
                        .MuiInputBase-input
                        .MuiOutlinedInput-input {
                        padding: 10.5px 14px;
                    }

                    .single-field--root.field .medium div .MuiInputBase-input {
                        font-size: var(--mainTxtSize);
                    }

                    .single-field--root.field .small div .MuiInputBase-input {
                        font-size: 1em;
                    }

                    .single-field--root.field
                        .text-left
                        div
                        .MuiInputBase-input {
                        text-align: left !important;
                    }

                    .single-field--root.field
                        .text-center
                        div
                        .MuiInputBase-input {
                        text-align: center !important;
                    }
                `}
            </style>
            <style jsx>
                {`
                    .single-field--root.field .MuiInputBase-input {
                        z-index: ${zIndex} !important;
                    }
                `}
            </style>
        </div>
    );
}
