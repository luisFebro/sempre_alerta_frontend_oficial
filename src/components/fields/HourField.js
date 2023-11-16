import { useState, useEffect } from "react";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { dateFnsUtils, ptBRLocale, getLocalHour } from "utils/dates/dateFns";
import Field from "./Field";
import { AccessTime } from "@mui/icons-material";

function convertTimeToDateObj(timeString = "03:37") {
    // Use the substring() function to extract hours and minutes
    const hours = timeString.substring(0, 2);
    const minutes = timeString.substring(3, 5);

    // Use the setHours() function to assign hours and minutes
    // to the "today" date object
    const today = new Date();
    return new Date(today.setHours(hours, minutes));
}

const muiTheme = createTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                fontFamily: "var(--themeP)",
                backgroundColor: "var(--themeP)",
            },
        },
        MuiPickersDay: {
            daySelected: {
                fontFamily: "var(--themeP)",
                backgroundColor: "var(--themeP)",
            },
        },
        MuiPickersClock: {
            pin: { backgroundColor: "var(--themeS)" },
            clock: {
                backgroundColor: "var(--themePLight)",
            },
        },
        MuiPickersClockNumber: {
            clockNumber: { font: "bold 18px var(--mainFont)", color: "#fff" },
            clockNumberSelected: { color: "black" },
        },
        MuiPickersClockPointer: {
            noPoint: { backgroundColor: "var(--themeS)" },
            pointer: { backgroundColor: "var(--themeS)" },
            thumb: { border: "14px solid var(--themeS)" },
        },
        MuiTypography: {
            body1: {
                font: "bold 18px var(--mainFont)",
                textTransform: "uppercase",
                color: "var(--themeP)",
            },
            caption: { fontSize: "1.1rem" },
        },
    },
});

export default function HourField({
    name,
    width,
    error,
    hourDate,
    onChangeHour = () => null,
}) {
    const [hourDateChange, setHourDateChange] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        onChangeHour(hourDateChange);
        if (!hourDateChange && hourDate) setHourDateChange(new Date(hourDate));
    }, [hourDateChange, hourDate]);

    const openPicker = () => {
        setOpen(true);
    };

    const closePicker = () => {
        setOpen(false);
    };

    const picker = () => {
        const cancelLabel = <p className="text-small text-purple">Voltar</p>;
        const okLabel = (
            <p className="text-small text-purple font-weight-bold">Atualizar</p>
        );

        return (
            <section
                className="container-center h-0"
                style={{ visibility: "hidden" }}
            >
                <ThemeProvider theme={muiTheme}>
                    <MuiPickersUtilsProvider
                        utils={dateFnsUtils}
                        locale={ptBRLocale}
                    >
                        <TimePicker
                            open={open}
                            variant="outlined"
                            minutesStep={5}
                            autoOk={false}
                            margin="dense"
                            value={hourDateChange}
                            onChange={setHourDateChange}
                            onClose={closePicker}
                            fieldIconPos="end"
                            onOpen={openPicker}
                            cancelLabel={cancelLabel}
                            okLabel={okLabel}
                            disablePast
                            ampm={false}
                            showTodayButton={false}
                            todayLabel={null}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </section>
        );
    };

    return (
        <section>
            {picker()}
            <Field
                name={name}
                value={getLocalHour(hourDate)}
                width={width}
                textAlign="text-center"
                onClick={openPicker}
                FieldIcon={<AccessTime style={{ color: "var(--themeP)" }} />}
                onChangeCallback={openPicker}
                error={error}
                onFocus={(e) => {
                    e.preventDefault();
                    return false;
                }}
                onKeyPress={(e) => {
                    e.preventDefault();
                    return false;
                }}
                onKeyDown={(e) => {
                    e.preventDefault();
                    return false;
                }}
            />
        </section>
    );
}
