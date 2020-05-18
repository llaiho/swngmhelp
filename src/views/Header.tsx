import React, { FC } from "react";
import { makeStyles, createStyles, IconButton } from "@material-ui/core";

import ExploreIcon from "@material-ui/icons/Explore";
import GroupIcon from "@material-ui/icons/Group";
import RoomIcon from "@material-ui/icons/Room";

import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

import { useRecoilState } from "../utils/Recoil";
import atomMainView from "../atoms/atomMainView";
import { Sector } from "../interfaces/Sector";
import sectorAtom from "../atoms/atomSector";

const useStyles = makeStyles(
    createStyles({
        mainHeader: {
            position: "fixed",
            height: "3rem",
            width: "100%",
            top: 0,
            left: 0,
            zIndex: 100,
            background: "linear-gradient(rgba(212,192,255,0.7) 0, rgba(192,164,255,0.8) 50%, rgba(192,180,212,0.5) 100%)",
            display: "flex",
            flexDirection: "row",
            borderBottomLeftRadius: "50% 50%",
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
                    
                    
                    
                    
                }
            }
        },
        title: {
            flex: "0 0 auto",
            width: "20rem",
            padding: "0 1rem 0 0",
            margin: 0,
            fontFamily: "Teko, Arial",

            "& > h1": {
                fontSize: "1.8rem",
                fontWeight: 500,
                textAlign: "right",
                marginBottom: "-0.75rem",
                marginTop: "0.25rem",
                color: "white",
            },
            "& > h2": {
                fontSize: "1rem",
                fontWeight: 500,
                textAlign: "right",
                color: "rgba(255,255,255,0.8)",
                marginTop: "-0.5rem",
                padding: 0,
                textTransform: "uppercase",
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
                    color: "rgba(64,0,128, 0.8)",
                },
                "&.active": {
                    "& svg": {
                        color: "rgba(232,212,255,0.9)",
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
                    color: "rgba(64,0,128, 0.8)",
                },
            },
        }
    })
);

const Header: FC = () => {
    const classes = useStyles();

    const [mainView, setMainView] = useRecoilState<string>(atomMainView);
    const [sector, setSector] = useRecoilState<Sector>(sectorAtom);

    function saveToLocalStorage() {
        window.localStorage.setItem("SWN_Sector", JSON.stringify(sector));
    }

    function loadFromLocalStorage() {
        const strSec = window.localStorage.getItem("SWN_Sector");
        if (strSec) {
            const parsedSector: Sector = JSON.parse(strSec);
            setSector(parsedSector);
        } else {
            console.warn("No stored sector in localstorage");
        }
    }

    function clearLocalStorage() {
        window.localStorage.removeItem("SWN_Sector");
    }

    return (
        <header className={classes.mainHeader}>
            <div className={classes.mainControls}>
                <label>Store</label>
                <IconButton onClick={saveToLocalStorage}>
                    <SaveAltIcon />
                </IconButton>
                <IconButton onClick={loadFromLocalStorage}>
                    <FolderOpenIcon />
                </IconButton>

                <IconButton onClick={clearLocalStorage}>
                    <DeleteForeverIcon />
                </IconButton>
            </div>

            <div className={classes.mainViews}>
            <label>Views</label>
                <IconButton className={mainView === "map" ? "active" : ""} onClick={() => setMainView("map")}>
                    <ExploreIcon />
                </IconButton>
                <IconButton className={mainView === "npc" ? "active" : ""} onClick={() => setMainView("npc")}>
                    <GroupIcon />
                </IconButton>
                <IconButton className={mainView === "poi" ? "active" : ""} onClick={() => setMainView("poi")}>
                    <RoomIcon />
                </IconButton>
            </div>
            <div className={classes.title}>
                <h1>Stars without Number</h1>
                <h2>Gm help tool</h2>
            </div>
        </header>
    );
};

export default Header;
