import React from "react";
import { useState, useEffect, useRef } from "react";
import TopNavbar from "./top_navbar/TopNavbar";
import SidebarNavbar from "./side_navbar/SidebarNavbar";
import CurvesDesign from "./top_navbar/curves_design/CurvesDesign";
import checkValidSession from "auth/checkValidSession";
import { useUify } from "global-data/useData";
import loadInit from "auth/api";
import { usePrivateAccess } from "auth/access/authenticate";
import { useNavigate } from "react-router-dom";
import getVar from "cache/indexedDB";

export default function Navigation() {
    const [showSideBar, setShowSideBar] = useState("-left-64");

    const uify = useUify();

    useEffect(() => {
        checkValidSession(uify);

        getVar("userId").then((userId) => {
            loadInit(uify, userId);
        });
    }, []);

    usePrivateAccess(useNavigate());

    const wrapperRef = useRef(null);
    useEffect(() => {
        const openState = "left-0";

        function handleClickOutside(event) {
            if (
                showSideBar === openState &&
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setShowSideBar("-left-64");
            }
        }

        const screenDetect = document.addEventListener(
            "mousedown",
            handleClickOutside
        );
        if (showSideBar !== openState)
            document.removeEventListener("mousedown", () => null);
    }, [showSideBar]);

    const closeSideBar = () => setShowSideBar("-left-64");

    return (
        <section ref={wrapperRef}>
            <TopNavbar
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
            />
            <CurvesDesign />
            <SidebarNavbar
                closeSideBar={closeSideBar}
                showSideBar={showSideBar}
            />
        </section>
    );
}
