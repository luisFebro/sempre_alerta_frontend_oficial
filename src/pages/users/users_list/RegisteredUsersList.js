import React, { useEffect, useState } from "react";
import capitalize from "utils/string/capitalize";
import FormsBtn from "../forms/FormsBtn";
import RegisteredUsersTable from "./table_list/RegisteredUsersTable";

export default function RegisteredUsersList({
    selectedUserType = " ",
    setDataForEverybodyForm,
    dbList,
}) {
    const [list, setList] = useState([]); // n1
    const isEverybody = selectedUserType === "todos";
    const isAuthority = selectedUserType === "autoridade";
    const loading = false;

    const filteredList = isEverybody
        ? list
        : list.filter((elem) => elem.userType === selectedUserType);
    const isEmptyList = Boolean(filteredList && filteredList.length === 0);

    const dataSignup = {
        selectedUserType,
        setDataForEverybodyForm,
        setList,
    };

    useEffect(() => {
        setList(dbList);
    }, []);

    const showEmptyIllustration = () => (
        <section>
            <div className="relative flex flex-col justify-center items-center">
                <span>
                    <img
                        src="/img/illustra/illustration_no_data_contacts.svg"
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
                                {capitalize(selectedUserType)}
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
            selectedUserType,
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
        <section className="mx-3 my-[100px]">
            {isEmptyList ? showEmptyIllustration() : showList()}
        </section>
    );
}

/* EXAMPLE

[{"userId":"fdsfsda@gmail.com","userName":"fdkasf sd","userPhone":"(92) 9999-99999","gotUserPhoneWhatsup":true,"disabledCTA":false,"roomId":"central","userType":"autoridade","numberAlertList":[{"contact":92999999999,"type":"ligação"}]}]

*/
