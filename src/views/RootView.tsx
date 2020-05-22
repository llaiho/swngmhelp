import React, { FC, useEffect } from "react";

import { Sector, FullSector } from "../interfaces/Sector";

import sectorAtom from "../atoms/atomSector";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "../utils/Recoil";
import viewModeSelector from "../atoms/viewModeSelector";
import SystemView from "./SystemView";
import CubeSectorMap from "../components/CubeSectorMap";
import createSector from "../generators/createCubeSector";

import NpcListView from "./NpcListView";
import NpcView from "./NpcView";
import FullSectorSelector from "../selectors/FullSector";
import hexAtoms from "../atoms/hexAtoms";
import starSystemAtoms from "../atoms/starSystemAtoms";
import EncountersView from "./EncountersView";
import EncounterView from "./EncounterView";
import { useFirebase } from "../firebase/init";
import { Container, CircularProgress } from "@material-ui/core";
import MainPage from "./MainPage";
import Header from "./Header";


const RootView: FC = () => {
    const viewMode = useRecoilValue(viewModeSelector);
    // const fullSector = useRecoilValue<FullSector>(FullSectorSelector);
    // const setSector = useSetRecoilState(sectorAtom);
    // const setHexes = useSetRecoilState(hexAtoms);
    // const setStarSystems = useSetRecoilState(starSystemAtoms);

    const initializing = useFirebase();

    // useEffect(() => {
    //     if (fullSector === null) {
    //         const [newSector, hexes, starSystems] = createSector({
    //             density: "normal",
    //             rings: 6,
    //         });
    //         setHexes(hexes);
    //         setStarSystems(starSystems);
    //         setSector(newSector);
    //     }
    // }, [fullSector, setSector, setHexes, setStarSystems]);

    // if (fullSector === null) {
    //     return null;
    // }

    if (initializing) {
        return (
            <Container>
                <h1>Loading Firebase...</h1>
                <CircularProgress size={300} />
            </Container>
        );
    }

    let ContentView = MainPage;
    let showHeaders = true;

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
            ContentView = CubeSectorMap;
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
