import { Email } from "@mui/icons-material";
import getAPI, { updateAccount } from "api/getAPI";
import FabBtn from "components/btns/FabBtn";
import CheckBoxForm from "components/checkboxes/CheckboxForm";
import Field from "components/fields/Field";
import showToast from "components/toasts/showToast";
import { useState } from "react";

export default function DeletionFieldArea() {
    const [isBoxChecked, setIsBoxChecked] = useState(false);

    const [data, setData] = useState({
        userId: "",
    });
    const { userId } = data;
    const [error, setError] = useState(null);

    const showRemovalTerms = () => (
        <section
            className="px-5 md:w-[700px] text-justify text-normal"
            style={{
                color: "var(--txtGrayLight)",
            }}
        >
            <h2
                className="text-xl font-bold text-center my-5"
                style={{ color: "var(--txtPrimaryLight)" }}
            >
                Termos de Exclusão
            </h2>
            <h2 className="text-xl pt-5 font-bold">
                Os dados para ser excluídos incluem:
            </h2>
            <ul
                className="list-disc ml-8 text-normal"
                style={{
                    color: "var(--txtGrayLight)",
                }}
            >
                <li>Nome Completo;</li>
                <li>Email;</li>
                <li>Telefone;</li>
                <li>Dados relacionados à interação com app e/ou painel;</li>
            </ul>

            <h2 className="text-xl pt-5 font-bold">
                Ao solicitar a exclusão de sua conta:
            </h2>
            <p>
                1. A Sempre Alerta SOS tem até <strong>15 dias</strong> para
                excluir todos seus dados de nossos servidores de acordo com a{" "}
                <a
                    href="https://www.trf5.jus.br/index.php/lgpd/lgpd-direitos-do-titular"
                    target="_blank"
                    className="underline"
                >
                    lei de proteção de dados LGPD (Art. 19, inciso II).
                </a>
            </p>
            <p className="mt-3">
                2. Sua conta é removida da lista de contatos da instituição e
                não receberá mais nenhuma forma de alerta, incluindo: SMS,
                Whatsapp, email eletrônico, notificação ou ligação (este último
                para autoridades) de alertas SOS.
            </p>
            <p className="mt-3">
                3. É deslogado do app e perde acesso a todos os serviços da
                Sempre Alerta SOS.
            </p>
            <p className="mt-3">
                4. Dados permitidos no app como de geolocalização são mantidos
                para fins de registros da instituição quando é disparado um
                alerta SOS. Se precisar da exclusão destes dados caso tenha
                feito algum alerta, entre em contato conosco.
            </p>
            <div className="mt-5">
                <CheckBoxForm
                    color="#ffffff"
                    text="concordo com os termos acima"
                    setIsBoxChecked={setIsBoxChecked}
                />
            </div>
        </section>
    );

    const handleDeletionAccount = async () => {
        // VALIDATION
        if (!userId) {
            setError("userId");
            return showToast("EXC-1 | Favor, informe email.", {
                type: "error",
                dur: 3000,
            });
        }

        if (!isBoxChecked) {
            return showToast(
                "EXC-2 | Você precisa concordar com os termos de exclusão ao clicar na caixa acima.",
                {
                    type: "error",
                    dur: 3000,
                }
            );
        }
        // END VALIDATION

        const output = await getAPI({
            method: "put",
            url: updateAccount(),
            body: {
                userId,
                deletionRequest: true,
            },
            errMsg: true,
        }).catch(console.log);

        if (!output) return;

        showToast(
            "Sua solicitação de exclusão foi recebida com sucesso. Redirecionando em 3 segundos.",
            {
                type: "success",
            }
        );

        setTimeout(() => {
            window.location.href = "/";
        }, 3000);
    };

    return (
        <>
            <section
                className="mb-10 text-normal text-white"
                onBlur={() => setError(null)}
            >
                <span className="relative left-5 -top-1">
                    Informe email cadastrado para excluir:
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
                    fancyMode
                />
            </section>
            {showRemovalTerms()}

            <section className="mt-10 mb-20">
                <FabBtn
                    classNameTitle="text-shadow text-xl px-16"
                    title="EXCLUIR CONTA"
                    onClick={handleDeletionAccount}
                />
            </section>
        </>
    );
}
