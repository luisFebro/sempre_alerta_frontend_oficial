import Card from "@material-tailwind/react/Card";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";
import { useState } from "react";
import InstructionBtn from "./btns/InstructionBtn";
import MainBtn from "./btns/MainBtn";

export default function StatusCard({
    color,
    icon,
    title,
    amount,
    tooltipNote = null,
    needReportBtn,
}) {
    const [openTooltip, setOpenTooltip] = useState(false);
    const isSmall = window.Helper.isSmallScreen();

    const onClickReportBtn = () => {
        alert("Em desenvolvimento...");
    };

    const showCardHeader = () => (
        <div
            color={color}
            className="bg-gradient-to-tr from-yellow-500 to-blue-700 -mt-10 mb-4 rounded-xl text-white grid items-center w-[80px] h-[80px] py-4 px-4 justify-center shadow-lg-blue font-bold"
        >
            <Icon name={icon} size="3xl" color="white" />
        </div>
    );

    return (
        <div className="px-4 mb-10 relative">
            <Card
                style={{
                    height: 10,
                }}
            >
                <CardRow>
                    {showCardHeader()}

                    <div className="w-full pl-1 max-w-full flex-grow flex-1 mb-2 text-right text-purple-700 font-normal">
                        <h5 className="text-gray-500 font-normal tracking-wide text-base mb-1">
                            {title}
                        </h5>
                        <span className="text-3xl text-purple-700">
                            {amount}
                        </span>
                    </div>
                </CardRow>

                <CardStatusFooter
                    date=" "
                    amount=" "
                    className={`mt-5 flex justify-left ${
                        !needReportBtn && "invisible"
                    }`}
                >
                    <MainBtn title="Ver Relatório" onClick={onClickReportBtn} />
                </CardStatusFooter>
            </Card>
            {tooltipNote && (
                <div
                    className={`absolute ${
                        openTooltip || !isSmall
                            ? "-top-4 right-24"
                            : "-top-4 right-0"
                    }`}
                    onClick={() => setOpenTooltip(true)}
                >
                    <InstructionBtn
                        text={tooltipNote}
                        tooltipProps={{ disablePortal: true }}
                        btnSize={30}
                    />
                </div>
            )}
        </div>
    );
}

// COMPS
function CardRow({ children }) {
    return (
        <div className="overflow-hdden undefined">
            {/*w-full bg-white rounded-xl overflow-hdden shadow-md p-4 undefined*/}
            <div className="flex flex-wrap border-b border-gray-200 undefined">
                {children}
            </div>
        </div>
    );
}
