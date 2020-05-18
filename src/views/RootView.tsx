import React, { FC, useEffect } from "react";

import { Sector, FullSector } from "../interfaces/Sector";

import sectorAtom from '../atoms/atomSector';
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

const RootView: FC = () => {

    const viewMode = useRecoilValue(viewModeSelector);
    const fullSector  = useRecoilValue<FullSector>(FullSectorSelector);
    const setSector = useSetRecoilState(sectorAtom);
    const setHexes = useSetRecoilState(hexAtoms);
    const setStarSystems = useSetRecoilState(starSystemAtoms);

    useEffect(() => {
        if (fullSector === null) {
            const [newSector, hexes, starSystems] = createSector({
                density: "normal",
                rings: 6
            });
            setHexes(hexes);
            setStarSystems(starSystems);
            setSector(newSector);
        }

    }, [fullSector, setSector, setHexes, setStarSystems]);

    if (fullSector === null) {
        return null;
    }
    
    
    switch (viewMode) {
        case "SYSTEM":
            return <SystemView />;
        case "NPCLIST":
            return <NpcListView />;
        case "NPCVIEW":
            return <NpcView />;
        default:
            return (
                <CubeSectorMap />
            )
        // return <SectorMap sector={sector} />
    }


}


export default RootView;