import { useState } from "react";
import Fab from "@mui/material/Fab";
import FabBtn from "./FabBtn";
import Tooltip from "../tooltips/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

// a question instruction button for some functionalities explanations...
export default function InstructionBtn({
    text,
    onClick,
    mode = "tooltip", // "none", "tooltip", "modal"
    article,
    animated = false,
    tooltipProps,
    zIndex = 135, // even if value is 0, this will be the value.
    btnSize = 35,
    // blurEffect = false,
}) {
    const [needOpen, setNeedOpen] = useState(false);
    const [fullOpen, setFullOpen] = useState(false);

    const handleFullOpen = () => {
        setFullOpen(true);
    };

    const DefaultIcon = (
        <InfoIcon className="flex items-center" style={{ fontSize: 30 }} />
    );

    const defaultFabData = {
        size: "small",
        "aria-label": "info",
        style: {
            color: "white",
            background: "var(--themeSLight)",
            width: btnSize,
            height: btnSize,
            minHeight: "0px",
            borderRadius: "100%",
        },
    };

    const TooltipBtn = // LESSON: Do not pass a React Element without a html wrapper such as DIV cuz it is gives ref errors...
        (
            <div
                className={`${
                    animated ? "animated zoomIn delay-1s" : ""
                } disable-blur`}
            >
                <Fab
                    type="info"
                    {...defaultFabData}
                    onClick={null}
                    // position="relative"
                    // color="var(--themePLight)"
                    // backgroundColor="var(--mainWhite)"
                    // iconFontAwesome={DefaultIcon}
                    // needIconShadow={false}
                >
                    <InfoIcon />
                </Fab>
            </div>
        );

    return (
        <section
            style={{
                position: "relative",
                //zIndex,
            }}
        >
            <section onClick={null}>
                <Tooltip
                    text={text}
                    hover
                    onClickAway={null}
                    padding="10px"
                    arrowBottom="4px !important"
                    whiteSpace
                    width={230}
                    needArrow
                    needOpen={!!needOpen}
                    color="var(--mainWhite)"
                    backgroundColor="var(--mainDark)"
                    element={TooltipBtn}
                    {...tooltipProps}
                />
            </section>
        </section>
    );
}

/* ARCHIVES
 {mode === "modal" && (
                <section>
                    <ButtonFab
                        position="relative"
                        onClick={handleFullOpen}
                        color="var(--themePLight)"
                        backgroundColor="var(--mainWhite)" // light grey
                        iconFontAwesome={DefaultIcon}
                        needIconShadow={false}
                    />
                    <ModalFullContent
                        contentComp={null}
                        fullOpen={fullOpen}
                        setFullOpen={setFullOpen}
                        showBackBtn
                    />
                </section>
            )}


   {/* {mode === "none" && (
                <section>
                    <ButtonFab
                        position="relative"
                        onClick={onClick}
                        color="var(--mainDark)"
                        backgroundColor="#CAD3C8" // light grey
                        iconFontAwesome={DefaultIcon}
                        needIconShadow={false}
                    />
                </section>
            )}


<div className={(closeBtn && blurEffect) ? "blur-back" : undefined}></div>

{false && (
    <CloseButton
        delay={0}
        color="var(--mainDark)"
        position="absolute"
        onClick={() => {
            setNeedOpen(false);
        }}
        top={-20}
        right={-25}
        size="1.4em"
    />
)}
 */
