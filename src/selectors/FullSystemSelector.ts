import { selector } from "../utils/Recoil";
import sectorAtom from "../atoms/atomSector";
import hexAtoms from "../atoms/hexAtoms";
import starSystemAtoms from "../atoms/starSystemAtoms";
import npcAtoms from "../atoms/npcAtoms";
import { Sector, FullSector, Hex, Uuid, StarSystem, FullStarSystem, PointOfInterest } from "../interfaces/Sector";
import { Character } from "../interfaces/Npc";
import systemAtom from "../atoms/atomSystem";
import poiAtoms from "../atoms/poiAtoms";


const FullStarSystemSelector = selector({
    key: "FullStarSystem",
    get: ({get}) => {
        const hexes = get(hexAtoms);
        const system = get(systemAtom) as StarSystem;
        const pois = get(poiAtoms);
        
        if(system === null) {
            return null;
        }

        const fullSystem: FullStarSystem = {...system};

        return fullSystem;
    }
});

export default FullStarSystemSelector;