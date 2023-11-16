const IS_PROD = process.env.NODE_ENV === "production";
// API_URL DOMAIN

// In a branch feature, set staging in api/root.js (frontend) when required to test in staging production when devoloping a new feature.
// IMPORTANT: this should be set to false when merging to master.
// it is recommended to set to false right after making a deploy
const IS_STAGING = false;

const prodLink = IS_STAGING
    ? "null"
    : "https://sempre-alerta-backend-72437300b00c.herokuapp.com/api";

exports.IS_STAGING = IS_STAGING;
exports.IS_DEV = process.env.NODE_ENV === "development";
exports.IS_PROD = process.env.NODE_ENV === "production";
exports.API_URL = IS_PROD ? prodLink : "http://localhost:5001/api";

// source images are not loadin with official website. => SOLVED THE ISSUE by adding _headers and netlify.toml alongside the index.hmtl
exports.HOST_URL =
    process.env.NODE_ENV === "production"
        ? "https://semprealertasos.com"
        : "http://localhost:3000";

exports.HOST_INTERNAL_URL = "https://semprealerta.netlify.app";
