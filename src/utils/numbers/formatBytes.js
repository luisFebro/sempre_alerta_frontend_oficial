// reference: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

export default function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 bytes";

    const k = 1000; // To be precise, if k is 1024 then the unit abbreviations should be KiB, MiB, GiB, etc. These are kibibytes, mebibytes, gibibytes, etc
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"]; // pb - pentabytes, eb - exabyte, zb - zettabytes yb - yottabyte

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
        sizes[i] || "yb"
    }`;
}
