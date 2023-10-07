import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useEffect, useState } from "react";

/* exemple - all data should be STRING especially val, otherwise will not work.
const statusConnectionData = [
        {
            label: "Conectado",
            val: "1",
        },
        {
            label: "Conectando",
            val: "2",
        },
        {
            label: "Desconectado",
            val: "3",
        },
    ];

*/

export default function RadioBtns({
    data = [],
    defaultVal,
    onChangeCallback = () => null,
    restartId = null, // use getId() to set the ID
}) {
    const [radioData, setRadioData] = useState({
        choice: null,
    });
    const { choice } = radioData;

    // pass id to change to default options automatically when id is changed
    useEffect(() => {
        if (!restartId) return;

        setRadioData((prev) => ({ ...prev, choice: defaultVal }));
    }, [restartId, defaultVal]);

    useEffect(() => {
        if (defaultVal) onChangeCallback(defaultVal);
    }, [defaultVal]);

    const handleRadioChoice = (event) => {
        const radioChoice = event.target.value;
        setRadioData((prev) => ({ ...prev, choice: radioChoice }));

        onChangeCallback(radioChoice);
    };

    return (
        <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleRadioChoice}
            >
                {data.map(({ val, label }) => (
                    <span key={val}>
                        <FormControlLabel
                            value={val}
                            control={
                                <Radio
                                    checked={(choice || defaultVal) === val}
                                    size="medium"
                                    style={{ color: "var(--themeSLight)" }}
                                />
                            }
                            label={label}
                        />
                    </span>
                ))}
            </RadioGroup>
        </FormControl>
    );
}

/*

<FormLabel id="demo-row-radio-buttons-group-label">
                por tipo de região:
            </FormLabel>

*/
