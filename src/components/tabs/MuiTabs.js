import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Tabs, Tab, Typography, Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    rootTab: {
        backgroundColor: "#ffffff",
    },
    rootPanel: {
        backgroundColor: "#f7f1e3",
        width: "100%",
        margin: "auto",
        overflow: "hidden",
    },
    fab: {
        position: "absolute",
    },
    selected: {
        fontFamily: "var(--mainFont)",
        fontWeight: "bold",
        color: "#ffffff", //  !important
        fontSize: "0.95rem !important",
    },
}));

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        "aria-controls": `action-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, boxPadding, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            <Box p={boxPadding || 3}>{children}</Box>
        </Typography>
    );
}

export default function MuiTabs({ data, fullWidth }) {
    const classes = useStyles();
    // const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {data && (
                <>
                    <div className={classes.rootTab}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="icon label tabs example"
                            indicatorColor="primary"
                            textColor="primary"
                            variant={fullWidth ? "fullWidth" : "scrollable"}
                        >
                            {data.map((tab, ind) => (
                                <Tab
                                    key={ind}
                                    label={tab.label}
                                    icon={tab.icon}
                                    {...a11yProps(ind)}
                                    classes={{
                                        selected: classes.selected,
                                    }}
                                />
                            ))}
                        </Tabs>
                    </div>
                    {data.map((tab, ind) => (
                        <div key={ind} className={classes.rootPanel}>
                            <TabPanel
                                style={{
                                    overflow: "hidden",
                                    minHeight: "500px",
                                }}
                                value={value}
                                index={ind}
                                boxPadding={tab.boxPadding}
                            >
                                {ind === value && tab.component}
                            </TabPanel>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
