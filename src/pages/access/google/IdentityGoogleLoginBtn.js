/* REFS
deplacated js platform library: https://developers.google.com/identity/sign-in/web/sign-in
new google identity services apis: https://developers.googleblog.com/2021/07/launching-our-new-google-identity-services-apis.html
google cloud credentials: https://console.cloud.google.com/apis/credentials?referrer=search&hl=pt-BR&project=sempre-alerta-official
docs JS Sign In with Google for Web: https://developers.google.com/identity/gsi/web/reference/js-reference
tutorial: https://www.youtube.com/watch?v=roxC8SMs7HU

// set <script src="https://accounts.google.com/gsi/client" async defer></script> to <head>
*/

import FabBtn from "components/btns/FabBtn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { updateUI, useUify, useReadUI } from "global-data/ui";
import { setItems } from "init/lStorage";
import { init, showGoogleOneTapPrompt } from "./helpers";

/* IMPORTANT: in order to remove the current user, should delete g_state from cache. ref: https://stackoverflow.com/a/76141875/10010404

*/
export default function IdentityGoogleLoginBtn() {
    const [google, setGoogle] = useState(null);
    const [currBtn, setCurrBtn] = useState("custom"); // custom or google
    const isCustomBtn = currBtn === "custom";

    const navigate = useNavigate();
    const uify = useUify();

    const { isLogout } = useReadUI("profile");
    console.log("isLogout: " + isLogout);

    const handleSignInResponse = (response) => {
        if (!response) return;

        // https://developers.google.com/identity/gsi/web/reference/js-reference#select_by
        const selectedBy = response.select_by; // the method user used like if they clicked the btn, it will be "btn". If they signed in via tap one method, then will be ""
        const didUserClickBtn = selectedBy.includes("btn");
        const didUserClickOneTapPopup =
            selectedBy.includes("user") || selectedBy.includes("tap");
        console.log("selectedBy: " + selectedBy);

        const userData = jwtDecode(response.credential);
        const userId = userData && userData.email;

        // TODO check if the userId is in the list db

        updateUI(
            "profile",
            {
                userId,
                access_type: "google",
            },
            uify
        );

        if (didUserClickBtn || didUserClickOneTapPopup) navigate("/alertas");
    };

    const dataGoogle = {
        google,
        handleSignInResponse,
        setCurrBtn,
    };

    useEffect(() => {
        // <script src= async></script>
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client?hl=pt-BR";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
            const thisGoogle = window.google;
            setGoogle(thisGoogle);

            init(thisGoogle, handleSignInResponse);

            if (isLogout) {
                // not used updateUI since if we update the screen, gonna show the prompt again. We need only when the user reload the page
                setItems("profile", { isLogout: false });
            } else null; // showGoogleOneTapPrompt(dataGoogle);
        };
    }, [isLogout]);

    return (
        <>
            <div id="signInBtn" className="hidden animated fadeInUp" />
            {isCustomBtn && (
                <FabBtn
                    title="ACESSAR VIA GOOGLE"
                    onClick={() => showGoogleOneTapPrompt(dataGoogle)}
                    IconLeft={
                        <img
                            className="drop-shadow"
                            src="/img/logo/icon_google_white.svg"
                            width={30}
                            height={30}
                        />
                    }
                />
            )}
        </>
    );
}

/* NOTES

Exponential cooldown - https://developers.google.com/identity/gsi/web/guides/features#exponential_cooldown
If the user closes the One Tap prompt manually, the One Tap prompt is suppressed. A user closes One Tap when they tap Close close in the top-right corner of the prompt, after which One Tap wouldn't display in the same browser or the last website visited for a period of time.

The following exponential time periods are used for cooldowns when FedCM is not enabled:

Consecutive times closed	Time period that One Tap is disabled
1	Two hours
2	One day
3	One week
4+	Four weeks
The cooldown status resets after a successful sign-in using One Tap or the Sign in with Google button.

When FedCM is enabled, browser vendors may define their own, different, cooldown time periods.

*/
