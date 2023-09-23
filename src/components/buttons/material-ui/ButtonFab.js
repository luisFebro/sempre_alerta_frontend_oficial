import React, { Fragment } from "react";
import Fab from "@material-ui/core/Fab";

const handleBtnShadow = (shadowColor, custom) => {
    if (shadowColor) {
        return `drop-shadow(.001em .15em .1em ${shadowColor})`;
    }

    if (custom) {
        return `drop-shadow(${custom})`;
    }

    return "";
};

// NEED CHANGE ICON TO FONT AWESOME TOBE MORE FLEXIBLE
export default function ButtonFab({
    // main
    title,
    onClick,
    variant = "extended", // extended or round
    size = "large", // extra-small, small, medium, large
    color = "var(--themeS)",
    backgroundColor = "var(--themeP)",
    muIcon,
    faIcon,
    imgIcon, // using img tag
    textTransform = "capitalize",
    // endmain
    onMouseOver,
    onMouseDown,
    onTouchStart,
    position = "relative",
    top,
    right,
    bottom,
    left,
    fontSize,
    fontSizeTxt,
    fontWeight,
    iconMarginLeft,
    iconFontSize,
    needIconShadow,
    shadowColor,
    shadowColorCustom,
    titleSize,
    id,
    needTxtNoWrap,
    zIndex,
    width,
    height,
    disabled = false,
}) {
    const isExtended = variant === "extended";
    const istTinySize = size === "extra-small" || size === "nano";
    const gotIcon = (faIcon || muIcon || imgIcon) && isExtended;

    const styles = {
        icon: {
            fontSize: iconFontSize,
            marginLeft: iconMarginLeft,
        },
        fab: {
            fontWeight,
            fontSize,
            position,
            top,
            left,
            bottom,
            right,
            zIndex,
            width,
            height,
            outline: "none",
            backgroundColor,
            filter:
                (shadowColor || shadowColorCustom) &&
                handleBtnShadow(shadowColor, shadowColorCustom),
        },
    };

    const showFaIcon = (faIcon) => (
        <Fragment>
            <i
                className={`fa-icon ${variant} ${
                    needIconShadow ? "icon-shadow" : ""
                } d-flex align-self-center`}
            >
                {faIcon}
            </i>
            <style jsx global>
                {`
                    .fa-icon.extended {
                        margin-left: 0.5rem !important;
                    }
                `}
            </style>
        </Fragment>
    );

    const showMuIcon = (muIcon) => (
        <i className={`${isExtended && "ml-2"} icon-shadow`}>{muIcon}</i>
    );

    const handleDisplay = () => {
        if (imgIcon) return "d-inline-block";
        return gotIcon ? "d-flex" : "";
    };

    return (
        <Fragment>
            <Fab
                id={id}
                variant={variant}
                onClick={onClick}
                className={istTinySize ? `${size} ${variant}` : ""}
                onMouseOver={onMouseOver}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
                size={istTinySize ? "small" : size}
                aria-label={title}
                style={styles.fab}
                disabled={disabled}
            >
                <span
                    className={`btn-txt ${
                        isExtended ? "extended" : ""
                    } ${handleDisplay()} ${
                        needTxtNoWrap ? "text-nowrap" : ""
                    } text-shadow text-normal font-weight-bold`}
                >
                    {title}
                    {faIcon && showFaIcon(faIcon)}
                    {muIcon && showMuIcon(muIcon)}
                    {imgIcon && (
                        <p className="m-0 d-inline-block ml-1">{imgIcon}</p>
                    )}
                </span>
            </Fab>
            <style jsx global>
                {`
                    .btn-txt {
                        color: ${color};
                        text-transform: ${textTransform};
                    }

                    .extra-small.MuiFab-sizeSmall.round {
                        width: 32px;
                        height: 32px;
                    }
                    .extra-small.MuiFab-sizeSmall.extended {
                        height: 32px;
                    }

                    .extra-small.MuiFab-root {
                        min-height: 0px;
                    }
                    .extra-small.MuiFab-sizeSmall .btn-txt.extended {
                        font-size: 1.1em !important;
                    }
                    .extra-small svg {
                        height: 0.85em !important;
                    }

                    .nano.MuiFab-sizeSmall.extended {
                        height: 25px;
                    }
                    .nano.MuiFab-sizeSmall .btn-txt.extended {
                        font-size: 0.9em !important;
                    }
                    .nano.MuiFab-sizeSmall.round {
                        width: 25px;
                        height: 25px;
                    }
                    .nano.MuiFab-root {
                        min-height: 0px;
                    }
                    .nano.round svg {
                        height: 0.7em !important;
                    }
                    .nano.extended svg {
                        height: 0.9em !important;
                    }

                    @media screen and (min-width: 768px) {
                        .extra-small.round svg {
                            height: 0.65em !important;
                        }

                        .nano.round svg {
                            height: 0.5em !important;
                        }
                    }
                `}
            </style>
        </Fragment>
    );
}

export const muStyle = {
    transform: "scale(1.2)",
    marginLeft: "3px",
};

export const faStyle = {
    fontSize: "30px",
    filter: "drop-shadow(.5px .5px 1.5px black)",
    color: "white",
};

export const faStyleSmall = {
    fontSize: "25px",
};
