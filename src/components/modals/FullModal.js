import Dialog from "@material-ui/core/Dialog";
import ButtonLink from "components/buttons/material-ui/ButtonLink";
import CloseBtn from "components/buttons/CloseBtn";
import RadiusBtn from "components/buttons/RadiusBtn";
import { useEffect } from "react";

const getStyles = ({ needIndex }) => ({
    // assign as false when you need to open other modals above this component like calendar dialog
    root: {
        zIndex: needIndex ? 3000 : 15,
        overflowX: "hidden",
    },
});

export default function FullModal({
    contentComp,
    fullOpen,
    setFullOpen,
    style = {},
    animatedClass,
    exitBtn,
    showBackBtn = false,
    needIndex = true,
    backgroundColor,
}) {
    const styles = getStyles({ needIndex });

    const handleOpen = () => {
        return fullOpen;
    };

    const handleModalClose = () => {
        setFullOpen((prevStatus) => !prevStatus);
    };

    // Attempt to avoid body to scrolling when modal is open.
    // useEffect(() => {
    //     if(fullOpen) {
    //         document.body.style.height = "100%";
    //     }
    // }, [fullOpen]);

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: backgroundColor || "var(--mainWhite)",
                    maxWidth: "500px",
                    overflowX: "hidden",
                    zIndex: 1000,
                },
            }}
            onClick={(event) => event.stopPropagation()}
            onScroll={(event) => event.stopPropagation()}
            maxWidth="md"
            fullWidth
            style={styles.root}
            fullScreen={true}
            open={handleOpen()}
            disableBackdropClick={true}
            onExit={null} // Callback fired before the dialog exits.
            aria-labelledby="form-dialog-title"
            className={`${animatedClass || ""}`}
        >
            {contentComp}
            {exitBtn === "text" ? (
                <RadiusBtn
                    position="fixed"
                    onClick={setFullOpen}
                    top={0}
                    right={15}
                    title="voltar"
                    backgroundColor="black"
                    size="extra-small"
                />
            ) : (
                <CloseBtn
                    onClick={setFullOpen}
                    size="40px"
                    top="10px"
                    right="10px"
                />
            )}

            {showBackBtn && (
                <div className="my-4 container-center">
                    <ButtonLink
                        title="back"
                        color="var(--mainWhite)"
                        backgroundColor="var(--themeP)"
                        onClick={handleModalClose}
                    />
                </div>
            )}
        </Dialog>
    );
}
