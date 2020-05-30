import React, { FC } from "react";
import { makeStyles, createStyles, IconButton, Theme } from "@material-ui/core";

import ExploreIcon from "@material-ui/icons/Explore";
import GroupIcon from "@material-ui/icons/Group";
// import RoomIcon from "@material-ui/icons/Room";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";

import AppsIcon from "@material-ui/icons/Apps";

import Title from "../components/Title";
import { useAtom } from "jokits-react";
import { useChangeSelectedSector } from "../hooks/useSelectedSector";

import backupSvg from './backup.svg';
import orbitSvg from './orbit.svg';
import spaceshipSvg from './spaceship.svg';
import puppetSvg from './puppet.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainHeader: {
            position: "fixed",
            height: "5rem",
            width: "800px",
            top: 0,
            left: "calc(50% - 400px)",
            zIndex: 100,
            // background: "linear-gradient(rgba(212,192,255,0.7) 0, rgba(192,164,255,0.8) 50%, rgba(192,180,212,0.5) 100%)",
            backgroundColor: "rgba(16,0,32,0.75)",
            display: "flex",
            flexDirection: "row",
            padding: "0 3.5rem",
            justfiyContent: "center",
            alignItems: "center",
            border: "solid 2px rgba(192,192,255,0.5)",
            borderBottomLeftRadius: "5rem 5rem",
            borderBottomRightRadius: "5rem 5rem",
            borderTop: "none",
            borderBottom: "solid 5px rgba(255,255,255,0.3)",
            boxShadow: "0 0 1rem 0.5rem rgba(255,255,255,0.3), 0 0 2rem 1rem rgba(255,0,255,0.2)",

            "& > div": {
                position: "relative",

                "& > label": {
                    fontSize: "1rem",
                    position: "absolute",
                    bottom: "-0.1rem",
                    right: "1rem",
                    textAlign: "right",
                    fontFamily: "Teko, Arial",
                    fontWeight: 500,
                    color: "white",
                    textTransform: "uppercase",
                },
                "&.titleContainer": {
                    marginTop: "-0.5rem",
                },
            },
        },
        mainViews: {
            flex: "1 1 auto",
            display: "flex",
            marginTop: "-0.5rem",
            alignItems: "center",
            justifyContent: "flex-end",
            "& > button": {
                "& .customIcon": {
                    width: "3rem",
                },
                "& svg": {
                    fontSize: "2rem",
                    color: "rgba(255,255,255,0.9)",
                },
                "&:hover svg": {
                    color: "rgba(255,128,255, 0.8)",
                },
                "&.active": {
                    "& svg": {
                        color: "rgba(255,212,255,0.9)",
                        fontSize: "2.5rem",
                    },
                    "& .customIcon": {
                        width: "4rem",
                    }
                },
               
            },
        },
        mainControls: {
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            marginTop: "-0.5rem",
            justifyContent: "flex-end",
            "& > button": {
                "& svg": {
                    fontSize: "2rem",
                    color: "rgba(255,255,255,0.9)",
                },
                "&:hover svg": {
                    color: "rgba(255,0,255, 0.8)",
                },
            },
        },
    })
);

const Header: FC = () => {
    const classes = useStyles();

    const [viewMode, setViewMode] = useAtom("ViewMode", "main");
    const setSelectedSector = useChangeSelectedSector();

    function backToMainView() {
        // This will automatically return back to main view
        setSelectedSector(undefined);
    }

    return (
        <header className={classes.mainHeader}>
            <div className="titleContainer">
                <Title size="sm" />
            </div>

            <div className={classes.mainViews}>
                <IconButton className={viewMode === "main" ? "active" : ""} onClick={backToMainView}>
                    <AppsIcon />
                </IconButton>
                <IconButton className={viewMode === "map" ? "active" : ""} onClick={() => setViewMode("map")}>
                    <img src={orbitSvg} className="customIcon" alt="starships" />
                </IconButton>
                <IconButton
                    className={viewMode === "character" ? "active" : ""}
                    onClick={() => setViewMode("character")}
                >
                    <img src={backupSvg} className="customIcon" alt="characters" />
                </IconButton>
                <IconButton
                    className={viewMode === "ship" ? "active" : ""}
                    onClick={() => setViewMode("ship")}
                >
                    <img src={spaceshipSvg} className="customIcon" alt="starships" />
                </IconButton>
                <IconButton
                    className={viewMode === "charwiz" ? "active" : ""}
                    onClick={() => setViewMode("charwiz")}
                >
                    <img src={puppetSvg} className="customIcon" alt="starships" />
                </IconButton>
                {/* <IconButton
                    className={viewMode === "encounter" ? "active" : ""}
                    onClick={() => setViewMode("encounter")}
                >
                    <NaturePeopleIcon />
                </IconButton> */}
            </div>
        </header>
    );
};

export default Header;
