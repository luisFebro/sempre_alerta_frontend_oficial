import ModalFullContent from "components/modals/ModalFullContent";
import React, { useState } from "react";
import SignupContent from "./SignupContent";
import FabBtn from "components/btns/FabBtn";
import { AddCircleOutline } from "@mui/icons-material";

export default function SignupBtn({
    selectedUserType,
    setDataForEverybodyForm,
}) {
    const [fullOpen, setFullOpen] = useState(false);

    const handleFullOpen = () => {
        setFullOpen(true);
    };

    const handleFullClose = () => {
        setFullOpen(false);
    };

    const Comp = (
        <SignupContent
            selectedUserType={selectedUserType}
            setDataForEverybodyForm={setDataForEverybodyForm}
        />
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
