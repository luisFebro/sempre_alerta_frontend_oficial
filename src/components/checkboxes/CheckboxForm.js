import { useState, useEffect, useRef } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import getId from "utils/getId";

const getStatusWithId = (bool) => `${bool}_${getId()}`;

export default function CheckBoxForm({
    text,
    setIsBoxChecked,
    defaultState = false,
    data = "",
    callback,
    position,
    margin,
    txtFontweight,
    onClick,
    needId = false,
    color,
    txtColor = "text-white",
}) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (defaultState) setIsChecked(defaultState);
    }, [defaultState]);

    const embededData = useRef(data).current;

    useEffect(() => {
        const thisIsChecked = needId ? getStatusWithId(isChecked) : isChecked;
        setIsBoxChecked && setIsBoxChecked(thisIsChecked, embededData);
        callback && callback();
    }, [isChecked]);

    const handleChange = (event) => {
        setIsChecked(!isChecked);
    };

    const showText = () => (
        <p
            className={`${
                txtFontweight ? "font-weight-bold" : ""
            } text-small ${txtColor}`}
            style={{ margin: 0 }}
        >
            {text}
        </p>
    );

    return (
        <div
            className={`${position || "flex justify-center"}`}
            style={{ width: "100%", margin }}
        >
            <FormControlLabel
                className={position ? "" : "ml-2"}
                control={
                    <Checkbox
                        checked={Boolean(isChecked)}
                        onClick={onClick}
                        onChange={() => handleChange()}
                        color="primary"
                        style={{ color: color || undefined }}
                    />
                }
                label={showText()}
                position="end"
            />
        </div>
    );
}
