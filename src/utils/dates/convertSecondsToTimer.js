export default function convertSecondsToTimer(totalSeconds, options = {}) {
    const { written = true } = options;
    if (!totalSeconds) return written ? "0s" : "00:00:00";

    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(11, 19);
    if (!written) return result; // e.g 00:01:40 if 100 seconds

    const [hours, minutes, seconds] = result.split(":");
    const needHours = hours != "00";
    const needMinutes = minutes != "00";
    const needSeconds = seconds != "00"; // !needHours && needMinutes;

    return `${needHours ? `${hours}h ` : ""}${
        needMinutes ? `${minutes}m` : ""
    }${needSeconds ? ` ${seconds}s` : ""}`;
}
