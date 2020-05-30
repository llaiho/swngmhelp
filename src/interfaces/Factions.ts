import { Uuid } from "./Sector";

export interface Faction {
    id: Uuid;
    sectorId: Uuid;
    systems: Uuid[];
    name: string;

    hps: number;
    forceRating: number;
    cunningRating: number;
    wealthRating: number;

    facCreds: number;

    experience: number;

    tags: string[];

    events: FactionEvent[];

    assets: FactionAsset[];

}

export interface FactionAsset {
    id: Uuid;
    owner: Uuid;
    name: string;

    hps: number;

    purchaseCost: number;

    attack: number;

    counterAttack: number;

    type: string;
    location: string;

    techLevel: string;
}

export interface FactionEvent {
    factionId: Uuid;
    onTurn: number;
    type: string;
    target: Uuid;
    description: string;
}