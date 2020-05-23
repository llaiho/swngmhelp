import { Uuid } from "./Sector";


export interface FirebaseStorable {
    firebaseId?: string;
    id: Uuid;
}