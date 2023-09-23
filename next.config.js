/** @type {import('next').NextConfig} */


const IS_PROD = process.env.NODE_ENV === "production";
const APP_NAME = "Sempre Alerta";
const API = IS_PROD
    ? "https://vocariza.herokuapp.com/api"
    : "http://localhost:5002/api";
const DOMAIN = IS_PROD ? "???" : "https://localhost:3001";
const DOMAIN_SOCKET = "https://sempre-alerta-backend-test-eaa42b8e19ca.herokuapp.com/nspApp"

const DOMAIN_PROD = "???";

const nextConfig = {}

module.exports = nextConfig
