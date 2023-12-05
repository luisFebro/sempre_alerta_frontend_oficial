import { useLocation } from "react-router-dom";
import { Button, Icon } from "@material-tailwind/react";
import Dropdown from "components/dropdowns/TailwindDropdown";
import useData from "global-data/useData";
import truncateWords from "utils/string/truncateWords";
import TopNavbarEditBtn from "./edit_btn/TopNavbarEditBtn";
import { AccessTime } from "@mui/icons-material";

export default function TopNavbar({ showSideBar, setShowSideBar }) {
    const location = useLocation().pathname;

    const isSmall = window.Helper.isSmallScreen();

    const { instituteName, alertWorkingHours } = useData();
    const alertOnAtDisplay = alertWorkingHours && alertWorkingHours[0];
    const alertOffAtDisplay = alertWorkingHours && alertWorkingHours[1];

    const alertDaysData = [
        {
            day: "Segunda",
            dayShort: "Seg.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Terça",
            dayShort: "Ter.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Quarta",
            dayShort: "Qua.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Quinta",
            dayShort: "Qui.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Sexta",
            dayShort: "Sex.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Sábado",
            dayShort: "Sab.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
        {
            day: "Domingo",
            dayShort: "Dom.",
            display: ["7:00", "18:00"],
            weight: [700, 1800],
        },
    ];
    const alertStartDay = alertDaysData[0].day;
    const alertEndDay = alertDaysData[6].day;

    // if day off only saturday and sunday: format: Segunda a Sexta
    // if there is day off between weekdays (Seg a Sex) and thus with gaps and not sequential: format: Seg., Quar., Sex e Dom.

    const earliestHour = alertDaysData[0].display[0]; // TODO: hora + cedo: 7:00 (Seg) || hora + tarde: 18:00 (Dom)
    const earliestHourDayShort = alertDaysData[0].dayShort;

    const latestHour = alertDaysData[6].display[1];
    const latestHourDayShort = alertDaysData[6].dayShort;

    const showInstituteBoard = () => (
        <section className="relative top-2 md:top-0">
            <section
                className="flex bg-purple-700 rounded-lg py-2 pb-3 [@media(min-width:870px)]:pb-6"
                style={{ backgroundColor: "var(--themeSurface)" }}
            >
                <div className="mx-2">
                    <p
                        className={`max-w-max px-2 block txt-xs rounded-full text-gray-400`}
                        style={{ backgroundColor: "#204255" }}
                    >
                        INSTITUIÇÃO:
                    </p>
                    <p
                        title={instituteName}
                        className="font-light text-white sm:whitespace-nowrap"
                    >
                        <span className={`inline-block pr-1`}>&#8226;</span>
                        {isSmall
                            ? truncateWords(instituteName, 18)
                            : instituteName}
                    </p>
                    <p
                        className={`max-w-max pr-2 mt-2 block text-sm text-gray-300`}
                    >
                        <AccessTime style={{ fontSize: 20 }} /> DIAS E HORÁRIOS
                        ALERTAS:
                    </p>
                    <p className="font-light text-white sm:whitespace-nowrap">
                        <span className={`inline-block pr-1`}>&#8226;</span>
                        {alertStartDay} a {alertEndDay}
                    </p>
                </div>
                <div
                    className={`absolute -bottom-5 -right-3 [@media(min-width:870px)]:-right-2.5`}
                >
                    <TopNavbarEditBtn />
                </div>
            </section>
        </section>
    );

    const currTabName = location.toUpperCase().replace("/", "");

    return (
        <nav className="ml-0 px-0" style={{ background: "#103F5C" }}>
            <h4
                className={`block top-1 [@media(min-width:870px)]:hidden absolute theme-surface-pill -left-11 z-10 text-pill mx-16 uppercase text-white drop-shadow-2xl font-bold text-lg tracking-wider`}
            >
                &gt; {currTabName}
            </h4>
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 relative">
                <div className="flex justify-between items-center w-full">
                    <div className="flex relative top-9">
                        <h4
                            className={`hidden [@media(min-width:870px)]:block relative top-5 ml-16 uppercase text-white drop-shadow-2xl font-bold text-lg tracking-wider`}
                        >
                            &gt; {currTabName}
                        </h4>
                        <div
                            className={`ml-6 md:ml-16 relative [@media(min-width:870px)]:block`}
                        >
                            {showInstituteBoard()}
                        </div>
                    </div>

                    <section className="flex relative top-4">
                        <div className="md:hidden">
                            <Button
                                color="transparent"
                                buttonType="link"
                                size="lg"
                                iconOnly
                                rounded
                                ripple="light"
                                onClick={() =>
                                    setShowSideBar(
                                        showSideBar === "left-0"
                                            ? "-left-64"
                                            : "left-0"
                                    )
                                }
                                style={{
                                    margin: "0 10px 0 0",
                                }}
                            >
                                <Icon
                                    name={
                                        showSideBar === "left-0"
                                            ? "close"
                                            : "menu"
                                    }
                                    color="white"
                                    style={{ fontSize: 50 }}
                                />
                            </Button>
                        </div>
                        <div className="xl:-mr-4 xl:ml-6">
                            <Dropdown />
                        </div>
                    </section>
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

/* ARCHIVES

 <div
                                className={`absolute top-2 md:hidden ${
                                    showSideBar === "left-0"
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
                                    onClick={() => setShowSideBar("-left-64")}
                                >
                                    <Icon
                                        name="close"
                                        size="2xl"
                                        color="white"
                                    />
                                </Button>
                            </div>

<Dropdown
                                color="transparent"
                                buttonText={
                                    <div class="w-12">
                                        <img
                                            src="assets/img/user/avatar.svg"
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
                                    S
                                </DropdownItem>
                            </Dropdown>

*/
