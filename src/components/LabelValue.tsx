import React, { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core";


const useStyles = makeStyles(createStyles({
    keyValue: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        "& > span.value": {
            textAlign: "right",
            flex: "1 1 auto",
            paddingLeft: "1rem",
            fontWeight: "bold"


        }
    }
}))

interface LabelValueProps {
    label: string;
    value: string|number|boolean;    
}

const LabelValue: FC<LabelValueProps> = (props: LabelValueProps) => {

    const classes = useStyles();

    return (
        <p className={classes.keyValue}>{props.label}: <span className="value">{props.value}</span></p>
    )

};

export default LabelValue;