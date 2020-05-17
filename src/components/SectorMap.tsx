import React, { FC } from 'react';
import { Sector, StarSystem, PrimaryPlanet, Planet } from '../interfaces/Sector';

import systemAtom from '../atoms/atomSystem';

import './sector-map.scss';
import { useRecoilState } from '../utils/Recoil';

const Recoil = require('recoil');

interface SectorMapProps {
    sector: Sector
}

interface StarOnSectorMapProps {
    system: StarSystem;
}

const SectorMap: FC<SectorMapProps> = (props: SectorMapProps) => {

    return (
        <div className="sector-map">

            {[...Array(props.sector.columns)].map((c, ci) => (
                <div className="column" key={`col-${ci}`}>

                    {[...Array(props.sector.rows)].map((r, ri) => {

                        const system = props.sector.stars.find((star: StarSystem) => { return star.position[0] === ci && star.position[1] === ri; })

                        return (
                            <div className="row" key={`row-${ri}`}>
                                
                                <span className="coordinates">{ci}, {ri}</span>
                                {system && <StarOnSectorMap system={system} />}
                            </div>
                        );
                    })}

                </div>
            ))}

        </div>
    )
};


const StarOnSectorMap: FC<StarOnSectorMapProps> = (props: StarOnSectorMapProps) => {


    const [selectedSystem, setSelectedSystem] = useRecoilState<StarSystem>(systemAtom);


    const selected = selectedSystem !== null && selectedSystem.id === props.system.id ? "selected" : "";

    function selectMe() {
        if (selected === "selected") {
            setSelectedSystem(null);
        } else {
            setSelectedSystem(props.system);
        }

    }

    return (
        <div className={`star-on-map ${selected}`} onClick={selectMe}>
            
            {props.system.star.map((star, index) => (
                <div key={index} className={`star ${star.size} ${star.color}`} />
            ))}
            <span className="star-name">{props.system.name}</span>
            <div className="planet-pips">
                {props.system.planets.map((p: Planet) => (
                    <div key={p.id} />
                ))}
            </div>
        </div>
    )
}

export default SectorMap;