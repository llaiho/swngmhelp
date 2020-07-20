import { Uuid } from "./Sector";


export enum ShipHullSize {
    "Fighter" = "Fighter",
    "Frigate" = "Frigate",
    "Cruiser" = "Cruiser",
    "Capital" = "Capital",
}


// export enum ShipHullSize {
//    "Fighter" = 1,
//    "Frigate" = 2,
//    "Cruiser" = 3,
//    "Capital" = 4,
// }


export interface Tag1 {
    name: string;
}


// export interface Tag2 {
//    name: string;
// }


export interface Ship {
    id: Uuid;
    location: Uuid;
    shipName: string;
    shipBaseHull: ShipHull;
    shipSizeClass: ShipHullSize;
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
    shipAddedFittings: ShipFitting[];
    shipAddedDefenses: ShipDefense[];
    shipAddedWeapons:  ShipWeapon[];

/*    
    shipSpikeDriveAdjustment?: number;
    shipCargo?: number;
    shipSmuglerCargo?: number;
    shipAtmospheric?: boolean;
    shipAmphibious?: boolean;
    shipLifeSupportDuration?: number;
    shipFuelForSpike?: number;
*/
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
    hullSizeClass: ShipHullSize;
}


export interface ShipAddition {
    generalCost: number;
    generalCostHullSizeMultiplier: boolean;
    generalPowerModifier: number;
    generalPowerHullSizeMultiplier: boolean;
    generalMassModifier: number;
    generalMassHullSizeMultiplier: boolean;
    generalHullSizes: ShipHullSize[];
    generalCanHaveMultiple: boolean;
}


export interface ShipFitting extends ShipAddition {
    fittingName: string;
    // generalCost: number;
    // generalCostHullSizeMultiplier: boolean;
    // generalPowerModifier: number;
    // generalPowerHullSizeMultiplier: boolean;
    // generalMassModifier: number;
    // generalMassHullSizeMultiplier: boolean;
    // generalHullSizes: ShipHullSize[];
    fittingEffectDescription: string;
    
    fittingSpikeDriveAdjustment?: number;
    fittingCargo?: number;
    fittingSmuglerCargo?: number;
    fittingAtmospheric?: boolean;
    fittingAmphibious?: boolean;
    fittingLifeSupportAmount?: number;
    fittingLifeSupportDuration?: number;
    fittingFuelForSpike?: number;

}


export interface ShipDefense extends ShipAddition {
    defenseName: string;
    // generalCost: number;
    // generalCostHullSizeMultiplier: boolean;
    // generalPowerModifier: number;
    // generalPowerHullSizeMultiplier: boolean;
    // generalMassModifier: number;
    // generalMassHullSizeMultiplier: boolean;
    // generalHullSizes: ShipHullSize;
    defenseEffectDescription: string;
    defenseEffectAC?: number;
    defenseEffectHP?: number;
    defenseEffectSpeed?: number;
    defenseEffectAP?: number;
}



export interface ShipWeapon extends ShipAddition {
    weaponName: string;
    // generalCost: number;
    // generalCostHullSizeMultiplier: boolean;
    weaponAmmoCost?: number;
    weaponDamage?: string;
    // generalPowerModifier: number;
    // generalPowerHullSizeMultiplier: boolean;
    // generalMassModifier: number;
    // generalMassHullSizeMultiplier: boolean;
    weaponHardpoint: number;
//    generalHullSizes: ShipHullSize;
    weaponTechnologyLevel: number;
    weaponQualitiesAP?: number;
    weaponQualitiesAmmo?: number;
    weaponQualitiesFlak?: boolean;
    weaponQualitiesClumsy?: boolean;
    weaponQualitiesCloud?: boolean;
}
