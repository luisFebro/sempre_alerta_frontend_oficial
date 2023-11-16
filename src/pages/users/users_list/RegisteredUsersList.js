import React, { useEffect, useState } from "react";
import capitalize from "utils/string/capitalize";
import FormsBtn from "../forms/FormsBtn";
import RegisteredUsersTable from "./table_list/RegisteredUsersTable";

export default function RegisteredUsersList({
    selectedRole = " ",
    setDataForEverybodyForm,
    dbList,
    loading,
}) {
    const [list, setList] = useState([]); // n1
    const isEverybody = selectedRole === "todos";
    const isAuthority = selectedRole === "autoridade";

    const filteredList = isEverybody
        ? list
        : list && list.filter((elem) => elem.role === selectedRole);
    const isEmptyList = Boolean(filteredList && filteredList.length === 0);

    const dataSignup = {
        selectedRole,
        setDataForEverybodyForm,
        setList,
    };

    useEffect(() => {
        if (!loading) setList(dbList);
    }, [loading]);

    const showEmptyIllustration = () => (
        <section>
            <div className="relative flex flex-col justify-center items-center">
                <span>
                    <img
                        src="/img/illustra/illustration_no_data_contacts_oficial.svg"
                        width="300"
                        height="300"
                    />
                </span>
                <span className="text-title text-center text-gray-500 pt-5 font-thin">
                    {isEverybody ? (
                        "Nenhum cadastro"
                    ) : (
                        <span>
                            Nenhum cadastro de{" "}
                            <span style={{ color: "var(--themeS)" }}>
                                {capitalize(selectedRole)}
                            </span>
                        </span>
                    )}
                </span>
                <div className="mt-10">
                    <FormsBtn {...dataSignup} />
                </div>
            </div>
        </section>
    );

    const showList = () => {
        const dataTable = {
            isEverybody,
            isAuthority,
            dataSignup,
            filteredList,
            selectedRole,
            loading,
        };

        return (
            <>
                <RegisteredUsersTable {...dataTable} />
                <div className="relative -top-5 flex items-center justify-center">
                    <FormsBtn {...dataSignup} />
                </div>
            </>
        );
    };

    return (
        <section className="my-[100px]">
            {isEmptyList ? showEmptyIllustration() : showList()}
        </section>
    );
}

/* EXAMPLE

[{"userId":"fdsfsda@gmail.com","userName":"fdkasf sd","userPhone":"(92) 9999-99999","isPhoneWhatsapp":true,"disabledCTA":false,"roomId":"central","role":"autoridade","numberAlertList":[{"contact":92999999999,"type":"ligação"}]}]

*/
