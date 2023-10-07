import Fab from "@mui/material/Fab";
import { Delete, Edit, Add } from "@mui/icons-material";
// COMMON FLOATING ACTION BUTTONS

export default function FabBtn({
    type = "edit",
    size = "sm",
    onClick = () => null,
}) {
    let sizeHandled;
    if (size === "sm") sizeHandled = "small";
    if (size === "md") sizeHandled = "medium";
    if (size === "lg") sizeHandled = "large";

    const defaultData = {
        size: sizeHandled,
        onClick,
        "aria-label": type,
        style: {
            color: "white",
            background: "var(--themeSLight)",
        },
    };

    if (type === "edit") {
        return (
            <Fab {...defaultData}>
                <Edit />
            </Fab>
        );
    }

    if (type === "remove") {
        return (
            <Fab {...defaultData}>
                <Delete />
            </Fab>
        );
    }

    if (type === "add") {
        return (
            <Fab {...defaultData}>
                <Add />
            </Fab>
        );
    }

    return <div />;
}
