import { Skeleton as MuSkeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { IS_DEV } from "../../config/root";

const useStyles = makeStyles((theme) => ({
    avatarSkeletonContainer: {
        height: 0,
        overflow: "hidden",
        paddingTop: (props) => props.paddingTop || "40%",
        position: "relative",
        margin: (props) => props.margin || "15px auto",
    },
    avatarLoader: {
        position: "absolute",
        borderRadius: "4px 4px 4px 4px",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "grey",
        animation: IS_DEV
            ? false
            : "MuiSkeleton-keyframes-animate 1.5s ease-in-out infinite",
    },
    leftText: {
        marginLeft: 150,
        backgroundColor: "grey",
    },
}));

const getStyles = () => ({
    root: {
        textAlign: "center",
        height: "100%",
        width: "100%",
    },
});

// LESSON: do not use container-center-col or container-center as a wrapper for Skeleton. Otherwise it will not show up.
export default function Skeleton({
    variant = "rect",
    width,
    height = "100%",
    needLeftText = false,
    paddingTop = "40%", // LESSON: paddingTop regulates the height of the skeleton. the more percentage, the heigher it gets.
    margin,
}) {
    const classes = useStyles({ paddingTop, margin });

    return (
        <div className={classes.avatarSkeletonContainer}>
            <MuSkeleton
                variant={variant}
                width={width}
                height={height}
                className={classes.avatarLoader}
            />
            {needLeftText && (
                <MuSkeleton
                    variant="text"
                    width={200}
                    height={40}
                    className={classes.leftText}
                />
            )}
        </div>
    );
}
