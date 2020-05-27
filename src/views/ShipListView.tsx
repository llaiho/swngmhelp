import React, { FC } from "react";
import { makeStyles, Theme, createStyles, Container } from "@material-ui/core";

import "./data-view.scss";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            padding: "3rem 0",
            display: "flex",
            flexDirection: "row",
            "& > h2": {
                color: theme.palette.primary.light,
                fontFamily: theme.typography.fontFamily,
                fontSize: "2rem",
            },
            "& > div.search": {
                marginLeft: "3rem",
            },
        },
    })
);

const ShipListView: FC = () => {
    const classes = useStyles();

    return (
        <Container className="data-view">
            <header className={classes.header}>
                <h2>Ship list</h2>
            </header>
        </Container>
    );
};

export default ShipListView;
