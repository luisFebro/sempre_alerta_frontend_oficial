import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { InputAdornment } from "@mui/material";
import { dateFnsUtils, ptBRLocale } from "utils/dates/dateFns";

export default function DateField({
    name,
    value,
    openTo = "month",
    inputVariant = "outlined",
    disableFuture = true,
    disablePast = false,
    error = false,
    views = ["month", "date"],
    autoOk = false,
    onChangeCallback = () => null,
    maxDate = undefined,
    minDate = undefined,
    FieldIcon,
    showTodayButton = true,
}) {
    const inputProps = FieldIcon
        ? {
              InputProps: {
                  startAdornment: (
                      <InputAdornment position="start">
                          <FieldIcon />
                      </InputAdornment>
                  ),
                  style: {
                      backgroundColor: "var(--mainWhite)",
                      font: "var(--mainFont), sans-serif",
                  },
                  id: "value3",
              },
          }
        : null;

    const todayLabel = <p className="text-base text-s">Hoje</p>;

    const cancelLabel = <p className="text-base text-s">Voltar</p>;

    const okLabel = (
        <p className="text-lg text-s-dark font-bold text-pill theme-s-light">
            Aplicar
        </p>
    );

    return (
        <MuiPickersUtilsProvider utils={dateFnsUtils} locale={ptBRLocale}>
            <DatePicker
                required
                name={name}
                value={value}
                openTo={openTo}
                inputVariant={inputVariant}
                margin="none"
                error={error}
                autoOk={autoOk}
                disableFuture={disableFuture}
                disablePast={disablePast}
                allowKeyboardControl
                views={views}
                showTodayButton={showTodayButton}
                todayLabel={todayLabel}
                cancelLabel={cancelLabel}
                okLabel={okLabel}
                maxDate={maxDate}
                minDate={minDate}
                format="dd/MM/yyyy"
                onChange={onChangeCallback} // receives (newDate) as first param
                {...inputProps}
            />
            <style global>
                {`

                    input[readonly].MuiInputBase-input.MuiOutlinedInput-input {
                        font-family: var(--mainFont);
                        font-size: 17px;
                        color: var(--themeS);
                    }

                    .MuiPickersMonthSelection-container div:not(.MuiPickersMonth-monthSelected) {
                        font-size: 17px;
                        font-weight: normal;
                        font-family: var(--mainFont);
                    }

                    .MuiPickersMonth-monthSelected {
                        font-weight: bold;
                        font-family: var(--mainFont);
                        color: var(--themeSLight);
                    }

                    .MuiPickersToolbar-toolbar {
                        background-color: var(--themeP);
                    }

                    .MuiPickersToolbarText-toolbarTxt {
                        font-size: 30px;
                        font-family: var(--mainFont);
                    }

                    .MuiPickersDay-daySelected  {
                        color: #fff;
                        background-color: var(--themeSLight) !important;
                    }

                    .MuiPickersYear-yearSelected {
                        font-weight: bold;
                        font-family: var(--mainFont);
                        color: var(--themeSLight);
                    }

                    .MuiPickersCalendarHeader-dayLabel {
                        font: 17px normal var(--mainFont);
                    }

                    .MuiPickersCalendarHeader-transitionContainer p {
                        font: 17px normal var(--mainFont);
                        text-transform: uppercase;
                        color: var(--themeP);
                    }
                `}
            </style>
        </MuiPickersUtilsProvider>
    );
}
