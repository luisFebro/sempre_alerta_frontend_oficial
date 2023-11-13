import { HOST_URL } from "config/root";
// use fiddelize.com.br/app to test mobile version in the dev desktop
// to switch back to website version go to home.

export default function isThisApp() {
    // const isInWebAppiOS = window.navigator.userAgent.toLowerCase();
    // // console.log("isInWebAppiOS", isInWebAppiOS) = mozilla/5.0 (windows nt 6.1) applewebkit/537.36 (khtml, like gecko) chrome/79.0.3945.130 safari/537.36
    // const resIos = /iphone|ipad|ipod/.test(isInWebAppiOS);

    // const isAppFromFirefox = window.fullScreen;
    // const isAppFromSafariOrChrome = window.navigator.standalone;
    // const isAppFromChrome = window.matchMedia("(display-mode: standalone)")
    //     .matches;
    // const isAndroidStockBrowserOrElse = checkEnforceMobile(); // samsung

    const checkBrowsers = checkEnforceMobile();
    // resIos ||
    // isAppFromChrome ||
    // isAppFromFirefox ||
    // isAppFromSafariOrChrome ||
    // isAndroidStockBrowserOrElse;

    return checkBrowsers;
}

// https://stackoverflow.com/questions/53378576/detect-web-app-running-as-homescreen-app-on-android-stock-browser
function checkEnforceMobile() {
    if (!(window.sessionStorage || false)) return false; // Session storage not supported

    // window.location.href takes the whole url with params like site.com/app/ana
    // window.location.pathname only reads the params without domain host.
    const isMobileApp =
        window.location.pathname === "/app" ||
        Boolean(window.location.href.indexOf("abrir=1") > 0); // force website urls into mobile mode like /cliente-admin/painel-de-controle?abrir=1
    if (isMobileApp) window.sessionStorage.setItem("isPWA", "1");

    // home now redirect to fiddelize.com but properly removes the isPWA mode
    const isHomeUrl =
        window.location.href === HOST_URL ||
        window.location.href === `${HOST_URL}/`;

    const isWebsitePage = websitePages.some((pg) =>
        window.location.href.includes(pg)
    );

    // this home/website is required because some links are not exclusively from mobile or website. So, only a few conditions need to trigger so the system can still use it as app or website like when accessing fiddelize.com.br/app and jump to admin dashboard. If dashboard doesn't have a mobile link, it will be regarded wrongly as website and vice-versa
    const isNotApp = isHomeUrl || isWebsitePage;
    if (isNotApp) window.sessionStorage.removeItem("isPWA");

    return window.sessionStorage.getItem("isPWA") === "1";
}

/*
Idea to dynamically generate manifest for pick customized logo:
/ This approach has many caveats. Be aware of all of them before using this solution
import manifestBase from '../manifest.json';

const myToken = window.localStorage.getItem('myToken');
const manifest = { ...manifestBase };
manifest.start_url = `${window.location.origin}?standalone=true&myToken=${myToken}`;
const stringManifest = JSON.stringify(manifest);
const blob = new Blob([stringManifest], {type: 'application/json'});
const manifestURL = URL.createObjectURL(blob);
document.querySelector('meta[rel=manifest]').setAttribute('href', manifestURL);

https://stackoverflow.com/questions/53378576/detect-web-app-running-as-homescreen-app-on-android-stock-browser
 */

/*
another alternative solution:
navigator.standalone = navigator.standalone || (screen.height-document.documentElement.clientHeight<40)
https://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile
 */

/* ARCHIVES

console.log("isWebsitePage", isWebsitePage);

// change here only if it is the website to be developed in localhost
let localHostWebsiteMode = true;
localHostWebsiteMode = false;//IS_PROD ? false : localHostWebsiteMode; // do not change this line.
console.log("localHostWebsiteMode", localHostWebsiteMode);

const localHostAppMode = false;//IS_DEV ? true : false;
*/
