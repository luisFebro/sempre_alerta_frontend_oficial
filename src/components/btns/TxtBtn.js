import Button from "@mui/material/Button";

export default function TxtBtn({
    title = "",
    color = "blue",
    background,
    onClick = () => null,
}) {
    return (
        <Button variant="text" style={{ color, background }} onClick={onClick}>
            {title}
        </Button>
    );
}
