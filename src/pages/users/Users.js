import MainTitle from "components/MainTitle";
import SelectField from "components/fields/SelectField";
import { useState } from "react";
import RegisteredUsersList from "./users_list/RegisteredUsersList";

export default function Users() {
    const [data, setData] = useState({
        selectedUserType: "equipe",
    });
    const { selectedUserType } = data;
    console.log("selectedUserType", selectedUserType);

    const userTypeData = [
        { val: "equipe", showVal: "Equipe" },
        { val: "admin", showVal: "Admin" },
        { val: "autoridade", showVal: "Autoridade" },
        { val: "todos", showVal: "Todos" },
    ];

    return (
        <>
            <section className="relative top-32">
                <MainTitle
                    classNameTitle="text-black-500"
                    title="Usuários Cadastrados"
                    desc="Acompanhe todos os cadastros da instituição"
                />
                <div className="flex justify-center items-center flex-col">
                    <SelectField
                        label="Selecione tipo usuário:"
                        valuesArray={userTypeData}
                        defaultValue={selectedUserType}
                        handleValue={(newVal) =>
                            setData((prev) => ({
                                ...prev,
                                selectedUserType: newVal,
                            }))
                        }
                    />
                    <RegisteredUsersList
                        selectedUserType={selectedUserType}
                        setDataForEverybodyForm={setData}
                    />
                </div>
            </section>
        </>
    );
}
