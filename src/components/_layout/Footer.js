import { useReadUI } from "init/useData";

export default function Footer() {
    const { version = "1.3.2" } = useReadUI();

    return (
        <footer className="mt-96 lg:relative lg:bottom-0 py-6 px-16 border-t border-gray-200 font-light flex flex-col lg:flex-row justify-center items-center max-h-1">
            <p className="font-normal lg:mb-0">
                Sempre Alerta &copy; {new Date().getFullYear()} | versão{" "}
                {version}
            </p>
        </footer>
    );
}
