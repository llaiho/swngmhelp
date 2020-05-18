import { Sector, CubeSector, Hex } from "../interfaces/Sector";
import { rnd, arnds } from "../utils/randUtils";
import { v4 as uuidv4, v4 } from 'uuid';
import createStarSystem from "./createStarSystem";
import { axialToCube } from "../utils/hexUtils";


interface SectorCubeOptions {
    density?: "low" | "normal" | "dense";
    rings?: number;
}

const createCubeSector = (options: SectorCubeOptions): CubeSector => {

    const sector: CubeSector = {
        id: v4(),
        name: "",
        stars: [],
        hexes: [],
        rings: options.rings || 4,
        density: options.density || "normal",
        npcs: []
    };

    
    // Create hexes with axial coordinates
    for (let r = sector.rings; r >= sector.rings * -1; r--) {
        for (let q = sector.rings; q >= sector.rings * -1; q--) {
            const cube = axialToCube({ q: q, r: r });
            if (Math.abs(cube.y) <= sector.rings) {
                sector.hexes.push(createHex(cube.x, cube.y, cube.z));
            }
        }
    }

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
    
    const targetHexes = arnds(sector.hexes, systemCount, true);

    targetHexes.forEach(hex => {
        const star = createStarSystem(hex);
        sector.stars.push(star);
    });

    

    return sector;

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


export default createCubeSector;