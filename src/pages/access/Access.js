import React, { useEffect, useState } from "react";
import IdentityGoogleLoginBtn from "./google/IdentityGoogleLoginBtn";
import EmailLoginBtn from "./EmailLoginBtn";
import { updateData, useUify } from "global-data/useData";
import { HOST_URL } from "config/root";
import useBackColor from "hooks/useBackColor";

const DASHBOARD_OFFICIAL_VERSION = "v1.18.20-6";

export default function Access() {
    const isSmall = window.Helper.isSmallScreen();

    const [data, setData] = useState({
        area: "main", // main or email. default: main
    });
    const { area } = data;
    const isMainArea = area === "main";

    const uify = useUify();

    useBackColor("bg-[#243B55]");

    useEffect(() => {
        updateData(uify, {
            version: DASHBOARD_OFFICIAL_VERSION,
        });
    }, []);

    const toggleEmailArea = (status = false) => {
        setData((prev) => ({
            ...prev,
            area: status ? "email" : "main",
        }));
    };

    const showEmailArea = () => (
        <section className="mt-28 flex justify-center items-center flex-col">
            <EmailLoginBtn
                isMainArea={false}
                toggleEmailArea={toggleEmailArea}
            />
        </section>
    );

    const showMainCTAsArea = () => (
        <section className="mt-28 flex justify-center items-center flex-col">
            <IdentityGoogleLoginBtn />
            <span
                className="relative top-2 block text-subtitle text-center my-5 font-bold"
                style={{ color: "var(--txtPrimaryLight)" }}
            >
                OU
            </span>
            <EmailLoginBtn
                isMainArea={true}
                toggleEmailArea={toggleEmailArea}
            />
        </section>
    );

    return (
        <section className="relative">
            <section className="flex flex-col items-center">
                <img
                    className="my-5"
                    src="/img/logo/logo_sempre_alerta_s.png"
                    width={80}
                    height={80}
                />
                <h1
                    className="text-title text-center"
                    style={{ color: "var(--txtPrimaryLight)" }}
                >
                    Acesso
                </h1>
                <h2
                    className="text-subtitle text-center font-bold"
                    style={{ color: "var(--txtPrimaryLight)" }}
                >
                    Painel Sempre Alerta
                </h2>
            </section>
            {isMainArea ? showMainCTAsArea() : showEmailArea()}
            <img
                className="fixed -bottom-10 -left-10 -rotate-45 opacity-40"
                src={`${HOST_URL}/img/illustra/access/illustra_megaphone_oficial.svg`}
                width={isSmall ? 140 : 200}
                height={isSmall ? 140 : 200}
            />
            <img
                className="fixed -bottom-10 -right-10 -rotate-45 opacity-40"
                src="/img/illustra/access/illustra_sirene_oficial.svg"
                width={isSmall ? 170 : 240}
                height={isSmall ? 170 : 240}
            />
            <p className="text-lg txt-p-light text-center fixed bottom-1 left-1/2 -translate-x-1/2">
                {DASHBOARD_OFFICIAL_VERSION}
            </p>
        </section>
    );
}
