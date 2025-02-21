import isObj from "./isObj";
import isSmallScreen from "./isSmallScreen";
import truncateWords from "./string/truncateWords";

// GLOBAL PROTOTYPE METHODS n1
// Typography
// Need to be function syntax, otherwise this will return undefined.
const brPreps = [
    "a",
    "e",
    "seu",
    "sua",
    "pela",
    "via",
    "por",
    "com",
    "no",
    "na",
    "em",
    "da",
    "do",
    "das",
    "dos",
    "à",
    "de",
    "de",
];
// eslint-disable-next-line
String.prototype.cap = function () {
    // n2
    const turnInLowercase = this.toLowerCase();
    const capitalized = turnInLowercase.replace(/(?:^|\s)\S/g, (a) =>
        a.toUpperCase()
    );
    const splittedWords = capitalized.split(" ");
    const readyString = splittedWords
        .map((word) => {
            if (brPreps.includes(word.toLowerCase())) {
                return word.toLowerCase();
            }
            return word;
        })
        .join(" ");

    return readyString;
};
// END GLOBAL PROTOTYPE METHODS

// These functions will be available in any part of the app because they can be useful for any component
window.Helper = {};
window.Helper.isObj = isObj;
window.Helper.isSmallScreen = isSmallScreen;
window.Helper.truncate = truncateWords;

/* COMMENTS
n1: These methods are global and they can be used everywhere and import globally
prior: window.Helper.textCapi = textCapi;
n2: String prototype is read only, properties should not be added  no-extend-native
*/
