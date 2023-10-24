import MainTitle from "components/MainTitle";
import SelectField from "components/fields/SelectField";
import { useState, useEffect } from "react";
import RegisteredUsersList from "./users_list/RegisteredUsersList";

export default function Users() {
    const [data, setData] = useState({
        selectedUserType: "equipe",
    });
    const { selectedUserType } = data;

    const userTypeData = [
        { val: "equipe", showVal: "Equipe" },
        { val: "admin", showVal: "Admin" },
        { val: "autoridade", showVal: "Autoridade" },
        { val: "todos", showVal: "Todos" },
    ];

    // TODO get the dbList here with useAPI
    /*
                        let { data: list, loading = false } = useAPI({
        url: readUserSubIds(),
        params,
        needAuth: true,
        trigger: needRunApi && selectedApp,
        dataName: "allPushSubList",
    }); */

    /*
        {
            userName: "Luiza Lombardes",
            userType: "equipe",
            userId: "luiza.lombardes@gmail.com",
            numberAlertList: [
                {
                    contact: "(21) 99266-7930",
                    type: "sms",
                },
            ],
        },
        {
            userName: "Pedro Souza",
            userType: "admin",
            userId: "pedrosouza@gmail.com",
            numberAlertList: [
                {
                    contact: "(22) 99223-1112",
                    type: "whatsapp",
                },
            ],
        },
        {
            userName: "Guarda Municipal Local",
            userType: "autoridade",
            userId: "guardamunicipalmacae@gmail.com",
            numberAlertList: [
                {
                    contact: "(22) 99225-7930",
                    type: "sms",
                },
                {
                    contact: "(22) 99999-8888",
                    type: "whatsapp",
                },
                {
                    contact: "(22) 2222-2222",
                    type: "ligação",
                },
            ],
        },

    */

    const dbList = [];

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
                </div>
                <RegisteredUsersList
                    selectedUserType={selectedUserType}
                    setDataForEverybodyForm={setData}
                    dbList={dbList}
                />
            </section>
        </>
    );
}
