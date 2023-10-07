import { TextField } from "@mui/material";
import handleChange from "utils/form/use-state/handleChange";

const getStyles = () => ({
    fieldFormValue: {
        backgroundColor: "var(--mainWhite)",
        color: "var(--themeP)",
        fontSize: "20px",
        fontFamily: "var(--mainFont)",
    },
});

export default function CommentField({
    setValue,
    name = "someName",
    value,
    rows = 5,
    placeholder = "escreva seu comentário",
    maxLen = 300,
    maxLenColor = "gray",
    maxLenTxtSize = "0-9",
}) {
    const styles = getStyles();

    return (
        <>
            <TextField
                multiline
                placeholder={placeholder}
                rows={rows}
                InputProps={{
                    style: styles.fieldFormValue,
                }}
                // eslint-disable-next-line
                inputProps={{
                    maxLength: maxLen,
                }}
                name={name}
                value={value}
                onChange={(e) => handleChange(setValue)(e)}
                onBlur={null}
                variant="outlined"
                fullWidth
            />
            <div className={`mt-2 relative text-${maxLenColor}-500 text-left`}>
                <span
                    className={`font-site text-em-${maxLenTxtSize} font-bold`}
                >
                    {value ? value.length : 0}/{maxLen} caracteres
                </span>
            </div>
        </>
    );
}
