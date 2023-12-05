import { useState } from "react";
import ModalFullContent from "components/modals/ModalFullContent";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Load } from "components/code-splitting/LoadableComp";
import showToast from "components/toasts/showToast";

const AsyncContent = Load({
    loader: () =>
        import(
            "./TopNavbarEditBtnContent" /* webpackChunkName: "edit-filter-comp-lazy", webpackMode: "eager" */
        ),
});

export default function TopNavbarEditBtn(props) {
    const [fullOpen, setFullOpen] = useState(false);

    const isSmall = window.Helper.isSmallScreen();

    const handleFullOpen = () => {
        // TEST (on) - DONT ALLOW ACCESS OF EDIT UNTIL CHANGE NEW DAYS AND HOURS STRUCTURE
        showToast(
            "Temporariamente desativado. Desenvolvendo nova estrutura de dias e horas aqui."
        );
        return null;

        setFullOpen(true);
    };

    const handleFullClose = () => {
        setFullOpen(false);
    };

    const Comp = <AsyncContent handleFullClose={handleFullClose} {...props} />;

    return (
        <>
            <Fab
                size={isSmall ? "large" : "small"}
                aria-label="add"
                variant="extended"
                className="fab-btn"
                onClick={handleFullOpen}
                style={{
                    backgroundColor: "var(--themeSDark)",
                    color: "white",
                    padding: isSmall ? 0 : 10,
                    zIndex: 10,
                }}
            >
                <span
                    className={`hidden text-xs [@media(min-width:870px)]:inline-block text-shadow [@media(min-width:870px)]:text-sm`}
                >
                    editar
                </span>
                <EditIcon className="pl-1" />
            </Fab>
            <style jsx global>
                {`
                    .fab-btn.MuiFab-root,
                    .fab-btn.MuiButtonBase-root {
                        padding: 0 16px;
                        border-radius: 50px;
                    }
                `}
            </style>
            <ModalFullContent
                contentComp={Comp}
                fullOpen={fullOpen}
                setFullOpen={handleFullClose}
                needIndex={1299}
            />
        </>
    );
}
