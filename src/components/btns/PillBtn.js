import { Fab } from "@mui/material";

export default function PillBtn({
    title = "title",
    onClick = () => null,
    size = "small",
}) {
    return (
        <Fab
            size={size}
            aria-label="pill btn"
            variant="extended"
            className="inline-block"
            onClick={onClick}
            style={{
                backgroundColor: "var(--themeSLight)",
                color: "white",
            }}
        >
            <span className={`text-shadow text-sm`}>{title}</span>
        </Fab>
    );
}
