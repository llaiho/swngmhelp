import { getAllItems, insertOrUpdateItem } from "./apiGeneral";
import { StarSystem } from "../interfaces/Sector";
import { StarSystemFirebase } from "../utils/saveUtils";

const COLLECTIONNAME = "starsystems";

export async function getAllStarSystems(): Promise<StarSystem[]> {
    return await getAllItems<StarSystem>(COLLECTIONNAME);
}

export async function insertOrUpdateStarSystems(starSystem: StarSystemFirebase): Promise<[string, string]> {
    return await insertOrUpdateItem<StarSystemFirebase>(starSystem, COLLECTIONNAME);
}