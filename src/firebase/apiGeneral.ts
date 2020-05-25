import { db } from "./firebase";
import { FirebaseStorable } from "../interfaces/Firebase";
import { findByAltText } from "@testing-library/react";

export async function getAllItems<T extends FirebaseStorable>(collectionName: string) {
    const snap = await db.collection(collectionName).get();

    const items: T[] = [];
    snap.forEach((doc) => {
        try {
            const item: T = doc.data() as T;
            item.firebaseId = doc.id;
            items.push(item);
        } catch (e) {
            console.warn(`${doc.id} data could not be stored as an item T`, e);
        }
    });

    return items;
}

export async function getItem<T extends FirebaseStorable>(
    collectionName: string,
    itemId: string
): Promise<T | undefined> {
    const snap = await db.collection(collectionName).doc(itemId).get();
    
    
    if (!snap.data()) {
        console.warn(`Hex id ${itemId} not found!`);
        return;
    }
    const data: T = snap.data() as T;
    if(data.firebaseId === undefined) {
        data.firebaseId = snap.id;
    }
    
    return data;

    
}

export async function insertOrUpdateItem<T extends FirebaseStorable>(
    item: T,
    collectionName: string
): Promise<[string, string]> {
    try {
        if (item.firebaseId === undefined) {
            const docRef = await db.collection(collectionName).add(item);
            return [docRef.id, item.id];
        }

        const docRef = await db.collection(collectionName).doc(item.firebaseId).set(item);
        return [item.firebaseId, item.id];
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}
