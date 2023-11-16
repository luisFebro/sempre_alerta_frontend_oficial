import useData from "global-data/useData";

export default function Footer() {
    const { version } = useData();

    return (
        <footer className="mt-96 lg:relative lg:bottom-0 py-10 px-16 border-t border-gray-200 font-light flex flex-col lg:flex-row justify-center items-center max-h-1">
            <span className="text-normal text-center m-0 p-0">
                Sempre Alerta &copy; {new Date().getFullYear()}
                <br />
                <span className="text-gray-500">versão {version}</span>
            </span>
        </footer>
    );
}
