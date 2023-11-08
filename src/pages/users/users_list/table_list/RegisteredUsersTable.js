import FormsContent from "pages/users/forms/FormsContent";
import { useState } from "react";
import MuSelectTable from "./MuSelectTable";
import ModalFullContent from "components/modals/ModalFullContent";

export default function RegisteredUsersTable({
    isEverybody,
    isAuthority,
    dataSignup,
    filteredList,
    selectedRole,
    loading,
}) {
    const handleLabelUserNameTitle = () => {
        if (isEverybody) return "Nome";
        return isAuthority ? "Nome Instituição Emergência" : "Nome Usuário";
    };

    const headCells = [
        {
            id: "userName",
            numeric: false,
            disablePadding: false,
            label: handleLabelUserNameTitle(),
        },
        {
            id: "userId",
            numeric: false,
            disablePadding: false,
            label: isAuthority ? "Email da Instituição" : "Email",
        },
        {
            id: "numberAlertList",
            numeric: false,
            isList: true,
            disablePadding: false,
            label: "Número(s) para alerta SOS",
        },
    ];

    if (isEverybody)
        headCells.splice(1, 0, {
            id: "role",
            numeric: false,
            disablePadding: false,
            label: "Tipo Usuário",
        });

    const [openEditModal, setOpenEditModal] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    const handleEditModalClose = () => {
        setOpenEditModal(false);
    };

    const handleEditBtn = (itemInd) => {
        setOpenEditModal(true);
        const itemData = filteredList[itemInd];
        setUpdateData(itemData);
    };

    const Comp = (
        <FormsContent
            updateData={updateData}
            handleFullClose={handleEditModalClose}
            {...dataSignup}
        />
    );

    return (
        <>
            <MuSelectTable
                headCells={headCells}
                listName={
                    isEverybody
                        ? "Todos os usuários"
                        : `Lista usuários - ${
                              selectedRole && selectedRole.cap()
                          }`
                }
                rowsData={filteredList}
                loading={loading}
                emptySelection={false}
                callbackEditBtn={handleEditBtn}
            />
            {openEditModal && (
                <ModalFullContent
                    contentComp={Comp}
                    fullOpen={openEditModal}
                    setFullOpen={handleEditModalClose}
                    needIndex
                />
            )}
        </>
    );
}
