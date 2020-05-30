import React, { FC } from "react";
import { useJokiStateValue, useAtomValue } from "jokits-react";

import SystemView from "./SystemView";
import CharacterListView from "./CharacterListView";
import CharacterView from "./CharacterView";
import EncountersView from "./EncountersView";
import EncounterView from "./EncounterView";
import MainPage from "./MainPage";
import Header from "./Header";
import SectorView from "./SectorView";
import LoadingView from "./LoadingView";
import { useSelectedCharacterValue } from "../hooks/useSelectedCharacter";
import { useSelectedStarSystemValue } from "../hooks/useSelectedSystem";
import { useSelectedSectorValue } from "../hooks/useSelectedSector";
import ShipListView from "./ShipListView";
import CharacterWizardView from "./CharacterWizardView";

// import { useFirebase } from "../firebase/init";

const RootView: FC = () => {
    const state = useJokiStateValue();

    // const viewMode: string|undefined = useAtomValue("ViewMode", "MAIN");

    const viewMode: string = useGetCurrentView();

    // Loading screen
    if (!state || state === "init") {
        return <LoadingView />;
    }

    let ContentView = MainPage;

    console.log("RootView: ViewMode: ", viewMode);

    switch (viewMode) {
        case "SYSTEM":
            ContentView = SystemView;
            break;
        case "CHARACTERS":
            ContentView = CharacterListView;
            break;
        case "CHARACTER":
            ContentView = CharacterView;
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
        case "SHIPLIST":
            ContentView = ShipListView;
            break;
        case "CHARACTERWIZARD":
            ContentView = CharacterWizardView;
            break;
        case "MAIN":
        default:
            return <MainPage />;
    }

    return (
        <>
            <Header></Header>
            <ContentView />
        </>
    );
};

export function useGetCurrentView(): string {
    const viewMode = useAtomValue<string>("ViewMode", "main");

    const selectedChar = useSelectedCharacterValue();
    const selectedSystem = useSelectedStarSystemValue();
    const selectedSector = useSelectedSectorValue();

    console.log("useGetCurrentView:", viewMode, "\nsystem:", selectedSystem, "\nsector:", selectedSector);

    switch (viewMode) {
        case "map":
            if (selectedSystem) return "SYSTEM";
            if (!selectedSector) return "MAIN";
            return "SECTOR";
        case "character":
            if (selectedChar) return "CHARACTER";
            return "CHARACTERS";
        case "main":
            if(selectedSector) return "SECTOR";
            return "MAIN";
        case "ship":
            return "SHIPLIST";
        case "charwiz":
            return "CHARACTERWIZARD";
        default:
            return "MAIN";
    }
}

export default RootView;
