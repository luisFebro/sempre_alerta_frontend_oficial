import TxtBtn from "components/btns/TxtBtn";
import ModalYesNo from "components/modals/ModalYesNo";
import { useState } from "react";

export default function RemoveUserBtn({ removeCurrentUser, userName, userId }) {
    const [fullOpen, setFullOpen] = useState(false);

    const handleFullOpen = () => {
        setFullOpen(true);
    };

    const handleFullClose = () => {
        setFullOpen(false);
    };

    return (
        <>
            <TxtBtn
                color="red"
                title="excluir usuário"
                onClick={handleFullOpen}
            />
            <ModalYesNo
                title="Confirmação de Exclusão"
                noTitle="voltar"
                noCallback={() => null}
                subTitle={`Todos os dados do app e painel deste usuário será removido permanentemente. Tem certeza que deseja excluir o usuário <span class="font-bold">${userName} (${userId})</span> ?`}
                fullOpen={fullOpen}
                yesTitle="SIM"
                setFullOpen={() => {
                    handleFullClose();
                }}
                actionFunc={removeCurrentUser}
            />
        </>
    );
}
