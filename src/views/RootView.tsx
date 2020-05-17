import React, { FC, useContext, useEffect } from "react";
import SectorMap from "../components/SectorMap";
import { Sector, CubeSector } from "../interfaces/Sector";

import sectorAtom from '../atoms/atomSector';
import createSector from "../generators/createSector";
import { useRecoilState, useRecoilValue } from "../utils/Recoil";
import systemAtom from "../atoms/atomSystem";
import viewModeSelector from "../atoms/viewModeSelector";
import SystemView from "./SystemView";
import CubeSectorMap from "../components/CubeSectorMap";
import createCubeSector from "../generators/createCubeSector";
import { Button, Container } from "@material-ui/core";

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
            return <SystemView />
        default:
            return (

                <CubeSectorMap sector={sector} />

            )
        // return <SectorMap sector={sector} />
    }


}


export default RootView;