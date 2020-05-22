import { makeStyles, Theme, createStyles } from "@material-ui/core";



const useListViewStyles = makeStyles((theme: Theme) => createStyles({
    header: {
        padding: "4rem 0 3rem 0",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        "& > h2, & > h1": {
            color: theme.palette.primary.light,
            fontFamily: theme.typography.fontFamily,
            fontSize: "2rem",
        },
        "& > div.search": {
            marginLeft: "3rem",
        },
    },
    partHeader: {
        margin: "2rem 0 0.5rem 0.5rem",
        paddingLeft: "0.5rem",
        position: "relative",
        color: theme.palette.primary.dark,
        fontFamily: theme.typography.fontFamily,
        fontSize: "1.6rem",
        borderLeft: "solid 1rem rgba(255,255,255,0.5)",

        borderTopLeftRadius: "1rem 1rem",
        borderBottomLeftRadius: "1rem 1rem",
        textShadow: "-1px -1px 1px white, 1px -1px 1px white, 1px 1px 1px white, -1px 1px 1px white",
    },
    card: {
        padding: "0.5rem",
        marginBottom: "0.5rem",
        
    },
    errorMsg: {
        padding: "0.5rem",
        margin: "1rem 0",
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.error.contrastText,
    },
    container: {
        paddingTop: "2rem",
        position: "relative",
    },
    actionFabs: {
        position: "absolute",
        right: "0rem",
        top: "0rem",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // paddingTop: "2rem",
    },
    centerValue: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& > p": {
            fontWeight: "normal",
            textTransform: "uppercase",
            fontSize: "0.8rem",
                    }
    }
}));

export default useListViewStyles;