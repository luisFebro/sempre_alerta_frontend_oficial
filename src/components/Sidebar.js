import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AdminNavbar from "./navbar/AdminNavbar";
import { Icon } from "@material-tailwind/react";

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState("-left-64");
    const activeItem =
        "flex items-center gap-4 text-lg font-light px-3 py-3 rounded-lg";

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, []);

    const closeSideBar = () => setShowSidebar("-left-64");

    const wrapperRef = useRef(null);
    useEffect(() => {
        const openState = "left-0";

        function handleClickOutside(event) {
            if (
                showSidebar === openState &&
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setShowSidebar("-left-64");
            }
        }

        const screenDetect = document.addEventListener(
            "mousedown",
            handleClickOutside
        );
        if (showSidebar !== openState)
            document.removeEventListener("mousedown", () => null);
    }, [showSidebar]);

    return (
        <section ref={wrapperRef}>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <NavLink
                        to="/"
                        end
                        className="flex items-center gap-3 text-sm text-gray-700 font-light px-10 py-8 rounded-lg"
                    >
                        <img
                            src="https://i.imgur.com/VLu1Ndv.png"
                            width="200px"
                            alt="logo"
                        />
                    </NavLink>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4 text-yellow-600">
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${activeItem} bg-gradient-to-tr from-light-yellow-500 to-light-yellow-700 text-white shadow-md`
                                            : activeItem
                                    }
                                    onClick={closeSideBar}
                                >
                                    <Icon
                                        name="notifications_active"
                                        size="3xl"
                                    />
                                    Alertas
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-yellow-600">
                                <NavLink
                                    to="/cadastros"
                                    end
                                    className={({ isActive }) =>
                                        isActive
                                            ? `${activeItem} bg-gradient-to-tr from-light-yellow-500 to-light-yellow-700 text-white shadow-md`
                                            : activeItem
                                    }
                                    onClick={closeSideBar}
                                >
                                    <Icon name="people" size="3xl" />
                                    Cadastros
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ARCHIVES

<li className="hidden px-4 rounded-lg mb-2 text-gray-700">
                                <a
                                    href="https://demos.creative-tim.com/material-tailwind-kit-react/#/login"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="fingerprint" size="3xl" />
                                    Login
                                </a>
                            </li>
                            <li className="hidden px-4 rounded-lg mb-2 text-gray-700">
                                <a
                                    href="https://demos.creative-tim.com/material-tailwind-kit-react/#/register"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="list_alt" size="2xl" />
                                    Register
                                </a>
                            </li>

*/
