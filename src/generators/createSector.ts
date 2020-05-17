import { Sector } from "../interfaces/Sector";
import { rnd } from "../utils/randUtils";
import createStarSystem from "./createStarSystem";
import { v4 } from "uuid";


interface SectorOptions {
    density?: "low"|"normal"|"dense";
    rows?: number,
    columns?: number
}

const createSector = (options: SectorOptions): Sector => {

    const sector: Sector = {
        id: v4(),
        name: "",
        stars: [],
        rows: options.rows || 10,
        columns: options.columns || 8,
        density: options.density || "normal"
    };


    const hexes = sector.rows * sector.columns;
    const divider = options.density === "low" ? 6 : options.density === "dense" ? 4 : 5;
    const rootNum = Math.round(hexes/divider);
    
    // console.log("SECTOR:", hexes, divider, options.density, rootNum);
    
    const starCount = rnd(rootNum,rootNum + Math.round(40/divider));

    for(let i=0; i < starCount; i++) {
        let system = createStarSystem();
        while(sector.stars.find(star => star.position[0] === system.position[0] && star.position[1] === system.position[1])) {
            system = createStarSystem();
        }


        sector.stars.push(system);
    }


    return sector;

};


export default createSector;