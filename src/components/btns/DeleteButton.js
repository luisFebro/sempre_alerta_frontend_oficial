import { makeStyles } from "@mui/styles";
import Fab from "@mui/material/Fab";
import { Delete } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: 0, //theme.spacing(1),
    },
}));

const muStyle = {
    transform: "scale(0.9)",
    filter: "drop-shadow(.5px .5px 1.5px black)",
    color: "#fff",
};

export default function DeleteButton({
    position,
    top,
    right,
    left,
    bottom,
    onClick,
    transform = "scale(1.2)",
    size = "small",
}) {
    const classes = useStyles();

    return (
        <Fab
            onClick={onClick}
            size={size}
            style={{
                position: position || "relative",
                top,
                right,
                left,
                bottom,
                outline: "none",
                color: "var(--mainWhite)",
                backgroundColor: "var(--expenseRed)",
            }}
            aria-label="Botão deletar"
            className={classes.fab}
        >
            <Delete style={{ ...muStyle, transform }} />
        </Fab>
    );
}
