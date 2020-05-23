import { Uuid } from "./Sector";
import { FirebaseStorable } from "./Firebase";

export interface randomRange {
    min: number;
    max: number;
}

export interface Adjust {
    amount: number;
}


export interface Customizer<T> {
    range?: randomRange;
    adjust?: number;
    fn?: (npc?: Character) => T;
    options?: T[];
}

export interface NonPlayerCharacterTemplate {
    templateName: string;
    description?: "",
    gender?: string;
    age?: randomRange|number;
    str?: number|Customizer<number>;
    dex?: number|Customizer<number>;
    con?: number|Customizer<number>;
    int?: number|Customizer<number>;
    wis?: number|Customizer<number>;
    cha?: number|Customizer<number>;
    generalSkills?: [string, number|Adjust][]|number;
    combatSkills?: [string, number|Adjust][]|number;
    psychicSkills?: [string, number|Adjust][]|number;
    locale?: string;
    level?: number;
    hps?: randomRange|number;
    hitDice?: number;
    ac?: number;
    charClass?: CharacterClass;

}

export interface Character extends FirebaseStorable {
    id: Uuid;
    
    firebaseId?: string;

    name: string;
    gender: string;
    description: string;
    age: number;
    motivation: NpcMotivation;
    possessions: Possession[];
    attributes: Attributes;
    skills: Skill[];

    hitpoints: number;
    attackBonus: number;
    hitDice: number;
    armourClass: number;

    charClass: string;
    level: number;

}

export interface ComplexNonPlayerCharacter extends Character {
    
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
