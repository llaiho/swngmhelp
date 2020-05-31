import { Uuid, TechLevel } from "./Sector";

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

    goals: string[],

    tags: FactionTag[];

    events: FactionEvent[];

    assets: FactionAsset[];

}

export interface FactionAsset {
    id: Uuid;
    owner?: Uuid;
    name: string;

    level: number;
    hps: number;

    purchaseCost: number;

    attack: string;

    counterAttack: string;

    type: string;
    location: string;

    techLevel: TechLevel;
    notes: string[];

    description: string;
}

export interface FactionEvent {
    factionId: Uuid;
    onTurn: number;
    type: string;
    target: Uuid;
    description: string;
}


export interface FactionTag {
    name: string;
    description: string;
    effect: string;
    effectFn?: () => void;
}