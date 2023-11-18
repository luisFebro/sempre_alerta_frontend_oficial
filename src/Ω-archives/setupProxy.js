// FROM SRC FOLDER NOW DEPRACATED FOR NOW
// reference: https://medium.com/bb-tutorials-and-thoughts/react-how-to-proxy-to-backend-server-5588a9e0347
import { createProxyMiddleware } from "http-proxy-middleware";
import { IS_DEV } from "./config/clientUrl";

// REVERSE PROXY
// This is not working any longer on PRODUCTION, only DEV...
export default function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: IS_DEV
                ? "http://localhost:5001"
                : "https://sempre-alerta-backend-72437300b00c.herokuapp.com",
            changeOrigin: true,
        })
    );
}
