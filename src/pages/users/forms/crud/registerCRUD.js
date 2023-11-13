import getAPI, { updateUser, removeUser } from "api/getAPI";
import showToast from "components/toasts/showToast";
import {
    addItem,
    updateItem,
    removeItem,
} from "pages/users/users_list/itemMethods";
import capitalizeTxt from "utils/capitalizeTxt";

export async function saveUserToDb({
    data,
    handleFullClose,
    setList,
    disableCTAClick,
}) {
    showToast("Salvando usuário...");

    disableCTAClick(true);

    const finalData = {
        ...data,
        isSignup: true,
        userName: capitalizeTxt(data.userName),
    };

    // DB
    const output = await getAPI({
        method: "put",
        url: updateUser(),
        body: finalData,
        timeoutMsgOn: false,
        errMsg: true,
    }).catch(console.log);

    if (!output) {
        disableCTAClick(false);
        return;
    }

    disableCTAClick(false);

    // NOTE: all data is wiped out when the modal is closed, no need clearForm
    /* dataToSend example
        {"userId":"febro@gmail.com","userName":"febro lusi","userPhone":"(92) 9999-99999","isPhoneWhatsapp":false,"disabledCTA":false,"roomId":"central","role":"admin","numberAlertList":[{"contact":92999999999,"type":"sms"}]}
    */

    showToast("Novo usuário registrado com sucesso!", {
        type: "success",
    });

    addItem(finalData, setList);
    handleFullClose();
    return true;
}

export async function updateUserToDb({
    data,
    handleFullClose,
    setList,
    disableCTAClick,
}) {
    showToast("Atualizando usuário...");

    disableCTAClick(false);

    const finalData = {
        ...data,
        userName: capitalizeTxt(data.userName),
    };

    const output = await getAPI({
        method: "put",
        url: updateUser(),
        body: finalData,
        timeoutMsgOn: false,
        errMsg: true,
    }).catch(console.log);

    if (!output) {
        disableCTAClick(false);
        return;
    }

    disableCTAClick(false);

    showToast("Atualização realizada com sucesso!", {
        type: "success",
    });

    updateItem(finalData, setList);
    handleFullClose();
    return true;
}

export async function removeUserToDb({
    userId,
    role,
    handleFullClose,
    setList,
    disableCTAClick,
}) {
    showToast("Excluindo usuário...");

    disableCTAClick(false);

    const output = await getAPI({
        method: "delete",
        url: removeUser(),
        params: {
            userId,
            role,
        },
        timeoutMsgOn: false,
        errMsg: true,
    }).catch(console.log);

    if (!output) {
        disableCTAClick(false);
        return;
    }

    disableCTAClick(false);

    showToast("Usuário excluído com sucesso!", {
        type: "success",
    });

    removeItem(userId, setList);
    handleFullClose();
    return true;
}
