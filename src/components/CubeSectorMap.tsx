import React, { FC, useState } from 'react';
import { Sector, StarSystem, PrimaryPlanet, OldSector, Hex, StarSize, Population, Planet, FullSector } from '../interfaces/Sector';

import systemAtom from '../atoms/atomSystem';

import { useRecoilState, useRecoilValue } from '../utils/Recoil';
import { Container, Button, IconButton } from '@material-ui/core';
import sectorAtom from '../atoms/atomSector';
import { hexToCube, hexToPixelFlatTop, hexToPixelPointyTop } from '../utils/hexUtils';

import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import useWindowSize from '../utils/useWindowSize';
import SectorMapControls from './SectorMapControls';
import sectorZoomLevel from '../atoms/atomZoomLevel';
import atomMapPosition from '../atoms/atomMapPosition';
import SectorName from './SectorName';


import hexaImg from './plain-circle.svg';
import selectedHexImg from './selectedHex.svg';

import './sector-map.scss';
import FullSectorSelector from '../selectors/FullSector';



interface StarOnSectorMapProps {
    system: StarSystem;
    zoom: number;
}

const CubeSectorMap: FC = () => {

    const sector = useRecoilValue<FullSector>(FullSectorSelector);

    const zoomLevels: number[] = [10, 25, 50, 75, 100, 150, 200];

    const wSize = useWindowSize();

    const zoomLevel = useRecoilValue<number>(sectorZoomLevel);
    const mapPosition = useRecoilValue<[number, number]>(atomMapPosition);

    const hexSize = zoomLevels[zoomLevel];
    const dx = wSize.width !== undefined ? (wSize.width / 2) - hexSize + mapPosition[0] : 800;
    const dy = wSize.height !== undefined ? wSize.height / 2 - hexSize + 48 + mapPosition[1] : 600;

    if(sector === null) {
        return null;
    }

    console.log("Full Sector", sector);
    return (
        <>
            <SectorMapControls />
            <div className="map-container">
                {sector.hexes.map((hex: Hex) => {
                    const system = sector.stars.find((s: StarSystem) => s.inHex === hex.id);
                    return <Hexagon hex={hex} dx={dx} dy={dy} system={system ? system : undefined} zoomLevel={zoomLevel} key={hex.id} />
                })}
            </div>
            <SectorName />
        </>

    )
};

interface HexagonProps {
    hex: Hex;
    dx: number;
    dy: number;
    zoomLevel: number;
    system?: StarSystem;
}

const Hexagon: FC<HexagonProps> = (props) => {

    const [hover, setHover] = useState(false);
    const [selectedSystem, setSelectedSystem] = useRecoilState<StarSystem>(systemAtom);

    const zoomLevels: number[] = [10, 25, 50, 75, 100, 150, 200];
    const hexSize = zoomLevels[props.zoomLevel];
    const coords = hexToPixelPointyTop(props.hex, hexSize);

    const contWidth = Math.sqrt(3) * hexSize;
    const contHeight = 2 * hexSize;

    const selected = selectedSystem !== null && props.system && selectedSystem.id === props.system.id ? "selected" : "";

    const classes = ["hexagon", `zoom-${props.zoomLevel}`].join(" ");

    const hxImg = hover ? selectedHexImg : hexaImg;

    function selectMe() {

        if (selected === "selected" || props.system === undefined) {
            setSelectedSystem(null);
        } else {
            setSelectedSystem(props.system);
        }
    }

    return (
        <div className={classes} style={{ top: props.dy + coords[1], left: props.dx + coords[0], height: contHeight, width: contWidth }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={selectMe}>
            <img src={hxImg} />

            {props.system && <StarOnSectorMap system={props.system} zoom={props.zoomLevel} />}
        </div>
    )
}


const StarOnSectorMap: FC<StarOnSectorMapProps> = (props: StarOnSectorMapProps) => {

    const zoomLevels: number[] = [10, 25, 50, 75, 100, 150, 200];

    const containerWidth = Math.sqrt(3) * zoomLevels[props.zoom];
    const containerHeight = 2 * zoomLevels[props.zoom];



    return (
        <div className={`star-on-map`}>

            {props.system.star.map((star, index) => {

                let size = zoomLevels[props.zoom] * 0.6;

                if (star.size === "dwarf") {
                    size = size * 0.5;
                }

                if (star.size === "small") {
                    size = size * 0.75;
                }

                if (star.size === "large") {
                    size = size * 1.2;
                }

                if (star.size === "giant") {
                    size = size * 1.5;
                }

                const starStyle = {
                    backgroundColor: star.color,
                    width: size,
                    height: size,
                    left: (containerWidth / 2) - (size / 2),
                    top: (containerHeight / 2) - (size / 2),
                }

                return (
                    <div key={index} className="star" style={starStyle} />
                );
            })}
            <span className="star-name">{props.system.name}</span>
            <div className="planet-pips">
                {props.system.planets.map((p: Planet) => {
                    const planetClasses: string[] = [];
                    
                    if(p.planetGenre !== "general") {
                        const pg: PrimaryPlanet =  p as PrimaryPlanet;
                        planetClasses.push(pg.population.toLowerCase().replace(/ /g, "-" ));
                        planetClasses.push(pg.techLevel.toLowerCase().replace(/ /g, "-" ));
                    }
                    
                    return (
                        <div key={p.id} className={planetClasses.join(" ")}/>
                    );
                })}
            </div>
        </div>
    )
}


export default CubeSectorMap;