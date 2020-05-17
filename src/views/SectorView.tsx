import React, { FC } from "react";
import SectorMap from "../components/SectorMap";
import { Sector } from "../interfaces/Sector";

interface SectorViewProps {
    sector: Sector;
}

const SectorView: FC<SectorViewProps> = (props) => {

    return <SectorMap sector={props.sector} />
}


export default SectorView;