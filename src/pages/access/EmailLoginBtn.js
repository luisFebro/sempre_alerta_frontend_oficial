import { useNavigate } from "react-router-dom";
import { Email } from "@mui/icons-material";
import FabBtn from "components/btns/FabBtn";
import TxtBtn from "components/btns/TxtBtn";
import Field from "components/fields/Field";
import { useState } from "react";
import wait from "utils/promises/wait";
import showToast from "components/toasts/showToast";

export default function EmailLoginBtn({ isMainArea, toggleEmailArea }) {
    const [data, setData] = useState({
        userId: "",
    });

    const navigate = useNavigate();

    const { userId } = data;
    const [error, setError] = useState(null);
    const handleEmailAuth = async () => {
        // VALIDATION
        if (!userId) {
            setError("userId");
            return showToast("Favor, informe email.", {
                type: "error",
                dur: 10000,
            });
        }
        // END VALIDATION

        showToast("Verificando acesso...", { type: "warning", dur: 10000 });

        // TODO loginUser()
        await wait(3000);

        showToast("Olá, John Doe. Acesso liberado!", {
            type: "success",
            dur: 10000,
        });
        navigate("/alertas");
    };

    const showAccessArea = () => (
        <>
            <section
                className="mb-10 text-normal text-white"
                onBlur={() => setError(null)}
            >
                <span className="relative left-5">
                    Informe email cadastrado:
                </span>
                <Field
                    name="userId"
                    error={error === "userId"}
                    txtColor="var(--themeSLight)"
                    value={userId}
                    onChangeCallback={setData}
                    FieldIcon={
                        <Email style={{ color: "var(--themePLight)" }} />
                    }
                />
            </section>
            <FabBtn
                classNameTitle="text-shadow text-xl px-16"
                title="ACESSAR"
                onClick={handleEmailAuth}
            />
            <div className="mt-5" />
            <TxtBtn
                title="VOLTAR"
                color="var(--themeSLight)"
                onClick={() => toggleEmailArea(false)}
            />
        </>
    );

    return (
        <>
            {isMainArea ? (
                <TxtBtn
                    title="ACESSAR COM EMAIL"
                    color="var(--themeSLight)"
                    onClick={() => toggleEmailArea(true)}
                />
            ) : (
                showAccessArea()
            )}
        </>
    );
}
