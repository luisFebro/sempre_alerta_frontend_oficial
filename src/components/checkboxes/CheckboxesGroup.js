// ref: https://mui.com/material-ui/react-checkbox/
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Field from "components/fields/Field";
import autoPhoneMask from "utils/validation/masks/autoPhoneMask";

export default function CheckboxesGroup({
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

    const handleChangeField = (event) => {
        const label = event.target.name;
        const value = event.target.value;

        updateCheckbox((prev) => {
            return prev.map((elem) => {
                if (elem.label === label) {
                    return {
                        ...elem,
                        label,
                        fieldData: autoPhoneMask(value),
                    };
                } else return elem;
            });
        });
    };

    return (
        <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                <FormLabel component="legend" style={{ fontSize: 18 }}>
                    {selectTitle}
                </FormLabel>
                <FormGroup>
                    {dataCheckbox.map(
                        ({
                            label,
                            checked,
                            fieldData,
                            fieldTitle,
                            fieldError,
                        }) => (
                            <span key={label}>
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
                                                    margin: "7px 0",
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

                                                            fieldError: false,
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
                                            {fieldTitle}
                                            <Field
                                                type="tel" // digits only keyboard
                                                name={label}
                                                value={fieldData}
                                                error={fieldError === true}
                                                callbackEventOnly
                                                onChangeCallback={
                                                    handleChangeField
                                                }
                                                maxLength={15}
                                            />
                                        </section>
                                    </form>
                                )}
                            </span>
                        )
                    )}
                </FormGroup>
            </FormControl>
        </Box>
    );
}
