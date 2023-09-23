import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import animateCSS from "utils/animateCSS";

export default function CloseBtn({
    delay,
    onClick,
    size = "1.9em",
    color = "var(--mainWhite)",
    top = "0px",
    left,
    right,
    position = "fixed",
}) {
    const styles = {
        closeBtn: {
            position,
            top,
            left,
            right,
            fontSize: size,
            color,
            cursor: "pointer",
            zIndex: 1500,
            filter: "drop-shadow(0.001em 0.1em 0.1em grey)",
        },
    };

    const closeBtn = (e) => {
        const elem = e.currentTarget;
        elem.classList.remove(
            "animated",
            "rotateIn",
            typeof delay === "number" ? `delay-${delay}s` : "delay-2s"
        );
        animateCSS(elem, "rotateOut", "normal", () => onClick());
    };

    return (
        <FontAwesomeIcon
            icon="times-circle"
            style={styles.closeBtn}
            className="animated rotateIn delay-1s"
            onClick={(e) => closeBtn(e)}
        />
    );
}
