import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./top_navbar/TopNavbar";
import SidebarNavbar from "./side_navbar/SidebarNavbar";
import CurvesDesign from "./top_navbar/curves_design/CurvesDesign";

export default function Navigation() {
    const [showSideBar, setShowSideBar] = useState("-left-64");

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, []);

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
            <CurvesDesign />
            <TopNavbar
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
            />
            <SidebarNavbar
                closeSideBar={closeSideBar}
                showSideBar={showSideBar}
            />
        </section>
    );
}
