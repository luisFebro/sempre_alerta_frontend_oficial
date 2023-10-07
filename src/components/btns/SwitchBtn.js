import { useState, useRef, useEffect } from "react";
import { Switch } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { purple } from "@mui/material/colors";
import parse from "html-react-parser";
import getId from "utils/getId";

export { treatBoolStatus } from "api/trigger";

const getStyles = ({ pillStyle, pillBack }) => ({
    pill: pillStyle
        ? {
              background: pillBack || "rgb(202, 211, 200, .4)",
              padding: "5px 8px",
              borderRadius: "30px",
          }
        : undefined,
});

const useStyles = makeStyles((theme) => ({
    switchBase: {
        color: (props) => props.darkColor || purple[300],
        "&$checked": {
            color: (props) => props.lightColor || purple[500],
        },
        "&$checked + $track": {
            backgroundColor: (props) => props.lightColor || purple[500],
        },
    },
    checked: {
        color: (props) => props.lightColor || purple[500],
    },
    track: {
        backgroundColor: (props) => props.darkColor || purple[300],
    },
}));

const getStatusWithId = (bool) => `${bool}_${getId()}`;

// BUG: when defaultStatus is true, the values are fetched as false is selected!
export default function SwitchBtn({
    titleLeft = "Não",
    titleRight = "Sim",
    titleQuestion = "",
    callback,
    defaultStatus = false,
    data = "",
    pillStyle = false,
    pillBack,
    customColor,
    thisSColor = undefined,
    animationOn = true,
    needCustomColor = false,
    needSameColor = false, // only the turn-on mode color will be displayed
    loading = false,
    disabled = false,
    disableToLeft = false,
    disableToRight = false,
    disableToLeftCallback = () => null,
    disableToRightCallback = () => null,
}) {
    const [checked, setChecked] = useState(defaultStatus);
    const isRight = checked && checked.toString().includes("true");
    const needDisableToLeft = isRight && disableToLeft;
    const needDisableToRight = !isRight && disableToRight;

    useEffect(() => {
        if (defaultStatus) setChecked(true);
    }, [defaultStatus]);

    const switchData = useRef(data);

    const sColor = "#000000";

    const styles = getStyles({ pillStyle, pillBack });

    const handleClassColors = () => {
        const defaultLightColor = needCustomColor
            ? `var(--themeSLight--${thisSColor || sColor})`
            : undefined;

        if (needSameColor)
            return {
                darkColor: defaultLightColor,
                lightColor: defaultLightColor,
            };

        return {
            darkColor: needCustomColor
                ? `var(--themeSDark--${thisSColor || sColor})`
                : undefined,
            lightColor: defaultLightColor,
        };
    };

    const classes = useStyles(handleClassColors());

    const handleChange = (event) => {
        if (needDisableToLeft) return disableToLeftCallback();
        if (needDisableToRight) return disableToRightCallback();

        const status = event.target.checked;
        const statusId = getStatusWithId(status);

        if (typeof callback === "function")
            callback(statusId, switchData.current);
        return setChecked(status);
    };

    const setTrue = () => {
        if (needDisableToRight) return disableToRightCallback();

        setChecked(true);
        if (typeof callback === "function")
            callback(getStatusWithId(true), switchData.current);
        return null;
    };

    const setFalse = () => {
        if (needDisableToLeft) return disableToLeftCallback();

        setChecked(false);
        if (typeof callback === "function")
            callback(getStatusWithId(false), switchData.current);
        return null;
    };

    const on = `flex justify-items-center items-center m-0 ${
        animationOn ? "animated bounce-short" : ""
    } text-normal ${customColor || "text-purple font-bold"}`;
    const off = `flex justify-items-center items-center m-0 text-normal ${
        customColor || "text-grey"
    } text-grey`;
    const txtStyle1 = checked ? off : on;
    const txtStyle2 = !checked ? off : on;

    titleLeft = parse(titleLeft);
    titleRight = parse(titleRight);

    if (loading) {
        return (
            <p className="text-center font-bold text-normal text-purple">
                Carregando...
            </p>
        );
    }

    return (
        <section className="flex cursor-pointer" style={styles.pill}>
            <p className="m-0 mr-2 inline-block text-normal font-bold text-purple">
                {titleQuestion}
            </p>
            <p className={txtStyle1} onClick={setFalse}>
                {titleLeft}
            </p>
            <Switch
                classes={{
                    switchBase: classes.switchBase,
                    checked: classes.checked,
                    track: classes.track,
                }}
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
            />
            <p className={txtStyle2} onClick={setTrue}>
                {titleRight}
            </p>
        </section>
    );
}
