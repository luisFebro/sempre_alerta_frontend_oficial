import { useState } from "react";
import ModalFullContent from "components/modals/ModalFullContent";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Load } from "components/code-splitting/LoadableComp";

const AsyncContent = Load({
    loader: () =>
        import(
            "./EditBtnContent" /* webpackChunkName: "edit-filter-comp-lazy" */
        ),
});

export default function EditBtn(props) {
    const [fullOpen, setFullOpen] = useState(false);

    const isSmall = window.Helper.isSmallScreen();

    const handleFullOpen = () => {
        setFullOpen(true);
    };

    const handleFullClose = () => {
        setFullOpen(false);
    };

    const Comp = <AsyncContent handleFullClose={handleFullClose} {...props} />;

    return (
        <>
            <Fab
                size="small"
                aria-label="add"
                variant="extended"
                className="!p0 !z-0"
                onClick={handleFullOpen}
                style={{
                    backgroundColor: "var(--themeSLight)",
                    color: "white",
                    padding: isSmall ? 0 : 10,
                }}
            >
                <span
                    className={`hidden [@media(min-width:870px)]:inline-block text-shadow text-sm`}
                >
                    editar
                </span>
                <EditIcon className="pl-1" />
            </Fab>
            <ModalFullContent
                contentComp={Comp}
                fullOpen={fullOpen}
                setFullOpen={handleFullClose}
                needIndex={1299}
            />
        </>
    );
}
