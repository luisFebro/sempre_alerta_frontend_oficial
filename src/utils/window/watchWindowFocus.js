export default function watchWindowFocus(callback = () => null) {
    window.addEventListener("focus", () => callback());
}
