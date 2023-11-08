import showToast from "components/toasts/showToast";
import {
    addItem,
    updateItem,
    removeItem,
} from "pages/users/users_list/itemMethods";
import wait from "utils/promises/wait";

export async function saveUserToDb({
    data,
    handleFullClose,
    setList,
    allowCTAClick,
}) {
    showToast("Salvando usuário...");

    allowCTAClick(false);

    // db call
    await wait(2000);

    allowCTAClick(true);

    // NOTE: all data is wiped out when the modal is closed, no need clearForm
    /* dataToSend example
        {"userId":"febro@gmail.com","userName":"febro lusi","userPhone":"(92) 9999-99999","isPhoneWhatsapp":false,"disabledCTA":false,"roomId":"central","role":"admin","numberAlertList":[{"contact":92999999999,"type":"sms"}]}
    */

    showToast("Novo usuário registrado com sucesso!", {
        type: "success",
    });

    console.log("data_saveUserToDb: " + JSON.stringify(data));

    addItem(data, setList);
    handleFullClose();
    return true;
}

export async function updateUserToDb({
    data,
    handleFullClose,
    setList,
    allowCTAClick,
}) {
    showToast("Atualizando usuário...");

    allowCTAClick(false);

    // db call
    await wait(2000);

    allowCTAClick(true);

    showToast("Atualização de cadastro realizada com sucesso!", {
        type: "success",
    });

    updateItem(data, setList);
    handleFullClose();
    return true;
}

export async function removeUserToDb({
    userId,
    handleFullClose,
    setList,
    allowCTAClick,
}) {
    showToast("Excluindo usuário...");

    allowCTAClick(false);

    // db call
    await wait(2000);

    allowCTAClick(true);

    showToast("Usuário excluído com sucesso!", {
        type: "success",
    });

    removeItem(userId, setList);
    handleFullClose();
    return true;
}
