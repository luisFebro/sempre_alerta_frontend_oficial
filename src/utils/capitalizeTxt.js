// This is global and this method can be used everywhere and import globally require('./utils/globalHelpers')
// Need to be function syntax, otherwise this will return undefined.
// capitalize words in a string (except pt-br prepositions), accepts spaces, ref: https://stackoverflow.com/questions/2332811/capitalize-words-in-string
let brPreps = [
    "pela",
    "via",
    "por",
    "com",
    "no",
    "na",
    "da",
    "do",
    "das",
    "dos",
    "a",
    "e",
    "de",
];

function capitalizeTxt(txt = "") {
    if (!txt) return "";

    let capitalized = txt.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    let splittedWords = capitalized.split(" ");
    let readyString = splittedWords
        .map((word) => {
            if (brPreps.includes(word.toLowerCase())) {
                return word.toLowerCase();
            }
            return word;
        })
        .join(" ");

    return readyString;
}

module.exports = capitalizeTxt;
