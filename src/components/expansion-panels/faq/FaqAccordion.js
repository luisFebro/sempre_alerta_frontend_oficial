import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./_FaqAccordion.scss";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

/*
LazyLoadingContent:
The content of Accordions is mounted by default even if the accordion is not expanded. This default behavior has server-side rendering and SEO in mind. If you render expensive component trees inside your accordion details or simply render many accordions it might be a good idea to change this default behavior by enabling the unmountOnExit in TransitionProps:
<Accordion TransitionProps={{ unmountOnExit: true }} />
 */

export default function FaqAccordion({ dataArray, lazyLoading = false }) {
    const classes = useStyles();

    return (
        <div id="faq-accordion--root" className={classes.root}>
            {dataArray.map((panel, ind) => (
                <Accordion
                    key={ind}
                    TransitionProps={{ unmountOnExit: lazyLoading }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${ind + 1}a-content`}
                        id={`panel${ind + 1}a-header`}
                    >
                        <Typography
                            className={classes.heading}
                            style={{
                                fontWeight: `600 !important`,
                            }}
                        >
                            {panel.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{panel.text}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
