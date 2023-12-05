import useData from "global-data/useData";
import DeletionFieldArea from "./DeletionFieldArea";

export default function AccountDeletion() {
    const showDeletionFieldArea = () => (
        <section className="mt-28 flex justify-center items-center flex-col">
            <DeletionFieldArea />
        </section>
    );

    return (
        <section className="relative background-access">
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
                    Contas
                </h1>
                <h2
                    className="text-subtitle text-center font-bold"
                    style={{ color: "var(--txtPrimaryLight)" }}
                >
                    Exclusão de conta e dados usuário
                </h2>
            </section>
            {showDeletionFieldArea()}
            <style>
                {`

                    .background-access {
                        background-color: #243B55;  /* fallback for old browsers */
                        background-color: -webkit-linear-gradient(to bottom, #141E30, #243B55);  /* Chrome 10-25, Safari 5.1-6 */
                        background-color: linear-gradient(to bottom, #141E30, #243B55); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */               
                    }
                
                `}
            </style>
        </section>
    );
}
