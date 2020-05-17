import { makeStyles, createStyles } from "@material-ui/core";

const useKeyValueListStyle = makeStyles(createStyles({
    root: {
        "& > dd": {
            fontSize: "0.7rem",
            fontWeight: "bold",
            
        },
        "& > dt": {
            marginBottom: "0.25rem",
            marginLeft: "0.5rem",
        }
    }
}));

export default useKeyValueListStyle;