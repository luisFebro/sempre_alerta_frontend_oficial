import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { makeStyles } from "@mui/styles";
import IconWarning from "@mui/icons-material/Warning";
import { default as SnackbarMU } from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
    snackbar: {
        // [theme.breakpoints.down("xs")]: {
        //     right: 30,
        //     top: 85, // n2
        // },
        // [theme.breakpoints.up("md")]: {
        //     top: 70,
        // },
    },
    close: {
        padding: "5px",
        color: "#fff",
    },
    //colors
    success: {
        backgroundColor: "#3BCF6F",
    },
    error: {
        backgroundColor: "#ff4757",
    },
    warning: {
        backgroundColor: "#fff",
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: 10,
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
}));

const variantIcon = {
    success: <FontAwesomeIcon icon="check-circle" />,
    warning: <FontAwesomeIcon icon="info-circle" />,
    error: <FontAwesomeIcon icon="exclamation-circle" />,
};

const getStyles = () => ({
    anchorOrigin: { vertical: "top", horizontal: "right" },
    transitionDuration: { enter: 300, exit: 300 },
    snackbarStyle: { zIndex: 20000 },
    msg: { color: "var(--mainWhite)", fontSize: "1.7em", paddingRight: "8px" },
});

const styles = getStyles();

export default function Snackbar({ txt, type = "warning", duration = 3000, snackId }) {
    const [data, setData] = useState({
        open: false,
        msg: "",
    });
    const { open, msg } = data;

    useEffect(() => {
        if (!txt) return;
        if (typeof txt === "string") txt = parse(txt);

        setData({ ...data, open: true, msg: txt });
    }, [txt, snackId]);

    const classes = useStyles();

    const handleClose = () => {
        setData({ ...data, open: false });
    };

    const MsgComp = (
        <span
            id="message-id"
            className={`text-normal text-white ${classes.message}`}
        >
            <div style={styles.msg}>{variantIcon[type]}</div>
            {msg}
        </span>
    );

    const ActionBtn = [
        <IconWarning
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
        >
            <CloseIcon />
        </IconWarning>,
    ];

    const ContentProps = {
        "aria-describedby": "message-id",
        classes: {
            root: classes[type],
        },
    };

    return (
        <SnackbarMU
            id={snackId}
            className={classes.snackbar}
            anchorOrigin={styles.anchorOrigin}
            disableWindowBlurListener={true} //n1
            TransitionComponent={Slide}
            transitionDuration={styles.transitionDuration}
            style={styles.snackbarStyle}
            open={open}
            autoHideDuration={duration}
            resumeHideDuration={500} // n3
            onClose={handleClose}
            ContentProps={ContentProps}
            message={MsgComp}
            action={ActionBtn}
        />
    );
}

/* COMMENTS
n1: If true, the autoHideDuration timer will expire even if the window is not focused.
n2: applied to mobile only
n3: The number of milliseconds to wait before dismissing after user interaction
*/
