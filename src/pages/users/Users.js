import MainTitle from "components/MainTitle";
import SelectField from "components/fields/SelectField";
import { useState, useEffect } from "react";
import RegisteredUsersList from "./users_list/RegisteredUsersList";

export default function Users() {
    const [data, setData] = useState({
        selectedRole: "equipe",
    });
    const { selectedRole } = data;

    const roleData = [
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

    const dbList = []; // n1

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
                        valuesArray={roleData}
                        defaultValue={selectedRole}
                        handleValue={(newVal) =>
                            setData((prev) => ({
                                ...prev,
                                selectedRole: newVal,
                            }))
                        }
                    />
                </div>
                <RegisteredUsersList
                    selectedRole={selectedRole}
                    setDataForEverybodyForm={setData}
                    dbList={dbList}
                />
            </section>
        </>
    );
}

/* NOTES

n1
 /*
        {
            userName: "Luiza Lombardes",
            role: "equipe",
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
            role: "admin",
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
            role: "autoridade",
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
