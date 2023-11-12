import MainTitle from "components/MainTitle";
import MainBtn from "components/btns/MainBtn";
import SyncIcon from "@mui/icons-material/Sync";
import SelectField from "components/fields/SelectField";
import InstructionBtn from "components/btns/InstructionBtn";
import { useState, useEffect } from "react";
import DateField from "components/fields/DateField";
import { diffInDays, hasPassedDate, isSameDay } from "utils/dates/dateFns";
import showToast from "components/toasts/showToast";

export default function EditBtnContent({
    handleFullClose,
    filterData,
    updateFilterData,
}) {
    const {
        baseList,
        segmentList,
        base,
        segment,
        period,
        dateInit,
        dateEnd,
        diffInDays: diffDaysCount,
    } = filterData;

    const isHighAuth = false;

    const [needCustomDate, setNeedCustomDate] = useState(false);
    const [update, setUpdate] = useState({
        updateBase: base,
        updateSegment: segment,
        updatePeriod: period,
        updateDateInit: dateInit,
        updateDateEnd: dateEnd,
        updateDiffDaysCount: diffDaysCount,
    });
    const {
        updateSegment,
        updateBase,
        updatePeriod,
        updateDateInit,
        updateDateEnd,
        updateDiffDaysCount,
    } = update;

    const saveAndCloseModal = () => {
        // dates validation
        if (needCustomDate) {
            const isInitBiggerThanEndDate = hasPassedDate(
                updateDateEnd,
                updateDateInit
            );
            if (isInitBiggerThanEndDate) {
                return showToast(
                    "A data inicial não pode ser maior que a final. Tente novamente.",
                    { type: "error" }
                );
            }

            const areEqualDates = isSameDay(updateDateEnd, updateDateInit);
            if (areEqualDates) {
                return showToast(
                    "A data inicial e final não devem ser iguais. Selecione opção HOJE como período ou mude a data inicial.",
                    { type: "error" }
                );
            }
        }

        updateFilterData((prev) => ({
            ...prev,
            base: updateBase,
            segment: updateSegment,
            period: updatePeriod,
            dateInit: updateDateInit,
            dateEnd: updateDateEnd,
            diffInDays: updateDiffDaysCount,
        }));

        handleFullClose();
    };

    useEffect(() => {
        if (updatePeriod === "customDate") setNeedCustomDate(true);
        else setNeedCustomDate(false);
    }, [updatePeriod]);

    useEffect(() => {
        setUpdate((prev) => ({
            ...prev,
            updateDiffDaysCount: diffInDays(updateDateEnd, updateDateInit),
        }));
    }, [updateDateEnd, updateDateInit]);

    const filterBaseData = !baseList
        ? [{ val: " ", showVal: " " }]
        : baseList.map((item) => ({ val: item, showVal: item }));

    const filterSegmentData = !segmentList
        ? [{ val: " ", showVal: " " }]
        : segmentList.map((item) => ({
              val: item,
              showVal: item,
          }));

    const filterPeriodData = [
        { val: "all", showVal: "Tudo" },
        { val: "today", showVal: "Hoje" },
        { val: "monthly", showVal: "Mês Atual" },
        { val: "customDate", showVal: "Data Personalizada" },
    ];

    const showCustomDateArea = () => (
        <section>
            <h2 className="text-center text-lg my-3 font-bold text-blue-900">
                Escolha datas:
            </h2>
            <section className="animated fadeInUp container-center">
                <div className="w-32">
                    <p className="text-lg text-center">Data Inicial</p>
                    <DateField
                        name="dateInit"
                        value={updateDateInit}
                        onChangeCallback={(newDate) =>
                            setUpdate((prev) => ({
                                ...prev,
                                updateDateInit: newDate,
                            }))
                        }
                    />
                </div>
                <div className="ml-5 w-32">
                    <p className="text-lg text-center">Data Final</p>
                    <DateField
                        name="dateEnd"
                        value={updateDateEnd}
                        onChangeCallback={(newDate) =>
                            setUpdate((prev) => ({
                                ...prev,
                                updateDateEnd: newDate,
                            }))
                        }
                    />
                </div>
            </section>
            <p className="text-base text-gray-500 my-2 text-center">
                período selecionado tem:{" "}
                <span className="font-bold">{updateDiffDaysCount} dias.</span>
            </p>
        </section>
    );

    return (
        <>
            <MainTitle
                title="Filtro Geral"
                desc="Filtre os principais dados do painel."
            />
            <div className="flex justify-center items-center flex-col">
                {isHighAuth && (
                    <div className="mb-10">
                        <SelectField
                            label="BASE:"
                            valuesArray={filterBaseData}
                            defaultValue={updateBase}
                            handleValue={(newVal) =>
                                setUpdate((prev) => ({
                                    ...prev,
                                    updateBase: newVal,
                                }))
                            }
                        />
                    </div>
                )}
                <div className="mb-10 relative">
                    <SelectField
                        label="SEGMENTO:"
                        valuesArray={filterSegmentData}
                        defaultValue={updateSegment}
                        handleValue={(newVal) =>
                            setUpdate((prev) => ({
                                ...prev,
                                updateSegment: newVal,
                            }))
                        }
                    />
                    <div className="absolute -top-0 left-28">
                        <InstructionBtn
                            text="É cada setor ou área de atuação que uma base possui. Por exemplo: admin, saúde, educação, etc."
                            tooltipProps={{ disablePortal: true }}
                            btnSize={30}
                        />
                    </div>
                </div>
                <div className={`${needCustomDate ? "mb-10" : ""} relative`}>
                    <SelectField
                        valuesArray={filterPeriodData}
                        defaultValue={updatePeriod}
                        label="PERÍODO:"
                        handleValue={(newVal) => {
                            setUpdate((prev) => ({
                                ...prev,
                                updatePeriod: newVal,
                            }));
                        }}
                    />
                </div>

                {needCustomDate && showCustomDateArea()}
            </div>
            <div
                className={`${
                    !needCustomDate ? "my-16" : "mt-5 mb-16"
                } container-center`}
            >
                <MainBtn
                    title="atualizar"
                    Icon={SyncIcon}
                    onClick={saveAndCloseModal}
                />
            </div>
        </>
    );
}
