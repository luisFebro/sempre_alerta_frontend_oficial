import ModalFullContent from "components/modals/ModalFullContent";
import React, { useState } from "react";
import FormsContent from "./FormsContent";
import FabBtn from "components/btns/FabBtn";
import { AddCircleOutline } from "@mui/icons-material";

export default function FormsBtn(dataSignup) {
    const [fullOpen, setFullOpen] = useState(false);

    const handleFullOpen = () => {
        setFullOpen(true);
    };

    const handleFullClose = () => {
        setFullOpen(false);
    };

    const Comp = (
        <FormsContent handleFullClose={handleFullClose} {...dataSignup} />
    );
    const Icon = <AddCircleOutline style={{ fontSize: 35 }} />;
    return (
        <>
            <FabBtn
                title="NOVO CADASTRO"
                onClick={handleFullOpen}
                Icon={Icon}
            />
            <ModalFullContent
                contentComp={Comp}
                fullOpen={fullOpen}
                setFullOpen={handleFullClose}
                needIndex
            />
        </>
    );
}
