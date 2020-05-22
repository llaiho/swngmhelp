import { selector } from "../utils/Recoil";
import sectorAtom from "../atoms/atomSector";
import hexAtoms from "../atoms/hexAtoms";
import starSystemAtoms from "../atoms/starSystemAtoms";
import npcAtoms from "../atoms/npcAtoms";
import { Sector, FullSector, Hex, Uuid, StarSystem } from "../interfaces/Sector";
import { Character } from "../interfaces/Npc";


const FullSectorSelector = selector({
    key: "FullSector",
    get: ({get}) => {
        const sector = get(sectorAtom);
        const hexes = get(hexAtoms);
        const systems = get(starSystemAtoms);
        const npcs = get(npcAtoms);

        console.log("HEXES", hexes);
        console.log("SYSTEMS", systems);
        if(sector === null) {
            return null;
        }

        const fullSector: FullSector = {
            id: sector.id,
            name: sector.name,
            density: sector.density,
            rings: sector.rings,
            hexes: sector.hexes.map((id: Uuid):Hex => {
                const hex: Hex = hexes.find((h: Hex) => h.id === id);
                console.log(id, hex, hexes[0]);
                return hex;
            }),
            stars: sector.stars.map((id: Uuid): StarSystem => {
                return systems.find((s: StarSystem) => s.id === id);
            }),
            npcs: sector.npcs.map((id: Uuid): Character => {
                return npcs.find((n: Character) => n.id === id )
            })
        };

        return fullSector;
    }
});

export default FullSectorSelector;