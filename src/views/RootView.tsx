import React, { FC } from "react";


import { useRecoilValue } from "../utils/Recoil";
import viewModeSelector from "../atoms/viewModeSelector";
import SystemView from "./SystemView";



import NpcListView from "./NpcListView";
import NpcView from "./NpcView";
import EncountersView from "./EncountersView";
import EncounterView from "./EncounterView";
import { useFirebase } from "../firebase/init";
import { Container, CircularProgress, makeStyles, Theme, createStyles, Icon } from "@material-ui/core";
import MainPage from "./MainPage";
import Header from "./Header";
import SectorView from "./SectorView";
import Title from "../components/Title";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';


const useStyles = makeStyles((theme: Theme) => createStyles({
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
            textShadow: "1px 1px 2px rgba(255,255,255,0.8), -1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8), 1px -1px 2px rgba(255,255,255,0.8)"
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
            color: theme.palette.primary.dark
        }
    }
}));

const RootView: FC = () => {
    const viewMode = useRecoilValue(viewModeSelector);
    const classes = useStyles();

    const initializing = useFirebase();

    if (initializing) {
        return (
            <Container classes={{root: classes.loader}}>
                <Title size="lg" />
                <div className={classes.spinner}>
                    <CircularProgress size={300} color="primary" />
                    <Icon color="primary" classes={{root: classes.icon}}><HourglassEmptyIcon /></Icon>
                </div>
                
                <h1>Loading database...</h1>
            </Container>
        );
    }

    let ContentView = MainPage;

    console.log("VIEWMODE", viewMode);
    switch (viewMode) {
        case "SYSTEM":
            ContentView = SystemView;
            break;
        case "NPCLIST":
            ContentView = NpcListView;
            break;
        case "NPCVIEW":
            ContentView = NpcView;
            break;
        case "ENCOUNTERLIST":
            ContentView = EncountersView;
            break;
        case "ENCOUNTER":
            ContentView = EncounterView;
            break;
        case "SECTOR":
            ContentView = SectorView;
            break;
        case "MAIN":
        default:
            return <MainPage />
            
    }


    return (
        <>
        <Header></Header>
        <ContentView />
        </>
    )
};

export default RootView;
