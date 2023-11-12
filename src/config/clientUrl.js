// source images are not loadin with official website.
// SOLVED THE ISSUE by adding _headers and netlify.toml alongside the index.hmtl
exports.CLIENT_URL =
    process.env.NODE_ENV === "production"
        ? "https://semprealertasos.com.br"
        : "http://localhost:3000";

exports.IS_DEV = process.env.NODE_ENV === "development";
exports.IS_PROD = process.env.NODE_ENV === "production";
