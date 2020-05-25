import React, { FC, useState } from "react";
import {
    Sector,
    StarSystem,
    PrimaryPlanet,
    OldSector,
    Hex,
    StarSize,
    Population,
    Planet,
    FullSector,
    HexStore,
} from "../interfaces/Sector";

import systemAtom from "../atoms/atomSystem";

import { useRecoilState, useRecoilValue } from "../utils/Recoil";

import { hexToPixelPointyTop } from "../utils/hexUtils";

import useWindowSize from "../utils/useWindowSize";
import SectorMapControls from "../components/SectorMapControls";
import sectorZoomLevel from "../atoms/atomZoomLevel";
import atomMapPosition from "../atoms/atomMapPosition";
import SectorName from "../components/SectorName";

import hexaImg from "./plain-circle.svg";
import selectedHexImg from "./selectedHex.svg";

import SaveIcon from "@material-ui/icons/Save";

import "./sector-map.scss";
import FullSectorSelector from "../selectors/FullSector";
import { Fab, makeStyles, createStyles, Theme, CircularProgress } from "@material-ui/core";
import FabSave from "../components/FabSave";
import { insertOrUpdateHex } from "../firebase/apiHex";
import { insertOrUpdateStarSystems } from "../firebase/apiStarSystem";
import { insertOrUpdateSector } from "../firebase/apiSector";
import { convertStarSystem } from "../utils/saveUtils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        saveContainer: {
            position: "absolute",
            left: "1rem",
            top: "27rem",
            width: "6rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    })
);

interface StarOnSectorMapProps {
    system: StarSystem;
    zoom: number;
}

const SectorView: FC = () => {
    const sector = useRecoilValue<FullSector>(FullSectorSelector);

    const [saving, setSaving] = useState<boolean>(false);
    const classes = useStyles();

    const zoomLevels: number[] = [10, 25, 50, 75, 100, 150, 200];

    const wSize = useWindowSize();

    const zoomLevel = useRecoilValue<number>(sectorZoomLevel);
    const mapPosition = useRecoilValue<[number, number]>(atomMapPosition);

    const hexSize = zoomLevels[zoomLevel];
    const dx = wSize.width !== undefined ? wSize.width / 2 - hexSize + mapPosition[0] : 800;
    const dy = wSize.height !== undefined ? wSize.height / 2 - hexSize + 48 + mapPosition[1] : 600;

    function saveSector() {
        setSaving(true);

        async function saving() {
            const stored: string[] = [];
            try {
                // Save Hexes in a single json

                const hexStore: HexStore = {
                    id: sector.hexFBId || "",
                    sectorId: sector.id,
                    hexes: sector.hexes.map((h: Hex) => {
                        return h;
                    }),
                };
                if(sector.hexFBId) {
                    hexStore.firebaseId = sector.hexFBId;
                }
                const hexIds = await insertOrUpdateHex(hexStore);

                // Save StarSystems
                for (let s = 0; s < sector.stars.length - 1; s++) {
                    const star: StarSystem = sector.stars[s];
                    console.log("STAR", star);
                    stored.push(`STAR: ${star.id} SAVING`);
                    await insertOrUpdateStarSystems(convertStarSystem(star));
                    stored.push(`STAR: ${star.id} DONE`);
                }

                const simpleSector: Sector = {
                    ...sector,
                    hexFBId: hexIds[0],
                    hexes: sector.hexes.map((h: Hex) => h.id),
                    stars: sector.stars.map((s: StarSystem) => s.id),
                    npcs: [],
                };
                stored.push(`SECTOR: ${sector.id} SAVING`);
                await insertOrUpdateSector(simpleSector);
                stored.push(`SECTOR: ${sector.id} DONE`);

                setSaving(false);
            } catch (e) {
                console.log("ERROR", e);
                console.error(`Could no save the sector. sniff`, e);
                console.table(stored);
                setSaving(false);
            }
        }

        saving();
    }

    if (sector === null) {
        return null;
    }

    return (
        <>
            <SectorMapControls />
            <div className="map-container">
                {sector.hexes.map((hex: Hex) => {
                    const system = sector.stars.find((s: StarSystem) => s.inHex === hex.id);
                    return (
                        <Hexagon
                            hex={hex}
                            dx={dx}
                            dy={dy}
                            system={system ? system : undefined}
                            zoomLevel={zoomLevel}
                            key={hex.id}
                        />
                    );
                })}
            </div>
            <SectorName />
            <div className={classes.saveContainer}>
                <FabSave onClick={saveSector} deactivated={false} saving={saving} />
            </div>
        </>
    );
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
        <div
            className={classes}
            style={{ top: props.dy + coords[1], left: props.dx + coords[0], height: contHeight, width: contWidth }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={selectMe}
        >
            <img src={hxImg} />

            {props.system && <StarOnSectorMap system={props.system} zoom={props.zoomLevel} />}
        </div>
    );
};

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
                    left: containerWidth / 2 - size / 2,
                    top: containerHeight / 2 - size / 2,
                };

                return <div key={index} className="star" style={starStyle} />;
            })}
            <span className="star-name">{props.system.name}</span>
            <div className="planet-pips">
                {props.system.planets.map((p: Planet) => {
                    const planetClasses: string[] = [];

                    if (p.planetGenre !== "general") {
                        const pg: PrimaryPlanet = p as PrimaryPlanet;
                        planetClasses.push(pg.population.toLowerCase().replace(/ /g, "-"));
                        planetClasses.push(pg.techLevel.toLowerCase().replace(/ /g, "-"));
                    }

                    return <div key={p.id} className={planetClasses.join(" ")} />;
                })}
            </div>
        </div>
    );
};

export default SectorView;
