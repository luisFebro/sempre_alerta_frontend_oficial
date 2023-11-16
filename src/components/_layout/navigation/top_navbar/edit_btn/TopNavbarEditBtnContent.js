import MainTitle from "components/MainTitle";
import MainBtn from "components/btns/MainBtn";
import SyncIcon from "@mui/icons-material/Sync";
import InstructionBtn from "components/btns/InstructionBtn";
import { useEffect, useState } from "react";
import useData, { updateData, useUify } from "global-data/useData";
import HourField from "components/fields/HourField";
import { getLocalHour } from "utils/dates/dateFns";
import getAPI, { searchCEP, updateInstitute } from "api/getAPI";
import showToast from "components/toasts/showToast";
import Field from "components/fields/Field";
import autoPhoneMask from "utils/validation/masks/autoPhoneMask";
import validateLandlineAndMobilePhone from "utils/validation/validateLandlineAndMobilePhone";
import convertPhoneStrToInt from "utils/numbers/convertPhoneStrToInt";
import setZipcodeMask from "utils/validation/masks/setZipcodeMask";
import { Search } from "@mui/icons-material";
import getBrazilUF from "./helpers/getBrazilUF";

export default function TopNavbarEditBtnContent({ handleFullClose }) {
    const cache = useData();
    const isCacheAvailable = cache !== null;

    const uify = useUify();

    const [update, setUpdate] = useState({
        instituteName: "",
        contact: 0,
        thoroughfare: "",
        number: 0,
        neighborhood: "",
        city: "",
        state: "",
        zipCode: 0,
        alertOnAt: null,
        alertOffAt: null,
    });
    const {
        alertOnAt,
        alertOffAt,
        instituteName,
        contact,
        thoroughfare,
        zipCode,
        number,
        neighborhood,
        city,
        state,
    } = update;
    const contactDisplay = autoPhoneMask(contact);
    const zipCodeDisplay = setZipcodeMask(zipCode);

    const [error, setError] = useState(null);

    const [lastZipcode, setLastZipcode] = useState(null);

    const getNewZipcodeData = async (cep = 69030070) => {
        const newCEPData = await getAPI({
            url: searchCEP(cep),
            fullCatch: true,
        }).catch((error) => Promise.reject(error));

        if (!newCEPData) return;

        return newCEPData;
    };

    const zipCodeSize = zipCodeDisplay ? zipCodeDisplay.length : 0;
    const isNewValidZipCode =
        Boolean(lastZipcode) &&
        zipCodeSize === 9 &&
        zipCodeDisplay !== setZipcodeMask(lastZipcode);

    useEffect(() => {
        if (isNewValidZipCode) {
            (async () => {
                const rawZipCode = convertPhoneStrToInt(zipCodeDisplay);

                setTimeout(() => setLastZipcode(String(rawZipCode)), 1000);
                const newZipData = await getNewZipcodeData(rawZipCode).catch(
                    (error) => {
                        showToast(error, {
                            type: "error",
                            callback: () => setError("zipCode"),
                        });
                        return;
                    }
                );

                const gotZipData = newZipData
                    ? newZipData.hasOwnProperty("thoroughfare")
                    : false;
                if (!gotZipData) {
                    showToast("INST-14 | CEP informado não existe.", {
                        type: "error",
                        callback: () => setError("zipCode"),
                    });

                    return;
                }

                setUpdate((prev) => ({
                    ...prev,
                    thoroughfare: newZipData.thoroughfare,
                    neighborhood: newZipData.neighborhood,
                    city: newZipData.city,
                    state: newZipData.state,
                }));
            })();
        }
    }, [zipCodeSize, zipCodeDisplay, isNewValidZipCode]);

    useEffect(() => {
        if (isCacheAvailable) {
            setUpdate((prev) => ({
                ...prev,
                instituteName: cache.instituteName,
                contact: cache.contact,
                thoroughfare: cache.thoroughfare,
                number: cache.number,
                neighborhood: cache.neighborhood,
                city: cache.city,
                state: getBrazilUF(cache.state, { toUF: true }),
                zipCode: String(cache.zipCode),
                alertOnAt: cache.alertOnAt,
                alertOffAt: cache.alertOffAt,
            }));

            setTimeout(() => setLastZipcode(String(cache.zipCode)), 1000);
        }
    }, [isCacheAvailable]);

    const saveAndCloseModal = async () => {
        // VALIDATION
        if (!instituteName) {
            return showToast(
                "INST-1 | Favor, informe o nome da sua instituição",
                {
                    type: "error",
                    callback: () => setError("instituteName"),
                }
            );
        }

        if (!contactDisplay) {
            return showToast(
                "INST-2 | Favor, informe um telefone para contato da Instituição.",
                {
                    type: "error",
                    callback: () => setError("contact"),
                }
            );
        }

        if (!validateLandlineAndMobilePhone(contactDisplay)) {
            return showToast(
                "INST-3 | Número telefone inválido. Informe um contato fixo ou móvel.",
                {
                    type: "error",
                    callback: () => setError("contact"),
                }
            );
        }

        // address validation
        if (!thoroughfare) {
            return showToast("INST-4 | Favor, informe o logradouro.", {
                type: "error",
                callback: () => setError("thoroughfare"),
            });
        }

        if (!number) {
            return showToast("INST-5 | Favor, informe o número do endereço.", {
                type: "error",
                callback: () => setError("number"),
            });
        }

        if (!zipCodeDisplay) {
            return showToast("INST-6 | Favor, informe o CEP do endereço.", {
                type: "error",
                callback: () => setError("zipCode"),
            });
        }

        if (zipCodeDisplay.length < 9) {
            return showToast("INST-7 | CEP do endereço é inválido.", {
                type: "error",
                callback: () => setError("zipCode"),
            });
        }

        if (!neighborhood) {
            return showToast("INST-8 | Favor, informe o bairro.", {
                type: "error",
                callback: () => setError("neighborhood"),
            });
        }

        if (!city) {
            return showToast("INST-9 | Favor, informe a cidade.", {
                type: "error",
                callback: () => setError("city"),
            });
        }

        if (!state) {
            return showToast(
                "INST-10 | Favor, informe o UF do estado. Exemplo: RJ para Rio de Janeiro.",
                {
                    type: "error",
                    callback: () => setError("state"),
                }
            );
        }

        const ufState = getBrazilUF(state);

        if (!ufState) {
            return showToast("INST-11 | UF do estado não é válido.", {
                type: "error",
                callback: () => setError("state"),
            });
        }

        // working hours validation
        const alertOnAtSumup = getLocalHour(alertOnAt, { sumup: true });
        const alertOffAtSumup = getLocalHour(alertOffAt, { sumup: true });

        const isEndDateEarlyThanInit = alertOnAtSumup > alertOffAtSumup;
        if (isEndDateEarlyThanInit) {
            return showToast(
                "INST-12 | A hora FINAL precisa ser mais tarde/maior que a hora inicial. Favor, corrija hora final.",
                { type: "error", callback: () => setError("hourEnd") }
            );
        }

        const areEqualHours = alertOffAtSumup === alertOnAtSumup;
        if (areEqualHours) {
            return showToast(
                "INST-13 | As datas não devem ser iguais. Mude uma das horas.",
                { type: "error", callback: () => setError("hours") }
            );
        }

        const dataToUpdate = {
            ...update,
            alertWorkingHours: [
                getLocalHour(alertOnAt), // for display purposes
                getLocalHour(alertOffAt),
                alertOnAtSumup, //  for validation only
                alertOffAtSumup,
            ],
            state: ufState,
            contact: convertPhoneStrToInt(contactDisplay),
            zipCode: convertPhoneStrToInt(zipCode),
            address: `${thoroughfare}, ${number}, ${neighborhood}, ${city}, ${ufState}`,
        };

        const output = await getAPI({
            method: "put",
            url: updateInstitute(),
            body: {
                ...dataToUpdate,
                instituteId: cache.instituteId,
                isSignup: false,
            },
            errMsg: true,
        }).catch(console.log);

        if (!output) return;

        showToast("Dados da instituição atualizados!", { type: "success" });

        updateData(uify, dataToUpdate);

        handleFullClose();
    };

    const showIdAndContact = () => (
        <section>
            <h2 className="relative text-center text-xl my-3 font-bold text-blue-900 flex justify-center">
                Identificação e Contato:
            </h2>
            <form
                style={{ margin: "auto", width: "90%" }}
                className="text-normal font-bold"
                onBlur={() => {
                    setError(null);
                }}
            >
                <p className="text-lg font-thin">Nome Instituição</p>
                <Field
                    name="instituteName"
                    error={error === "instituteName"}
                    placeholder={undefined}
                    value={instituteName}
                    onChangeCallback={setUpdate}
                    FieldIcon={null}
                />

                <p className="text-lg mt-5 font-thin">Telefone</p>
                <Field
                    name="contact"
                    error={error === "contact"}
                    placeholder={undefined}
                    value={contactDisplay}
                    maxLength={15}
                    width={200}
                    onChangeCallback={setUpdate}
                    FieldIcon={null}
                />
            </form>
        </section>
    );

    const showAddress = () => (
        <section>
            <h2 className="relative text-center text-xl my-3 font-bold text-blue-900 flex justify-center">
                Endereço:
            </h2>
            <form
                style={{ margin: "auto", width: "90%" }}
                className="text-normal"
                onBlur={() => {
                    setError(null);
                }}
            >
                <p className="text-lg font-thin">Logradouro</p>
                <Field
                    name="thoroughfare"
                    error={error === "thoroughfare"}
                    placeholder="Nome avenida, rua..."
                    value={thoroughfare}
                    onChangeCallback={setUpdate}
                    FieldIcon={null}
                />

                <section className="flex">
                    <div className="flex flex-col">
                        <p className="text-lg mt-5 font-thin">Número</p>
                        <Field
                            name="number"
                            error={error === "number"}
                            value={number && String(number).replace(/\D/g, "")}
                            type="tel"
                            width={100}
                            maxLength={5}
                            onChangeCallback={setUpdate}
                            FieldIcon={null}
                        />
                    </div>
                    <div className="ml-8 flex flex-col">
                        <div className="flex">
                            <span className="text-lg mt-5 font-thin">CEP</span>
                            <InstructionBtn
                                className="left-2 top-3"
                                text="Ao informar CEP, dados de logradouro, bairro, cidade e estado são atualizados automaticamente."
                                tooltipProps={{ disablePortal: true }}
                                btnSize={30}
                            />
                        </div>
                        <Field
                            name="zipCode"
                            type="tel"
                            error={error === "zipCode"}
                            placeholder={undefined}
                            value={zipCodeDisplay}
                            maxLength={9}
                            width={200}
                            onChangeCallback={setUpdate}
                            FieldIcon={
                                <Search style={{ color: "var(--themeP)" }} />
                            }
                        />
                    </div>
                </section>

                <p className="text-lg mt-5 font-thin">Bairro</p>
                <Field
                    name="neighborhood"
                    error={error === "neighborhood"}
                    value={neighborhood}
                    maxLength={150}
                    onChangeCallback={setUpdate}
                    FieldIcon={null}
                />

                <section className="flex">
                    <div className="flex flex-col">
                        <p className="text-lg mt-5 font-thin">Cidade</p>
                        <Field
                            name="city"
                            error={error === "city"}
                            value={city}
                            maxLength={150}
                            onChangeCallback={setUpdate}
                            FieldIcon={null}
                        />
                    </div>

                    <div className="ml-8 flex flex-col">
                        <p className="text-lg mt-5 font-thin">Estado/UF</p>
                        <Field
                            name="state"
                            error={error === "state"}
                            value={state && state.toUpperCase()}
                            maxLength={2}
                            textAlign="text-center"
                            width={100}
                            onChangeCallback={setUpdate}
                            FieldIcon={null}
                        />
                    </div>
                </section>
            </form>
        </section>
    );

    const showAlertWorkingHours = () => (
        <form onBlur={() => setError(null)}>
            <h2 className="relative text-center text-xl my-3 font-bold text-blue-900 flex justify-center">
                Horário para alertas:
                <div className="absolute -top-3 left-64">
                    <InstructionBtn
                        text="É o horário que é permitido disparar os alertas. No app, os usuários não poderão disparar alertas se fora do horário para alertas."
                        tooltipProps={{ disablePortal: true }}
                        btnSize={30}
                    />
                </div>
            </h2>
            <section className="container-center items-center">
                <div className="w-36">
                    <p className="text-center text-lg text-normal">
                        Hora Inicial
                    </p>
                    <HourField
                        name="hourInit"
                        hourDate={alertOnAt}
                        error={error === "hourInit" || error === "hours"}
                        onChangeHour={(newDate) =>
                            setUpdate((prev) => ({
                                ...prev,
                                alertOnAt: newDate,
                            }))
                        }
                    />
                </div>
                <div className="w-36 ml-5">
                    <p className="text-center text-lg text-normal">
                        Hora Final
                    </p>
                    <HourField
                        name="hourEnd"
                        hourDate={alertOffAt}
                        error={error === "hourEnd" || error === "hours"}
                        onChangeHour={(newDate) =>
                            setUpdate((prev) => ({
                                ...prev,
                                alertOffAt: newDate,
                            }))
                        }
                    />
                </div>
            </section>
        </form>
    );

    return (
        <>
            <MainTitle
                title="Info da Instituição"
                desc="Atualize as informações da sua instituição"
            />
            <div className="mb-14">{showIdAndContact()}</div>
            <div className="mb-14">{showAddress()}</div>
            <div className="flex justify-center mb-14">
                {showAlertWorkingHours()}
            </div>
            <div className={"mb-16 container-center"}>
                <MainBtn
                    title="atualizar"
                    Icon={SyncIcon}
                    onClick={saveAndCloseModal}
                />
            </div>
        </>
    );
}
