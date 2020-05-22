import { Uuid } from "./Sector";
import { Character } from "./Npc";


export interface Encounter {
    id: Uuid;
    name: string;
    location: Uuid;
    participants: Character[];
    features: Feature[];
    round: number;
    status: "DRAFT"|"READY"|"COMPLETED";

}

export interface Feature {
    id: Uuid;
    name: string;
    description: string;
    x: number;
    y: number;
    z?: number;
    coverValue: "None"|"Half"|"Near Full"|"Full";
}