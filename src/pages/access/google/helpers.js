import showToast from "components/toasts/showToast";

export const showGoogleOneTapPrompt = (data) => {
    const isSmall = window.Helper.isSmallScreen();

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

            const notDisplayedReason = notification.getNotDisplayedReason();
            let msg =
                "Área de acesso foi fechada ou indiponível. Clique no novo botão para acessar sua conta.";

            // third-party cookies blocked on chrome mobile.
            // TODO: migrate to FedCM - no third party cookies used - https://developers.google.com/identity/gsi/web/guides/fedcm-migration
            if (notDisplayedReason === "opt_out_or_no_session")
                msg =
                    "Cookies estão bloqueados no seu dispositivo. Clique no novo botão para acessar sua conta.";

            showToast(msg, {
                type: "warning",
            });

            return;
        }

        const googlePromptFrame = document.querySelector(
            "#credential_picker_container iframe"
        );
        if (googlePromptFrame)
            googlePromptFrame.src = googlePromptFrame.src + "&hl=pt-BR";

        if (notification.isDisplayed() && !isSmall) {
            // mobile toast is blocking the popup which shows underneath
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
    // LESSON: for production, check if client ID has change at https://console.cloud.google.com/apis/credentials/oauthclient/206323177014-i52ksv5v0dk254oqdliqsg6p232gcmv2.apps.googleusercontent.com?project=sempre-alerta-official&supportedpurview=project
    // also: Note: It may take 5 minutes to a few hours for settings to take effect
    const clientId =
        "206323177014-i52ksv5v0dk254oqdliqsg6p232gcmv2.apps.googleusercontent.com";

    google.accounts.id.initialize({
        client_id: clientId,
        cancel_on_tap_outside: false,
        ux_mode: "popup",
        login_hint: undefined, // https://developers.google.com/identity/gsi/web/reference/js-reference#login_hint - If your application knows in advance which user should be signed-in, it can provide a login hint to Google. When successful, account selection is skipped. Accepted values are: an email address or an ID token sub field value.
        itp_support: true, // This field determines if the upgraded One Tap UX should be enabled on browsers that support Intelligent Tracking Prevention (ITP). The default value is false
        callback,
    });
}
