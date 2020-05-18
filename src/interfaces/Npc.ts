import { Uuid } from "./Sector";

export interface NonPlayerCharacter {
    id: Uuid;
    name: string;
    gender: string;
    description: string;
    age: number;
    motivation: NpcMotivation;
    possessions: Possession[];
    attributes?: Attributes;
    skills?: Skill[];
    
}

export interface ComplexNonPlayerCharacter extends NonPlayerCharacter {
    charClass: CharacterClass;
    level: number;
    attributes: Attributes;
}

export enum CharacterClass {
    Warrior = "Warrior",
    Psychic = "Psychic",
    Expert = "Expert",
    Adventurer = "Adventurer",
    NoClass = "No special class",
}

export interface Attributes {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

export interface Skill {
    name: string;
    value: number;
    type: "general" | "psychic" | "combat";
}

export interface Possession {
    name: string;
    amount: number;
}

export interface NpcMotivation {
    initialManner: string;
    defaultDealOutcome: string;
    motivation: string;
    want: string;
    power: string;
    hook: string;
}
