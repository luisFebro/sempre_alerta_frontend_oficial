import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-tailwind/react";

export default function Sidebar({ showSideBar, closeSideBar }) {
    const activeItem =
        "flex items-center gap-4 text-lg font-light px-3 py-3 rounded-lg";

    return (
        <div
            className={`h-screen fixed top-0 md:left-0 ${showSideBar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            style={{
                zIndex: 1000,
            }}
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
                                to="/alertas"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? `${activeItem} text-shadow bg-gradient-to-tr from-light-yellow-500 to-light-yellow-700 text-white shadow-md`
                                        : activeItem
                                }
                                onClick={closeSideBar}
                            >
                                <Icon name="notifications_active" size="3xl" />
                                Alertas SOS
                            </NavLink>
                        </li>
                        <li className="rounded-lg mb-2 text-yellow-600">
                            <NavLink
                                to="/cadastros"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? `${activeItem} text-shadow bg-gradient-to-tr from-light-yellow-500 to-light-yellow-700 text-white shadow-md`
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
    );
}
