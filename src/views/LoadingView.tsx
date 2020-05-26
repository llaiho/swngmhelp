import React, { FC } from "react";
import { Container, CircularProgress, Icon, makeStyles, createStyles, Theme } from "@material-ui/core";

import Title from "../components/Title";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loader: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            "& > *": {
                margin: "1rem 0",
            },
            "& > h1": {
                fontFamily: "Teko",
                fontWeight: 500,
                fontSize: "3rem",
                color: theme.palette.primary.dark,
                textShadow:
                    "1px 1px 2px rgba(255,255,255,0.8), -1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8), 1px -1px 2px rgba(255,255,255,0.8)",
            },
        },
        spinner: {
            position: "relative",
        },
        icon: {
            position: "absolute",
            top: "calc(50% - 6rem)",
            left: "calc(50% - 6rem)",
            width: "auto",
            height: "auto",
            transform: "rotate(35deg)",
            "& svg": {
                fontSize: "12rem",
                color: theme.palette.primary.dark,
            },
        },
    })
);

const LoadingView: FC = () => {

    const classes = useStyles();
    
    return (
        <Container classes={{ root: classes.loader }}>
            <Title size="lg" />
            <div className={classes.spinner}>
                <CircularProgress size={300} color="primary" />
                <Icon color="primary" classes={{ root: classes.icon }}>
                    <HourglassEmptyIcon />
                </Icon>
            </div>

            <h1>Loading database...</h1>
        </Container>
    );
};

export default LoadingView;
