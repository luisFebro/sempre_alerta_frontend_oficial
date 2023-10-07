import { Button } from "@material-tailwind/react";

export default function MainBtn({
    title = "Some btn name",
    size = "md",
    color = "purple",
    onClick = () => null,
    Icon, // should be send like SendIcon, not <SendIcon />
    wrapperClass = null, // max-w-xs - set minimum width for the button
}) {
    const allowedSizes = ["sm", "md", "lg"];

    if (!allowedSizes.includes(size))
        throw new Error("Invalid button size. Allowed only: " + allowedSizes);

    return (
        <div className={wrapperClass}>
            <Button
                color={color}
                size={size}
                className="py-2.5 px-2.5"
                onClick={onClick}
                style={{ background: "var(--themeSLight)" }}
            >
                <span className="text-shadow text-sm">{title}</span>
                {Icon && (
                    <Icon
                        className="ml-3 drop-shadow-[0_35px_35px_rgba(0,0,0,1)]"
                        style={{ fontSize: 30 }}
                    />
                )}
            </Button>
        </div>
    );
}
