
import { Sector } from "../interfaces/Sector";
import { getAllItems, insertOrUpdateItem } from "./apiGeneral";

const COLLECTIONNAME = "sectors";

export async function getAllSectors(): Promise<Sector[]> {
    return await getAllItems<Sector>(COLLECTIONNAME);
}

export async function insertOrUpdateSector(sector: Sector): Promise<[string, string]> {
    return await insertOrUpdateItem<Sector>(sector, COLLECTIONNAME);
}

