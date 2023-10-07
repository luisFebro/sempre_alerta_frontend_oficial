import { useState, Fragment } from "react";
import { Dialog, DialogTitle, DialogContentText } from "@mui/material";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainBtn from "components/btns/MainBtn";
import TxtBtn from "components/btns/TxtBtn";

export default function ModalYesNo({
    title,
    subTitle,
    fullOpen,
    setFullOpen,
    contentComp,
    actionFunc,
    actionFuncParam = false,
    marginCTA,
    needIndex = true,
    needBackBtn = false,
    needCTAs = true,
    yesTitle = "SIM",
    yesBtnColor = "var(--mainRed)",
    yesBtnIcon = "times",
    noTitle = "NÃO",
    noCallback,
}) {
    const [isYesBtnDisabled, setIsYesBtnDisabled] = useState(false);
    // LESSON: for critical data handling, the button should be permanent disabled

    const showActionBtns = () => (
        <Fragment>
            {needBackBtn ? (
                <MainBtn
                    title="Voltar"
                    size="lg"
                    onClick={() => setFullOpen(false)}
                    variant="link"
                />
            ) : (
                <section
                    className={`${marginCTA || "my-9"} flex justify-around`}
                >
                    <TxtBtn
                        title={noTitle}
                        onClick={() => {
                            if (typeof noCallback === "function") {
                                noCallback();
                            }
                            setFullOpen(false);
                        }}
                    />
                    <MainBtn
                        title={yesTitle}
                        disabled={!!isYesBtnDisabled}
                        onClick={() => {
                            setIsYesBtnDisabled(true);
                            setFullOpen(false);
                            actionFunc(actionFuncParam);
                        }}
                        iconFontAwesome={
                            <FontAwesomeIcon
                                icon={yesBtnIcon}
                                // style={faStyle}
                            />
                        }
                        backgroundColor={yesBtnColor}
                    />
                </section>
            )}
        </Fragment>
    );

    const showTitle = () => (
        <DialogTitle id="form-dialog-title">
            <p
                className="m-0 text-2xl text-purple text-center font-weight-bold"
                style={{
                    lineHeight: "30px",
                }}
            >
                {title && parse(title)}
            </p>
        </DialogTitle>
    );

    const showSubTitle = () => (
        <DialogContentText>
            <div className="m-0 text-lg text-center">
                {subTitle && parse(subTitle)}
            </div>
        </DialogContentText>
    );

    return (
        <Dialog
            PaperProps={{
                style: {
                    backgroundColor: "var(--mainWhite)",
                    maxWidth: "400px",
                },
            }}
            style={{
                zIndex: needIndex ? 3000 : 15,
            }}
            open={fullOpen}
            maxWidth="sm"
            aria-labelledby="form-dialog-title"
            className="animated fadeIn faster"
        >
            <div className="mx-5">
                {showTitle()}
                {showSubTitle()}
            </div>

            {contentComp}
            {needCTAs && showActionBtns()}
        </Dialog>
    );
}
