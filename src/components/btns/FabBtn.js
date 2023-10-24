import Fab from "@mui/material/Fab";
// import { Delete, Edit, AddCircleOutline } from "@mui/icons-material";
// COMMON FLOATING ACTION BUTTONS

export default function FabBtn({
    title,
    type,
    Icon,
    size = "lg",
    onClick = () => null,
    disabled = false,
}) {
    let sizeHandled;
    if (size === "sm") sizeHandled = "small";
    if (size === "md") sizeHandled = "medium";
    if (size === "lg") sizeHandled = "large";

    const gradientCss =
        "bg-gradient-to-tr from-light-yellow-500 to-light-yellow-700";

    const defaultData = {
        size: sizeHandled,
        onClick,
        "aria-label": title || type,
        style: {
            color: "white",
        },
    };

    if (title !== undefined) {
        return (
            <>
                <Fab
                    variant="extended"
                    className={`fab-btn inline-block ${gradientCss}`}
                    {...defaultData}
                    disabled={disabled}
                >
                    <span className={`text-shadow text-xl px-3`}>{title}</span>
                    {Icon}
                </Fab>
                <style jsx global>
                    {`
                        .fab-btn.MuiFab-root,
                        .fab-btn.MuiButtonBase-root {
                            padding: 0 16px;
                            border-radius: 50px;
                        }
                    `}
                </style>
            </>
        );
    }

    // if (type === "edit") {
    //     return (
    //         <Fab {...defaultData}>
    //             <Edit />
    //         </Fab>
    //     );
    // }

    // if (type === "remove") {
    //     return (
    //         <Fab {...defaultData}>
    //             <Delete />
    //         </Fab>
    //     );
    // }

    // if (type === "add") {
    //     return (
    //         <Fab {...defaultData}>
    //             <Add />
    //         </Fab>
    //     );
    // }

    return <div />;
}
