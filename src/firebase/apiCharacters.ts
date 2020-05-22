import { db } from "./firebase";
import { Character } from "../interfaces/Npc";

export interface FirebaseCharacter {
    name: string;
    type: string;
    campaing: string;
    data: string;
}

const COLLECTIONNAME = "characters";

export async function getAllCharacters() {
    const snap = await db.collection(COLLECTIONNAME).get();

    const characters: Character[] = [];
    snap.forEach((doc) => {
        console.log("DOC", doc.id, doc.data());

        try {
            const chr: Character = doc.data() as Character;
            chr.firebaseId = doc.id;
            characters.push(chr);
        } catch (e) {
            console.warn(`${doc.id} data could not be stored as a character`, e);
        }
    });

    return characters;
}

export async function insertOrUpdateCharacter(char: Character): Promise<[string, string]> {
    try {
        if (char.firebaseId === undefined) {
            const docRef = await db.collection(COLLECTIONNAME).add(char);
            return [docRef.id, char.id];
        }

        const docRef = await db.collection(COLLECTIONNAME).doc(char.firebaseId).set(char);
        return [char.firebaseId, char.id];
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}
