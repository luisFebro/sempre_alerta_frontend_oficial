import { Fragment } from "react";
// import useRun from "global-data/ui";
import { Dialog } from "@mui/material";
import CloseButton from "components/btns/CloseButton";
// import RadiusBtn from "../buttons/RadiusBtn";
// import ButtonMulti from "../buttons/material-ui/ButtonMulti";

const handleZIndex = (needIndex) => {
    if (typeof needIndex === "number") return needIndex;
    if (needIndex) return 3000;

    return 15;
};

const getStyles = ({ needIndex }) => ({
    // assign as false when you need to open other modals above this component like calendar dialog
    root: {
        zIndex: handleZIndex(needIndex),
        overflowX: "hidden",
    },
});

export default function ModalFullContent({
    contentComp,
    fullOpen,
    fullScreen = true,
    setFullOpen,
    animatedClass,
    exitBtn,
    showBackBtn = false,
    needIndex = true,
    backgroundColor,
    maxWidth = "500px",
    overflowY = undefined,
    needCloseBtn = true,
    closeButtonZIndex = 1500,
    // style,
}) {
    // const { runName } = useRun();

    const styles = getStyles({ needIndex });

    const handleOpen = () => {
        // if (runName === "closeModalFullContent") return false;
        return fullOpen;
    };

    const handleModalClose = () => {
        setFullOpen((prevStatus) => !prevStatus);
    };

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: backgroundColor || "#fff", // var(--mainWhite)
                    maxWidth,
                    overflowX: "hidden",
                    overflowY,
                },
            }}
            maxWidth="md"
            fullWidth
            style={styles.root}
            fullScreen={fullScreen}
            open={handleOpen()}
            aria-labelledby="form-dialog-title"
            className={`${animatedClass || ""}`}
            onScroll={null}
        >
            {contentComp}
            {exitBtn === "text" ? null : ( // archive 1
                <>
                    {needCloseBtn && (
                        <CloseButton
                            onClick={setFullOpen}
                            position="absolute"
                            size="40px"
                            top="10px"
                            right="10px"
                            zIndex={closeButtonZIndex}
                        />
                    )}
                </>
            )}

            {/* {showBackBtn && (
                <div className="my-4 container-center">
                    <ButtonMulti
                        title="Voltar"
                        color="var(--mainWhite)"
                        backgroundColor="var(--themeP)"
                        onClick={handleModalClose}
                    />
                </div>
            )} */}
        </Dialog>
    );
}

/* ARCHIVES



*/
