import { selector } from "../utils/Recoil";
import sectorAtom from "../atoms/atomSector";
import hexAtoms from "../atoms/hexAtoms";
import starSystemAtoms from "../atoms/starSystemAtoms";
import npcAtoms from "../atoms/npcAtoms";
import { Sector, FullSector, Hex, Uuid, StarSystem } from "../interfaces/Sector";
import { NonPlayerCharacter } from "../interfaces/Npc";


const FullSectorSelector = selector({
    key: "FullSector",
    get: ({get}) => {
        const sector = get(sectorAtom);
        const hexes = get(hexAtoms);
        const systems = get(starSystemAtoms);
        const npcs = get(npcAtoms);

        if(sector === null) {
            return null;
        }

        const fullSector: FullSector = {
            id: sector.id,
            name: sector.name,
            density: sector.density,
            rings: sector.rings,
            hexes: sector.hexes.map((id: Uuid):Hex => {
                return hexes.find((h: Hex) => h.id === id);
            }),
            stars: sector.stars.map((id: Uuid): StarSystem => {
                return systems.find((s: StarSystem) => s.id === id);
            }),
            npcs: sector.npcs.map((id: Uuid): NonPlayerCharacter => {
                return npcs.find((n: NonPlayerCharacter) => n.id === id )
            })
        };

        return fullSector;
    }
});

export default FullSectorSelector;