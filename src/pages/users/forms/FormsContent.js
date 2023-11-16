import MainTitle from "components/MainTitle";
import FabBtn from "components/btns/FabBtn";
import Field from "components/fields/Field";
import React, { useState } from "react";
import capitalize from "utils/string/capitalize";
import {
    Save,
    Email,
    PhoneAndroid,
    Person,
    Shield,
    PublishedWithChanges,
} from "@mui/icons-material";
import CheckboxesGroup from "components/checkboxes/CheckboxesGroup";
import InstructionBtn from "components/btns/InstructionBtn";
import SwitchBtn from "components/btns/SwitchBtn";
import autoPhoneMask from "utils/validation/masks/autoPhoneMask";
import showToast from "components/toasts/showToast";
import validateMobilePhone from "utils/validation/validateMobilePhone";
import validateEmail from "utils/validation/validateEmail";
import SelectField from "components/fields/SelectField";
import validateLandlineAndMobilePhone from "utils/validation/validateLandlineAndMobilePhone";
import { addNumberAlertList } from "./helpers/numberAlertList";
import {
    saveUserToDb,
    updateUserToDb,
    removeUserToDb,
} from "./crud/registerCRUD.js";
import isValidNameWithSurname from "utils/validation/isValidNameWithSurname";
import useUpdateData from "./hooks/useUpdateData";
import RemoveUserBtn from "./crud/RemoveUserBtn";
import useData from "global-data/useData";

export default function FormsContent({
    roomId = "central",
    selectedRole,
    setDataForEverybodyForm,
    setList,
    handleFullClose,
    updateData,
}) {
    const [data, setData] = useState({
        userId: null, // email
        userName: null,
        userPhone: null, // only team, admin
        isPhoneWhatsapp: true,
        disabledCTA: false,
    });
    const [error, setError] = useState(null);

    const { instituteId } = useData("user");

    const { userId, userName, userPhone, isPhoneWhatsapp, disabledCTA } = data;
    const userPhoneDisplay = autoPhoneMask(userPhone);

    const isMobilePhoneReady =
        userPhoneDisplay && userPhoneDisplay.length >= 15;

    const isUpdate = Boolean(updateData);
    const isEverybody = selectedRole === "todos" && !isUpdate;
    const isAuthority = selectedRole === "autoridade";

    const [dataCheckbox, updateCheckbox] = useState([
        {
            label: "Ligação",
            checked: false,
            fieldData: "",
            fieldTitle: "Informe telefone fixo ou celular:",
            fieldError: false,
        },
        {
            label: "SMS",
            checked: false,
            fieldData: "",
            fieldTitle: "Informe número de SMS:",
            fieldError: false,
        },
        {
            label: "Whatsapp",
            checked: false,
            fieldData: "",
            fieldTitle: "Informe número de Whatsapp:",
            fieldError: false,
        },
    ]);

    useUpdateData({ updateData, isAuthority, setData, updateCheckbox });

    const handleWhatsappQuestion = (status) => {
        const isTrue = status && status.includes("true");

        setData((prev) => ({
            ...prev,
            isPhoneWhatsapp: isTrue,
        }));
    };

    const showEverybodyForm = () => {
        const roleData = [
            { val: "equipe", showVal: "Equipe" },
            { val: "admin", showVal: "Admin" },
            { val: "autoridade", showVal: "Autoridade" },
        ];

        return (
            <div className="flex justify-center items-center flex-col">
                <SelectField
                    label="Selecione tipo usuário:"
                    valuesArray={roleData}
                    defaultValue={selectedRole}
                    handleValue={(newVal) => {
                        if (typeof setDataForEverybodyForm === "function") {
                            setDataForEverybodyForm((prev) => ({
                                ...prev,
                                selectedRole: newVal,
                            }));
                        }
                    }}
                />
            </div>
        );
    };

    const showAdminTeamForm = () => (
        <>
            <section className="my-4">
                Nome Usuário:
                <Field
                    name="userName"
                    error={error === "userName"}
                    placeholder="Digite nome e sobrenome"
                    value={userName}
                    onChangeCallback={setData}
                    FieldIcon={<Person style={{ color: "var(--themeP)" }} />}
                />
            </section>
            <section className="my-4">
                Email:
                <Field
                    name="userId"
                    error={error === "userId"}
                    value={userId}
                    disabled={isUpdate}
                    onChangeCallback={setData}
                    FieldIcon={<Email style={{ color: "var(--themeP)" }} />}
                />
            </section>
            <section className="my-4">
                Número celular:
                <Field
                    name="userPhone"
                    type="tel" // digits only keyboard
                    error={error === "userPhone"}
                    value={userPhoneDisplay}
                    onChangeCallback={setData}
                    maxLength={15}
                    FieldIcon={
                        <PhoneAndroid style={{ color: "var(--themeP)" }} />
                    }
                />
                <div
                    className={`${
                        isMobilePhoneReady ? "block" : "hidden"
                    } animated fadeInUp mt-3 flex flex-col justify-content items-center`}
                >
                    <SwitchBtn
                        titleQuestion="É whatsapp?"
                        defaultStatus={true}
                        callback={handleWhatsappQuestion}
                    />
                </div>
            </section>
        </>
    );

    const showAuthorityForm = () => (
        <>
            <section className="my-4">
                Nome Instituição Emergência:{" "}
                <InstructionBtn
                    className="-top-3"
                    text="Exemplos de instituições: corpo de bombeiro, polícia militar, guarda municipal, ambulância local, etc"
                />
                <Field
                    name="userName"
                    error={error === "userName"}
                    value={userName}
                    onChangeCallback={setData}
                    FieldIcon={<Shield style={{ color: "var(--themeP)" }} />}
                />
            </section>
            <section className="my-4">
                Email da Instituição:
                <InstructionBtn
                    className="-top-3"
                    text="É um email válido da instituição ou representante"
                />
                <Field
                    name="userId"
                    error={error === "userId"}
                    disabled={isUpdate}
                    value={userId}
                    onChangeCallback={setData}
                    FieldIcon={<Email style={{ color: "var(--themeP)" }} />}
                />
            </section>
            <section className="my-4">
                Número(s) para alerta SOS:
                <InstructionBtn
                    className="-top-3"
                    text="São os meios de comunicações onde serão enviados os alertas SOS para esta autoridade cadastrada"
                />
                <CheckboxesGroup
                    selectTitle="Selecione uma ou mais opções:"
                    dataCheckbox={dataCheckbox}
                    updateCheckbox={updateCheckbox}
                    isUpdate={false}
                />
            </section>
        </>
    );

    const disableCTAClick = (status) => {
        setData((prev) => ({
            ...prev,
            disabledCTA: status,
        }));
    };

    // CRUD
    const handleDataToCRUD = () => {
        const allMarkedAlerts = dataCheckbox.filter((elem) => elem.checked);

        return {
            ...data, // userId, userName, userPhone
            userId: userId && userId.trim(),
            instituteId,
            userName: userName && userName.trim(),
            roomId,
            role: selectedRole,
            numberAlertList: addNumberAlertList({
                isAuthority,
                allMarkedAlerts,
                userPhone,
                isPhoneWhatsapp,
            }),
        };
    };

    const saveNewUser = async () => {
        // VALIDATION
        if (!userName) {
            const msg = isAuthority
                ? "Favor, informe o nome da instituição de emergência"
                : "Favor, informe o nome do usuário a ser cadastrado";
            return showToast(msg, {
                type: "error",
                callback: () => setError("userName"),
            });
        }

        if (!isAuthority && !isValidNameWithSurname(userName)) {
            return showToast("Nome Inválido. Precisa de um nome e sobrenome.", {
                type: "error",
                callback: () => setError("userName"),
            });
        }

        if (!userId) {
            const msg = isAuthority
                ? "Favor, informe o email da instituição"
                : "Favor, informe o email do novo usuário";

            return showToast(msg, {
                type: "error",
                callback: () => setError("userId"),
            });
        }

        if (!validateEmail(userId)) {
            return showToast(
                "O email informado é inválido. Revise e tente novamente",
                {
                    type: "error",
                    callback: () => setError("userId"),
                }
            );
        }

        if (!isAuthority) {
            if (!userPhone) {
                return showToast(
                    "Favor, informe um número celular para contato",
                    {
                        type: "error",
                        callback: () => setError("userPhone"),
                    }
                );
            }

            if (!validateMobilePhone(userPhoneDisplay)) {
                return showToast(
                    "O número de celular é inválido. Revise e tente novamente.",
                    {
                        type: "error",
                        callback: () => setError("userPhone"),
                    }
                );
            }
        }

        if (isAuthority) {
            const didUserMarkedNoAlert = dataCheckbox.every(
                (elem) => elem.checked === false
            );

            if (didUserMarkedNoAlert) {
                return showToast(
                    "Você precisa selecionar um tipo de alerta para avisar a autoridade cadastrada.",
                    {
                        type: "error",
                        callback: () => setError("userPhone"),
                    }
                );
            }

            const markCheckboxFieldError = (label) => {
                updateCheckbox((prev) => {
                    return prev.map((elem) => {
                        if (elem.label === label) {
                            return {
                                ...elem,
                                fieldError: true,
                            };
                        } else return elem;
                    });
                });
            };

            const allMarkedAlertsWithEmptyFields = dataCheckbox.filter(
                (elem) => elem.checked && elem.fieldData === ""
            );
            const gotEmptyFields = Boolean(
                allMarkedAlertsWithEmptyFields &&
                    allMarkedAlertsWithEmptyFields.length
            );

            if (gotEmptyFields) {
                const itemWithIssue = allMarkedAlertsWithEmptyFields[0];
                return showToast(itemWithIssue.fieldTitle, {
                    type: "error",
                    callback: () => markCheckboxFieldError(itemWithIssue.label),
                });
            }

            const allMarkedAlertsWithInvalidFields = dataCheckbox.filter(
                (elem) => {
                    const isChecked = elem.checked;

                    const phoneData = elem.fieldData;

                    if (isChecked) {
                        if (
                            elem.label === "Ligação" &&
                            !validateLandlineAndMobilePhone(phoneData)
                        )
                            return true;
                        if (
                            elem.label !== "Ligação" &&
                            !validateMobilePhone(phoneData)
                        )
                            return true;
                    }

                    return false;
                }
            );

            const gotInvalidFields = Boolean(
                allMarkedAlertsWithInvalidFields &&
                    allMarkedAlertsWithInvalidFields.length
            );

            if (gotInvalidFields) {
                const itemWithIssue = allMarkedAlertsWithInvalidFields[0];
                return showToast(
                    `Contato de ${itemWithIssue.label} é inválido. Revise e tente novamente.`,
                    {
                        type: "error",
                        callback: () =>
                            markCheckboxFieldError(itemWithIssue.label),
                    }
                );
            }
        }
        // END VALIDATION

        const dataCRUD = handleDataToCRUD();

        await saveUserToDb({
            data: dataCRUD,
            handleFullClose,
            setList,
            disableCTAClick,
        });
    };

    const updateCurrentUser = async () => {
        // VALIDATION
        if (!userName) {
            const msg = isAuthority
                ? "Favor, informe o nome da instituição de emergência"
                : "Favor, informe o nome do usuário a ser cadastrado";
            return showToast(msg, {
                type: "error",
                callback: () => setError("userName"),
            });
        }

        if (!isAuthority && !isValidNameWithSurname(userName)) {
            return showToast("Nome Inválido. Precisa de um nome e sobrenome.", {
                type: "error",
                callback: () => setError("userName"),
            });
        }

        if (!userId) {
            const msg = isAuthority
                ? "Favor, informe o email da instituição"
                : "Favor, informe o email do novo usuário";

            return showToast(msg, {
                type: "error",
                callback: () => setError("userId"),
            });
        }

        if (!validateEmail(userId)) {
            return showToast(
                "O email informado é inválido. Revise e tente novamente",
                {
                    type: "error",
                    callback: () => setError("userId"),
                }
            );
        }

        if (!isAuthority) {
            if (!userPhone) {
                return showToast(
                    "Favor, informe um número celular para contato",
                    {
                        type: "error",
                        callback: () => setError("userPhone"),
                    }
                );
            }

            if (!validateMobilePhone(userPhoneDisplay)) {
                return showToast(
                    "O número de celular é inválido. Revise e tente novamente.",
                    {
                        type: "error",
                        callback: () => setError("userPhone"),
                    }
                );
            }
        }

        if (isAuthority) {
            const didUserMarkedNoAlert = dataCheckbox.every(
                (elem) => elem.checked === false
            );

            if (didUserMarkedNoAlert) {
                return showToast(
                    "Você precisa selecionar um tipo de alerta para avisar a autoridade cadastrada.",
                    {
                        type: "error",
                        callback: () => setError("userPhone"),
                    }
                );
            }

            const markCheckboxFieldError = (label) => {
                updateCheckbox((prev) => {
                    return prev.map((elem) => {
                        if (elem.label === label) {
                            return {
                                ...elem,
                                fieldError: true,
                            };
                        } else return elem;
                    });
                });
            };

            const allMarkedAlertsWithEmptyFields = dataCheckbox.filter(
                (elem) => elem.checked && elem.fieldData === ""
            );
            const gotEmptyFields = Boolean(
                allMarkedAlertsWithEmptyFields &&
                    allMarkedAlertsWithEmptyFields.length
            );

            if (gotEmptyFields) {
                const itemWithIssue = allMarkedAlertsWithEmptyFields[0];
                return showToast(itemWithIssue.fieldTitle, {
                    type: "error",
                    callback: () => markCheckboxFieldError(itemWithIssue.label),
                });
            }

            const allMarkedAlertsWithInvalidFields = dataCheckbox.filter(
                (elem) => {
                    const isChecked = elem.checked;

                    const phoneData = elem.fieldData;

                    if (isChecked) {
                        if (
                            elem.label === "Ligação" &&
                            !validateLandlineAndMobilePhone(phoneData)
                        )
                            return true;
                        if (
                            elem.label !== "Ligação" &&
                            !validateMobilePhone(phoneData)
                        )
                            return true;
                    }

                    return false;
                }
            );

            const gotInvalidFields = Boolean(
                allMarkedAlertsWithInvalidFields &&
                    allMarkedAlertsWithInvalidFields.length
            );

            if (gotInvalidFields) {
                const itemWithIssue = allMarkedAlertsWithInvalidFields[0];
                return showToast(
                    `Contato de ${itemWithIssue.label} é inválido. Revise e tente novamente.`,
                    {
                        type: "error",
                        callback: () =>
                            markCheckboxFieldError(itemWithIssue.label),
                    }
                );
            }
        }
        // END VALIDATION

        const dataCRUD = handleDataToCRUD();

        await updateUserToDb({
            data: dataCRUD,
            handleFullClose,
            setList,
            disableCTAClick,
        });
    };

    const removeCurrentUser = async () => {
        await removeUserToDb({
            userId,
            role: selectedRole,
            handleFullClose,
            setList,
            disableCTAClick,
        });
    };

    // END CRUD

    const IconRecordBtn = <Save style={{ fontSize: 30 }} />;
    const IconUpdateBtn = <PublishedWithChanges style={{ fontSize: 30 }} />;

    const handleView = () => {
        if (isEverybody) return showEverybodyForm();
        return isAuthority ? showAuthorityForm() : showAdminTeamForm();
    };

    const handleMainTitle = () => {
        if (isUpdate) {
            return `Atualização Cadastro ${capitalize(updateData.role)}`;
        }

        return isEverybody
            ? "Novo Cadastro"
            : `Novo Cadastro ${capitalize(selectedRole)}`;
    };

    const removalData = {
        removeCurrentUser,
        userName,
        userId,
    };

    return (
        <section>
            <MainTitle title={handleMainTitle()} desc="" />
            <form
                style={{ margin: "auto", width: "90%" }}
                className="text-normal font-bold"
                onBlur={() => {
                    setError(null);
                }}
            >
                {handleView()}
                {!isEverybody && !isUpdate && (
                    <div className="my-7 flex justify-center">
                        <FabBtn
                            title="CADASTRAR"
                            Icon={IconRecordBtn}
                            onClick={saveNewUser}
                            disabled={disabledCTA}
                        />
                    </div>
                )}
                {isUpdate && (
                    <div className="my-7 flex justify-center items-center">
                        <div className="mr-7">
                            <RemoveUserBtn {...removalData} />
                        </div>

                        <FabBtn
                            title="ATUALIZAR"
                            Icon={IconUpdateBtn}
                            onClick={updateCurrentUser}
                            disabled={disabledCTA}
                        />
                    </div>
                )}
            </form>
        </section>
    );
}
