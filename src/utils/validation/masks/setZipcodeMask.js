export default function setZipcodeMask(txt) {
    if (!txt) return "";

    txt = String(txt);
    //return `${txt.substring(0, 5)}-${txt.substring(5)}`;
    return (
        txt
            // \D prevent any character other than digits to be inserted
            // warning: this \D also prevents to delete non-digit characters
            .replace(/\D/g, "")
            .replace(/(\d)(\d{3})$/, "$1-$2")
    );
}
