import showToast from "components/toasts/showToast";

export const showGoogleOneTapPrompt = (data) => {
    const { google, handleSignInResponse } = data;
    if (!google)
        return showToast(
            "Erro ao acessar sua conta do Google. Tente recarregar a página ou verifique se está logado com um conta Google.",
            { type: "error" }
        );

    init(google, handleSignInResponse);

    google.accounts.id.prompt((notification) => {
        const isPromptedNotDisplayed =
            notification.isNotDisplayed() || notification.isSkippedMoment();
        if (isPromptedNotDisplayed) {
            // exponetional cooldown n1
            console.log("isPromptedNotDisplayed: " + isPromptedNotDisplayed);

            renderDefaultGoogleBtn(data);

            showToast(
                "Área de acesso foi fechada ou indiponível. Clique no novo botão para acessar sua conta.",
                {
                    type: "warning",
                }
            );

            return;
        }

        const googlePromptFrame = document.querySelector(
            "#credential_picker_container iframe"
        );
        if (googlePromptFrame)
            googlePromptFrame.src = googlePromptFrame.src + "&hl=pt-BR";

        if (notification.isDisplayed()) {
            showToast("Selecione uma conta e clique em continuar.", {
                type: "warning",
                dur: 3000,
            });
        }
    });
};

function renderDefaultGoogleBtn({ google, handleSignInResponse, setCurrBtn }) {
    if (!google)
        return showToast(
            "Botão não foi carregado corretamente. Favor, recarregue a página e tente novamente.",
            { type: "error" }
        );

    init(google, handleSignInResponse);

    // ref: https://stackoverflow.com/a/72685404/10010404
    // https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration
    google.accounts.id.renderButton(document.getElementById("signInBtn"), {
        theme: "filled_blue",
        size: "large",
        text: "Acessar via Google",
        shape: "circle",
        locale: "pt-BR",
        width: "300",
        click_listener: () => null,
    });

    setCurrBtn("google");
    if (Boolean(document.getElementById("signInBtn"))) {
        document.getElementById("signInBtn").style.display = "block";
    }
}

/* HELPERS */
export function init(google, callback) {
    const clientId =
        "206323177014-sd9e35j7a85q8v5hq0083prlu0gsft20.apps.googleusercontent.com";

    google.accounts.id.initialize({
        client_id: clientId,
        cancel_on_tap_outside: false,
        callback,
    });
}
