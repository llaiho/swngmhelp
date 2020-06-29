import { Uuid } from "./Sector";


export interface Ship {
    id: Uuid;
    location: Uuid;
    shipName: string;
    shipBaseHull: string;
    shipCost: number;
    shipSpeed: number;
    shipArmor: number;
    shipMaxHP: number;
    shipCurrentHP: number;
    shipMinCrew: number;
    shipMaxCrew: number;
    shipAC: number;
    shipFreePower: number;
    shipFreeMass: number;
    shipFreeHardpoints: number;
    shipCurrentCrew: number;
    
}


export interface ShipHull {
    hullName: string;
    hullCost: number;
    hullSpeed: number;
    hullArmor: number;
    hullHP: number;
    hullCrewMin: number;
    hullCrewMax: number;
    hullAC: number;
    hullPower: number;
    hullMass: number;
    hullHardpoints: number;
    hullSizeClass: "Fighter" | "Frigate" | "Cruiser" | "Capital";
}


export interface ShipFitting {
    fittingName: string;
    fittingCost?: number;
    fittingCostHullSizeMultiplier?: boolean;
    fittingPowerModifier: number;
    fittingPowerHullSizeMultiplier?: boolean;
    fittingMassModifier: number;
    fittingMassHullSizeMultiplier?: boolean;
    fittingMinimumHullSize: "Fighter" | "Frigate" | "Cruiser" | "Capital";
    fittingEffectDescription: string;
}


export interface ShipDefense {
    defenseName: string;
    defenseCost: number;
    defensePowerModifier: number;
    defenseMassModifier: number;
    defenseMinimumHullSize: "Fighter" | "Frigate" | "Cruiser" | "Capital";
    defenseEffectDescription: string;
    defenseEffectAC?: number;
    defenseEffectHP?: number;
    defenseEffectSpeed?: number;
    defenseEffectAP?: number;
}



export interface ShipWeapon {
    weaponName: string;
    weaponCost: number;
    weaponAmmoCost?: number;
    weaponDamage?: string;
    weaponPower: number;
    weaponMass: number;
    weaponHardpoint: number;
    weaponMinHullSize: "Fighter" | "Frigate" | "Cruiser" | "Capital";
    weaponTechnologyLevel: number;
    weaponQualitiesAP?: number;
    weaponQualitiesAmmo?: number;
    weaponQualitiesFlak?: boolean;
    weaponQualitiesClumsy?: boolean;
    weaponQualitiesCloud?: boolean;
}
