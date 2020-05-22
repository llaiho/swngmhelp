import { Sector, Hex, StarSystem } from "../interfaces/Sector";
import { rnd, arnds, arnd } from "../utils/randUtils";
import { v4 as uuidv4, v4 } from 'uuid';
import createStarSystem from "./createStarSystem";
import { axialToCube } from "../utils/hexUtils";


interface createSectorOptions {
    density?: "low" | "normal" | "dense";
    rings?: number;
}

const createSector = (options: createSectorOptions): [Sector, Hex[], StarSystem[]] => {

    const wa = ["Alpha", "Beta", "Gamma", "Omega", "Delta", "Tiberian", "Arturian", "Collian", "Tommian", "Common", "Thomanian", "Targrave", "Theolan", "Ember", "Draugrist", "Nergal", "Gwildor", "Luma", "Ember", "Chtli", "Tohar"];
    const wb = ["Sector", "Quadrant", "Branch", "Region", "District", "Zone", "Quarter", "Galaxy", "Pocket"];

    const sector: Sector = {
        id: v4(),
        name: `${arnd(wa)} ${arnd(wb)}`,
        stars: [],
        hexes: [],
        rings: options.rings || 4,
        density: options.density || "normal",
        npcs: []
    };

    
    // Create hexes with axial coordinates
    const hexes: Hex[] = [];
    for (let r = sector.rings; r >= sector.rings * -1; r--) {
        for (let q = sector.rings; q >= sector.rings * -1; q--) {
            const cube = axialToCube({ q: q, r: r });
            if (Math.abs(cube.y) <= sector.rings) {
                hexes.push(createHex(cube.x, cube.y, cube.z));
            }
        }
    }

    sector.hexes = hexes.map((h: Hex) => h.id);

    const hexCount = sector.hexes.length;
    
    let minCount = Math.round(hexCount*0.25);
    let maxCount = Math.round(hexCount*0.4);

    if(options.density === "low") {
        minCount = Math.round(hexCount*0.15);
        maxCount = Math.round(hexCount*0.3);
    }

    if(options.density === "dense") {
        minCount = Math.round(hexCount*0.35);
        maxCount = Math.round(hexCount*0.55);
    }


    const systemCount = rnd(minCount, maxCount);
    
    const targetHexes = arnds(hexes, systemCount, true);

    const starSystems: StarSystem[] = [];
    targetHexes.forEach(hex => {
        const star = createStarSystem(hex);
        starSystems.push(star);
    });

    sector.stars = starSystems.map((s: StarSystem) => s.id);
    
    return [sector, hexes, starSystems];

};

function createHex(x: number, y: number, z: number): Hex {

    if (x + y + z !== 0) {
        throw new Error(`Invalid cube coordinate! Sum of coordinates must be a 0! ${x} ${y} ${z}`);
    }

    const hex: Hex = {
        x,
        y,
        z,
        id: uuidv4()
    };

    return hex;
}


export default createSector;