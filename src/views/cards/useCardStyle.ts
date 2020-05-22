import { makeStyles, createStyles, Theme } from "@material-ui/core";



const useCardStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        padding: "0.5rem",
        "& > h2": {
            fontSize: "1.2rem",
            textTransform: "uppercase",
            padding: "1rem 0 0.5rem 0",
            color: theme.palette.primary.main,
            textShadow: "0 0px 4px rgba(0,0,0,0.5)",
        },
        "& > h5": {
            fontSize: "0.9rem",
            textTransform: "uppercase",
            fontWeight: "bold",
            padding: "1rem 0 0.25rem 0",
            color: theme.palette.primary.light,
            textShadow: "0 0px 4px rgba(0,0,0,0.5)",
        }
    },
    centerItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        "& > h3": {
            paddingBottom: "0.5rem",
        }
    },
    positiveText: {
        color: theme.palette.success.light,
    },
    negativeText: {
        color: theme.palette.error.light,
    }
}));

export default  useCardStyles;