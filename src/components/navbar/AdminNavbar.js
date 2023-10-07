import { useLocation } from "react-router-dom";
import { Button, Icon, NavbarInput } from "@material-tailwind/react";
import Dropdown from "../mtailwind/Dropdown";
import EditBtn from "./edit_btn/EditBtn";
import { useState, useEffect } from "react";
import { subDays, formatSlashDMY } from "utils/dates/dateFns";
import { setItems } from "init/lStorage";
import { updateUI, useReadUI } from "init/useData";
import { useUify } from "global-data/ui";

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;

    const isSmall = window.Helper.isSmallScreen();
    const truncate = (name, leng) => window.Helper.truncate(name, leng);

    const DIFF_START_COUNT = 30;

    const uify = useUify();
    const { lists } = useReadUI("global");

    const baseList = lists && lists.base;
    const segmentList = lists && lists.segment;

    const [data, setData] = useState({
        baseList,
        segmentList,
        base: "",
        segment: "",
        // FILTER
        period: "all",
        // for custom date period
        dateInit: subDays(new Date(), DIFF_START_COUNT),
        dateEnd: new Date(),
        diffInDays: DIFF_START_COUNT,
    });
    const { base, segment, period, dateInit, dateEnd, diffInDays } = data;

    // making sure initial key values are stored for filter and correct display of data when there is no caching data.
    useEffect(() => {
        if (baseList && segmentList)
            setData((prev) => ({
                ...prev,
                base: baseList[0],
                segment: segmentList[0],
                baseList: baseList,
                segmentList: segmentList,
            }));
    }, [baseList, segmentList]);

    useEffect(() => {
        // base/segment need to be filled to properly return correct values
        if (base === "" || segment === "") return;

        const filterData = {
            // need include base/segment to update current base in the filter
            base,
            segment,
            period,
            dateInit,
            dateEnd,
        };
        updateUI("global", filterData, uify);
    }, [base, period, segment, dateInit, dateEnd]);

    const isCustomDate = period === "customDate";
    const periodBr = period ? getPeriodBr(period) : "all";
    const baseBr = base && base.cap();
    const segmentBr = segment && segment.cap();

    // const md = "[@media(min-width:870px)]:";
    // RULES
    // doensn't work on production properly
    // 1. it requires colon declared here to run correctly
    // 2. if there is at least one class with syntax error, all others can stop working...

    const showCustomDateRange = () => {
        return (
            <section className="relative text-[11px] text-gray-400 m-0 p-0">
                {formatSlashDMY(dateInit)} até {formatSlashDMY(dateEnd)}
                <span className="block text-[11px] relative -top-1">
                    ({diffInDays} dias)
                </span>
            </section>
        );
    };

    // base only appears for technet admin since every base is limited to itself without access of other ones.
    const showFilterBoard = () => (
        <section className="relative top-5 md:top-0">
            <section
                className="flex bg-purple-700 rounded-lg px-2 py-2 [@media(min-width:870px)]:pb-6"
                style={{ backgroundColor: "var(--themeSurface)" }}
            >
                <div className="mx-5 text-center">
                    <p
                        className={`max-w-max px-2 block rounded-full text-gray-400`}
                        style={{ backgroundColor: "#204255" }}
                    >
                        INSTITUIÇÃO:
                    </p>
                    <p className=" text-center mt-3 font-bold text-white sm:whitespace-nowrap">
                        <span
                            className={`inline-block pr-1 [@media(min-width:870px)]:hidden [@media(min-width:870px)]:pr-0`}
                        >
                            &#8226;
                        </span>
                        {"CENTRAL"}
                    </p>
                </div>
            </section>
        </section>
    );

    const currTabName =
        location === "/" ? "ALERTAS" : location.toUpperCase().replace("/", "");

    return (
        <nav
            className="ml-0 md:ml-64 xl:ml-64 py-6 px-0"
            style={{ background: "#103F5C" }}
        >
            <h4
                className={`block [@media(min-width:870px)]:hidden absolute theme-surface-pill top-0 -left-11 z-10 text-pill mx-16 uppercase text-white drop-shadow-2xl font-bold text-lg tracking-wider`}
            >
                &gt; {currTabName}
            </h4>
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8">
                <div className="flex justify-between items-center w-full">
                    <div className="flex">
                        <h4
                            className={`hidden [@media(min-width:870px)]:block relative top-5 ml-16 uppercase text-white drop-shadow-2xl font-bold text-lg tracking-wider`}
                        >
                            {currTabName}
                        </h4>
                        <div
                            className={`ml-6 md:ml-16 relative [@media(min-width:870px)]:block`}
                        >
                            {showFilterBoard()}
                        </div>
                    </div>

                    <div className="flex">
                        <div className="hidden">
                            <NavbarInput placeholder="Search" />
                        </div>
                        <div className="xl:-mr-4 xl:ml-6">
                            <Dropdown />
                        </div>
                        <div className="md:hidden">
                            <Button
                                color="transparent"
                                buttonType="link"
                                size="lg"
                                iconOnly
                                rounded
                                ripple="light"
                                onClick={() =>
                                    setShowSidebar(
                                        showSidebar === "left-0"
                                            ? "-left-64"
                                            : "left-0"
                                    )
                                }
                                style={{
                                    margin: "0 25px 0 0",
                                }}
                            >
                                <Icon
                                    name={
                                        showSidebar === "left-0"
                                            ? "close"
                                            : "menu"
                                    }
                                    color="white"
                                    style={{ fontSize: 50 }}
                                />
                            </Button>
                            <div
                                className={`absolute top-2 md:hidden ${
                                    showSidebar === "left-0"
                                        ? "left-64"
                                        : "-left-64"
                                } z-50 transition-all duration-300`}
                            >
                                <Button
                                    color="transparent"
                                    buttonType="link"
                                    size="lg"
                                    iconOnly
                                    rounded
                                    ripple="light"
                                    onClick={() => setShowSidebar("-left-64")}
                                >
                                    <Icon
                                        name="close"
                                        size="2xl"
                                        color="white"
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// Helpers

function getPeriodBr(period) {
    if (period === "selecione:") return "all";

    const filterPeriodData = [
        { val: "all", showVal: "Tudo" },
        { val: "today", showVal: "Hoje" },
        { val: "monthly", showVal: "Mês Atual" },
        { val: "customDate", showVal: "Data Personalizada" },
    ];

    return filterPeriodData.find((item) => item.val === period).showVal;
}

// End Helpers

/*

<Dropdown
                                color="transparent"
                                buttonText={
                                    <div class="w-12">
                                        <img
                                            src="assets/img/profile/avatar.svg"
                                            className="rounded-full  max-w-full h-auto align-middle border-none undefined"
                                        />
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: "transparent",
                                }}
                            >
                                <DropdownItem
                                    color="purple"
                                    className="font-normal"
                                >
                                    SAIR
                                </DropdownItem>
                            </Dropdown>

*/
