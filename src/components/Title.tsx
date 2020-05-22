import React, { FC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            width: "300px",
            textAlign: "center",
            "& > h1": {
                fontFamily: "Teko",
                fontWeight: 400,
                fontSize: "5rem",
                letterSpacing: "1rem",
                color: "white",
                textShadow: "0 0 1rem yellow, 0 0 1rem purple, 0 0 3px black",
            },
            "& > h2": {
                fontFamily: "Teko",
                fontWeight: 400,
                fontSize: "2rem",
                letterSpacing: "3px",
                color: "white",
                marginTop: "-2.1rem",
                marginLeft: "-8px",
                textShadow: "0 0 1rem yellow, 0 0 1rem purple, 0 0 3px black",
            },

            "&.sm": {
                width: "125px;",
                "& > h1": {
                    fontSize: "3rem",
                    letterSpacing: "0.3rem",
                },
                "& > h2": {
                    fontSize: "0.9rem",
                    letterSpacing: "2.3px",
                    marginTop: "-1.5rem",
                    marginLeft: "-3px",
                },
            },
            "&.lg": {
                width: "500px",
                
                "& > h1": {
                    fontSize: "10rem",
                    letterSpacing: "0.6rem",
                },
                "& > h2": {
                    fontSize: "3.2rem",
                    letterSpacing: "4px",
                    marginTop: "-5rem",
                    marginLeft: "-3px",
                },
            },
            
        },
    })
);

interface TitleProps {
    size?: "sm" | "md" | "lg";
}

const Title: FC<TitleProps> = (props: TitleProps) => {
    const classes = useStyles();

    const classNames = [classes.title, props.size || ""].join(" ");

    return (
        <div className={classNames}>
            <h1>STARS</h1>
            <h2>WITHOUT NUMBER</h2>
        </div>
    );
};

export default Title;
