import { useState } from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "../tooltips/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

// a question instruction button for some functionalities explanations...
export default function InstructionBtn({
    text,
    animated = false,
    tooltipProps,
    btnSize = 25,
    className,
    // blurEffect = false,
}) {
    const defaultFabData = {
        size: "small",
        "aria-label": "info",
        style: {
            color: "#ffffff",
            background: "var(--themeSLight)",
            width: btnSize,
            height: btnSize,
            minHeight: "5px",
            borderRadius: "50%",
        },
    };

    // LESSON: Do not pass a React Element without a html wrapper such as DIV cuz it is gives ref errors...
    // LESSON 2: Fab type="info" redirects the page, should be "button"

    const TooltipBtn = (
        <div className={`${animated ? "animated zoomIn delay-1s" : ""}`}>
            <Fab type="button" className="" onClick={null} {...defaultFabData}>
                <InfoIcon />
            </Fab>
        </div>
    );

    return (
        <section className={`relative inline-block ${className}`}>
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
                    needOpen={false}
                    color="var(--mainWhite)"
                    backgroundColor="var(--mainDark)"
                    element={TooltipBtn}
                    {...tooltipProps}
                />
            </section>
        </section>
    );
}
