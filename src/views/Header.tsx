import React, { FC } from "react";
import { makeStyles, createStyles, IconButton, Select, Theme } from "@material-ui/core";

import ExploreIcon from "@material-ui/icons/Explore";
import GroupIcon from "@material-ui/icons/Group";
import RoomIcon from "@material-ui/icons/Room";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";

import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import AppsIcon from "@material-ui/icons/Apps";

import { useRecoilState, useRecoilValue } from "../utils/Recoil";
import atomMainView from "../atoms/atomMainView";
import { Sector } from "../interfaces/Sector";
import sectorAtom from "../atoms/atomSector";
import sectorAtoms from "../atoms/sectorAtoms";
import Title from "../components/Title";

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
                }
            },
        },
        mainViews: {
            flex: "1 1 auto",
            display: "flex",
            marginTop: "-0.5rem",
            alignItems: "center",
            justifyContent: "flex-end",
            "& > button": {
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

    const [mainView, setMainView] = useRecoilState<string>(atomMainView);
    const [sector, setSector] = useRecoilState<Sector>(sectorAtom);

    const sectors = useRecoilValue(sectorAtoms);

    return (
        <header className={classes.mainHeader}>
            <div className="titleContainer">
                <Title size="sm" />
            </div>

            <div className={classes.mainViews}>
                <IconButton className={mainView === "main" ? "active" : ""} onClick={() => setMainView("main")}>
                    <AppsIcon />
                </IconButton>

                <IconButton className={mainView === "map" ? "active" : ""} onClick={() => setMainView("map")}>
                    <ExploreIcon />
                </IconButton>
                <IconButton className={mainView === "npc" ? "active" : ""} onClick={() => setMainView("npc")}>
                    <GroupIcon />
                </IconButton>
                <IconButton className={mainView === "enc" ? "active" : ""} onClick={() => setMainView("enc")}>
                    <NaturePeopleIcon />
                </IconButton>
            </div>
        </header>
    );
};

export default Header;
