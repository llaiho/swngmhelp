import createFaction from "./createFaction";
import { Faction } from "../interfaces/Factions";


describe("Factions", () => {

    it("random Faction creator", () =>{

        const f: Faction = createFaction();
        console.log(f);

        
        
    });

})