import FabBtn from "components/btns/FabBtn";
import React from "react";
import capitalize from "utils/string/capitalize";
import SignupBtn from "../signup_forms/SignupBtn";

export default function RegisteredUsersList({
    selectedUserType,
    setDataForEverybodyForm,
}) {
    const isEverybody = selectedUserType === "todos";

    const showEmptyIllustration = () => (
        <section>
            <div className="relative -top-20 flex flex-col justify-center items-center">
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
            </div>
            <div className="relative -top-10 flex items-center justify-center">
                <SignupBtn
                    selectedUserType={selectedUserType}
                    setDataForEverybodyForm={setDataForEverybodyForm}
                />
            </div>
        </section>
    );

    return (
        <section className="mx-3 my-[200px]">{showEmptyIllustration()}</section>
    );
}
