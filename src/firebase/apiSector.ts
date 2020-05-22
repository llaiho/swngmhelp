import { db } from "./firebase";
import { Sector } from "../interfaces/Sector";

const COLLECTIONNAME = "sectors";

export async function getAllSectors() {
    const snap = await db.collection(COLLECTIONNAME).get();

    const sectors: Sector[] = [];
    snap.forEach((doc) => {
        try {
            const sec: Sector = doc.data() as Sector;
            sec.firebaseId = doc.id;
            sectors.push(sec);
        } catch (e) {
            console.warn(`${doc.id} data could not be stored as a sector`, e);
        }
    });

    return sectors;
}

export async function insertOrUpdateSector(sector: Sector): Promise<[string, string]> {
    try {
        if (sector.firebaseId === undefined) {
            const docRef = await db.collection(COLLECTIONNAME).add(sector);
            return [docRef.id, sector.id];
        }

        const docRef = await db.collection(COLLECTIONNAME).doc(sector.firebaseId).set(sector);
        return [sector.firebaseId, sector.id];
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}
