import Button from "@mui/material/Button";

export default function TxtBtn({
    title = "example",
    color = "var(--themeSDark)",
    background,
    onClick = () => null,
}) {
    return (
        <Button
            variant="text"
            style={{ color, background, fontSize: 16 }}
            onClick={onClick}
        >
            {title}
        </Button>
    );
}
