import MainTitle from "components/MainTitle";

export default function Users() {
    return (
        <section className="relative">
            <MainTitle
                className="relative whitespace-nowrap top-40 absolute-center"
                classNameTitle="text-black-500"
                title="Usuários Cadastrados"
                desc="Acompanhe todos os cadastros da instituição"
            />
        </section>
    );
}
