import React, { FC, useContext, useEffect } from "react";

import { CubeSector } from "../interfaces/Sector";

import sectorAtom from '../atoms/atomSector';
import createSector from "../generators/createSector";
import { useRecoilState, useRecoilValue } from "../utils/Recoil";
import systemAtom from "../atoms/atomSystem";
import viewModeSelector from "../atoms/viewModeSelector";
import SystemView from "./SystemView";
import CubeSectorMap from "../components/CubeSectorMap";
import createCubeSector from "../generators/createCubeSector";
import { Button, Container } from "@material-ui/core";
import NpcListView from "./NpcListView";
import NpcView from "./NpcView";

const RootView: FC = () => {

    const viewMode = useRecoilValue(viewModeSelector);
    const [sector, setSector] = useRecoilState<CubeSector>(sectorAtom);

    useEffect(() => {

        if (sector === null) {
            setSector(createCubeSector({
                density: "normal",
                rings: 6
            }));
        }

    }, [sector]);

    if (sector === null) {
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
                <CubeSectorMap sector={sector} />
            )
        // return <SectorMap sector={sector} />
    }


}


export default RootView;