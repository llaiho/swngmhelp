import React, { FC } from "react";
// import SectorMap from "../components/SectorMap";
import { OldSector } from "../interfaces/Sector";

interface SectorViewProps {
    sector: OldSector;
}

const SectorView: FC<SectorViewProps> = (props) => {

    // return <SectorMap sector={props.sector} />
    return null;
}


export default SectorView;