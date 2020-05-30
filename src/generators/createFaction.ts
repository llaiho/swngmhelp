import { Faction } from "../interfaces/Factions";
import { v4 } from "uuid";


export default function createFaction(): Faction {


    const faction: Faction = {
        id: v4(),
        sectorId: "",
        name: "",
        assets: [],
        cunningRating: 1,
        forceRating: 1,
        wealthRating: 1,

        hps: 1,
        experience: 0,
        facCreds: 1,

        systems: [],
        tags: [],
        events: []


    }


    return faction;

}