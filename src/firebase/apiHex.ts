import { getAllItems, insertOrUpdateItem, getItem } from "./apiGeneral";
import { Hex, HexStore } from "../interfaces/Sector";

const COLLECTIONNAME = "hexes";

export async function getAllHexes(): Promise<HexStore[]> {
    return await getAllItems<HexStore>(COLLECTIONNAME);
}

export async function getHex(hexStoreId: string): Promise<HexStore|undefined> {
    const hexS: HexStore|undefined = await getItem<HexStore>(COLLECTIONNAME, hexStoreId);
    
    if(!hexS) return;
    if(hexS.id === "" && hexS.firebaseId !== undefined) {
        hexS.id = hexS.firebaseId;
    }
    console.log("HEXS", hexS);
    return hexS;
}

export async function insertOrUpdateHex(hex: HexStore|Hex): Promise<[string, string]> {
    return await insertOrUpdateItem<HexStore|Hex>(hex, COLLECTIONNAME);
}