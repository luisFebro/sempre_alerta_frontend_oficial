import { Fragment } from "react";
import Button from "@material-ui/core/Button";

export default function ButtonLink({
    title = "link",
    onClick,
    color = "var(--themeP)",
    backgroundColor,
    fontWeight = "600",
}) {
    return (
        <Fragment>
            <Button onClick={onClick}>{title}</Button>
            <style jsx global>
                {`
                    .MuiButtonBase-root {
                        color: ${color} !important;
                        font-weight: ${fontWeight} !important;
                    }
                `}
            </style>
        </Fragment>
    );
}
