import { getAllItems, insertOrUpdateItem } from "./apiGeneral";
import { Hex } from "../interfaces/Sector";

const COLLECTIONNAME = "hexes";

export async function getAllHexes(): Promise<Hex[]> {
    return await getAllItems<Hex>(COLLECTIONNAME);
}

export async function insertOrUpdateHex(hex: Hex): Promise<[string, string]> {
    return await insertOrUpdateItem<Hex>(hex, COLLECTIONNAME);
}