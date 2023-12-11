// ref: https://mui.com/material-ui/react-checkbox/
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import HourField from "components/fields/HourField";

export default function CheckboxesGroupWorkingHours({
    dataCheckbox = [],
    updateCheckbox,
    selectTitle = "Selecione opção:",
    isUpdate = false,
}) {
    const handleChangeCheckbox = (event) => {
        const label = event.target.name;
        const isChecked = event.target.checked;

        updateCheckbox((prev) => {
            return prev.map((elem) => {
                if (elem.label === label) {
                    return {
                        ...elem,
                        label,
                        checked: isChecked,
                    };
                } else return elem;
            });
        });
    };

    const onChangeHourInit = (label, newDate) => {
        updateCheckbox((prev) => {
            return prev.map((elem) => {
                if (elem.label === label) {
                    return {
                        ...elem,
                        label,
                        fieldData: { ...elem.fieldData, alertOnAt: newDate },
                    };
                } else return elem;
            });
        });
    };

    const onChangeHourEnd = (label, newDate) => {
        updateCheckbox((prev) => {
            return prev.map((elem) => {
                if (elem.label === label) {
                    return {
                        ...elem,
                        label,
                        fieldData: { ...elem.fieldData, alertOffAt: newDate },
                    };
                } else return elem;
            });
        });
    };

    return (
        <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                <FormLabel
                    className="text-center"
                    component="legend"
                    style={{ fontSize: 18 }}
                >
                    {selectTitle}
                </FormLabel>
                <FormGroup>
                    {dataCheckbox.map(
                        ({
                            label,
                            checked,
                            fieldData = {},
                            fieldError = {},
                        }) => (
                            <span
                                className="checkboxes-group-working-hours"
                                key={label}
                            >
                                <FormControlLabel
                                    label={label}
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleChangeCheckbox}
                                            name={label}
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 30,
                                                    margin: "0",
                                                },
                                            }}
                                        />
                                    }
                                />
                                {checked && (
                                    <form
                                        style={{
                                            margin: "auto",
                                            width: "90%",
                                        }}
                                        className="text-normal font-thin"
                                        onBlur={() => {
                                            updateCheckbox((prev) => {
                                                return prev.map((elem) => {
                                                    if (elem.label === label) {
                                                        return {
                                                            ...elem,
                                                            fieldError: {
                                                                alertOnAt: false,
                                                                alertOffAt: false,
                                                            },
                                                        };
                                                    } else return elem;
                                                });
                                            });
                                        }}
                                    >
                                        <section
                                            className={`${
                                                isUpdate
                                                    ? ""
                                                    : "animated fadeInUp"
                                            } my-0`}
                                        >
                                            <section className="container-center items-center mb-5">
                                                <div className="w-36">
                                                    <p className="text-center text-lg text-normal">
                                                        Hora Inicial
                                                    </p>
                                                    <HourField
                                                        name="hourInit"
                                                        hourDate={
                                                            fieldData.alertOnAt
                                                        }
                                                        error={
                                                            fieldError.alertOnAt ===
                                                                "hourInit" ||
                                                            fieldError.alertOnAt ===
                                                                "hours"
                                                        }
                                                        onChangeHour={(
                                                            newDate
                                                        ) =>
                                                            onChangeHourInit(
                                                                label,
                                                                newDate
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="w-36 ml-5">
                                                    <p className="text-center text-lg text-normal">
                                                        Hora Final
                                                    </p>
                                                    <HourField
                                                        name="hourEnd"
                                                        hourDate={
                                                            fieldData.alertOffAt
                                                        }
                                                        error={
                                                            fieldError.alertOffAt ===
                                                                "hourEnd" ||
                                                            fieldError.alertOffAt ===
                                                                "hours"
                                                        }
                                                        onChangeHour={(
                                                            newDate
                                                        ) =>
                                                            onChangeHourEnd(
                                                                label,
                                                                newDate
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </section>
                                        </section>
                                    </form>
                                )}
                            </span>
                        )
                    )}

                    <style jsx>{`
                        .checkboxes-group-working-hours
                            .MuiFormControlLabel-root {
                            margin: 0px 0px !important;
                            vertical-align: middle;
                        }

                        .checkboxes-group-working-hours .MuiButtonBase-root {
                            padding: 5px !important;
                        }
                    `}</style>
                </FormGroup>
            </FormControl>
        </Box>
    );
}
