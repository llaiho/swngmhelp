import { ShipHullSize, Ship, ShipHull, ShipFitting, ShipDefense, ShipWeapon, ShipAddition  } from "../interfaces/Ship";

import { arnd, rnd, arnds, roll, grnd } from "../utils/randUtils";
import { Uuid } from "../interfaces/Sector";

import { shipFittingsPowerAndMassModifier, shipFittingsCostModifier, ShipFittings, ShipFittingSystemDrive } from "../data/ShipFittings";
import { ShipWeapons } from "../data/ShipWeapons";
import { ShipDefenses } from "../data/ShipDefenses";
import { ShipHullTemplates, name1, name2 } from "../data/ShipHullTemplates";
import { v4 } from "uuid";


function makeName(): string {
    var shipName = "string";

    shipName = arnd(name1).name;
    shipName = shipName + " ";
    shipName = shipName + arnd(name2).name;

    return shipName;
}


export function randomShipGenerator(): Ship {

    const hull = arnd(ShipHullTemplates);

    const ship: Ship = {
        id: v4(), 
        location: "Uuid",
        shipName: makeName(),
        shipBaseHull: hull, 
        shipSizeClass: hull.hullSizeClass,
        shipCost: hull.hullCost,
        shipSpeed: hull.hullSpeed,
        shipArmor: hull.hullArmor,
        shipMaxHP: hull.hullHP,
        shipCurrentHP: hull.hullHP,
        shipMinCrew: hull.hullCrewMin,
        shipMaxCrew: hull.hullCrewMax,
        shipAC: hull.hullAC,
        shipFreePower: hull.hullPower,
        shipFreeMass: hull.hullMass,
        shipFreeHardpoints: hull.hullHardpoints,
        shipCurrentCrew: 0,
        shipAddedFittings: [],
        shipAddedDefenses: [],
        shipAddedWeapons:  [],
        shipAmphibious: false,
        shipAtmospheric: false,
        shipCargo: 0,                                       // tons
        shipSmuglerCargo: 0,                                // tons
        shipLifeSupportDuration: (hull.hullCrewMax * 60),   // mandays
        shipSpikeDrive: 1,
        shipFuelForSpike: 1,

    }
    if (roll(40)) {
        
        ship.shipSpikeDrive = 0;
        ship.shipFuelForSpike = 0;
        ship.shipCost = 0.9 * hull.hullCost; 
        modifyShipValuesFitting(ship, ShipFittingSystemDrive)
//        ship.shipFreeMass = hull.hullMass + ( 2 * getPowerAndMassModifier(ship.shipSizeClass) );
//        ship.shipFreePower = hull.hullPower + getPowerAndMassModifier(ship.shipSizeClass);
        
//        ship.shipAddedFittings.push(ShipFittings)
    }

    for (var i = 0; i < (50 * getPowerAndMassModifier(ship.shipSizeClass)); i++) {
        if ((ship.shipFreeMass > 0) || (ship.shipFreePower > 0)) {
            figureAdditions(ship)
        }
    }



//    while (((ship.shipFreeMass > 0) || (ship.shipFreePower > 0)) && const i < 10 ) {
//        figureAdditions(ship)
//    }

//    figureFittingFittings(ship)

    console.log(ship);
    return ship;
}

function figureAdditions(ship: Ship) {

    const possibleWeaponList = figureFittingWeapons(ship);
    if (((ship.shipFreePower > 0)  && (ship.shipFreeMass > 0)) && (ship.shipFreeHardpoints)) { // shuttle saa aina sandthrowerin
        if (possibleWeaponList.length > 0) {
            const newWeapon = arnd(possibleWeaponList);
            modifyShipValuesWeapon(ship, newWeapon);
        }       
    }
    const possibleDefenceList = figureFittingDefences(ship);
    if (((ship.shipFreePower > 0)  || (ship.shipFreeMass > 0)) && (possibleDefenceList.length > 0)) {
        if (roll(30)) {
            const newDefence = arnd(possibleDefenceList);
            modifyShipValuesDefense(ship, newDefence);
        }

    const possibleFittingList = figureFittingFittings(ship);
    if (((ship.shipFreePower > 0)  || (ship.shipFreeMass > 0)) && (possibleFittingList.length > 0)) {
        const newFitting = arnd(possibleFittingList);
        modifyShipValuesFitting(ship, newFitting);
    }    

    }
}


function modifyShipValuesWeapon(ship: Ship, weapon: ShipWeapon) {
    if (weapon.generalCostHullSizeMultiplier) {
        ship.shipCost = ship.shipCost + (weapon.generalCost * getCostModifier(ship.shipSizeClass));
    } else {
        ship.shipCost = ship.shipCost + weapon.generalCost;
    }
    
    if (weapon.generalPowerHullSizeMultiplier) {
        ship.shipFreePower = ship.shipFreePower - (weapon.generalPowerModifier * getPowerAndMassModifier(ship.shipSizeClass));
    } else {
        ship.shipFreePower = ship.shipFreePower - weapon.generalPowerModifier;
    }

    if (weapon.generalMassHullSizeMultiplier) {
        ship.shipFreeMass  = ship.shipFreeMass  - (weapon.generalMassModifier * getPowerAndMassModifier(ship.shipSizeClass));
    } else {
        ship.shipFreeMass  = ship.shipFreeMass  - weapon.generalMassModifier;
    }
    
    ship.shipFreeHardpoints = ship.shipFreeHardpoints - weapon.weaponHardpoint;
    ship.shipAddedWeapons.push(weapon);
}


function modifyShipValuesDefense(ship: Ship, addition: ShipDefense) {
    if (addition.generalCostHullSizeMultiplier) {
        ship.shipCost = ship.shipCost + (addition.generalCost * getCostModifier(ship.shipSizeClass));
    } else {
        ship.shipCost = ship.shipCost + addition.generalCost;
    }
    
    if (addition.generalPowerHullSizeMultiplier) {
        ship.shipFreePower = ship.shipFreePower - (addition.generalPowerModifier * getPowerAndMassModifier(ship.shipSizeClass));
    } else {
        ship.shipFreePower = ship.shipFreePower - addition.generalPowerModifier;
    }

    if (addition.generalMassHullSizeMultiplier) {
        ship.shipFreeMass  = ship.shipFreeMass  - (addition.generalMassModifier * getPowerAndMassModifier(ship.shipSizeClass));
    } else {
        ship.shipFreeMass  = ship.shipFreeMass  - addition.generalMassModifier;
    } 

     if (addition.defenseEffectAC) {
        ship.shipAC = ship.shipAC + addition.defenseEffectAC;
    }
    if (addition.defenseEffectSpeed) {
        ship.shipSpeed = ship.shipSpeed + addition.defenseEffectSpeed;
    }
    if (addition.defenseEffectAP) {
        ship.shipArmor = ship.shipArmor + addition.defenseEffectAP;
    }
    if (addition.defenseEffectHP) {
        ship.shipMaxHP = ship.shipMaxHP + addition.defenseEffectHP;
    } 

//    ship.shipCost = ship.shipCost + (addition.generalCost * getCostModifier(ship.shipSizeClass));
//    ship.shipFreePower = ship.shipFreePower - (addition.generalPowerModifier * getPowerAndMassModifier(ship.shipSizeClass));
//    ship.shipFreeMass  = ship.shipFreeMass  - (addition.generalMassModifier * getPowerAndMassModifier(ship.shipSizeClass));
    ship.shipAddedDefenses.push(addition);
}


function modifyShipValuesFitting(ship: Ship, addition: ShipFitting) {
    if (addition.generalCostHullSizeMultiplier) {
        ship.shipCost = ship.shipCost + (addition.generalCost * getCostModifier(ship.shipSizeClass));
    } else {
        ship.shipCost = ship.shipCost + addition.generalCost;
    }
    
    if (addition.generalPowerHullSizeMultiplier) {
        ship.shipFreePower = ship.shipFreePower - (addition.generalPowerModifier * getPowerAndMassModifier(ship.shipSizeClass));
    } else {
        ship.shipFreePower = ship.shipFreePower - addition.generalPowerModifier;
    }

    if (addition.generalMassHullSizeMultiplier) {
        ship.shipFreeMass  = ship.shipFreeMass  - (addition.generalMassModifier * getPowerAndMassModifier(ship.shipSizeClass));
    } else {
        ship.shipFreeMass  = ship.shipFreeMass  - addition.generalMassModifier;
    }


    if (addition.fittingLifeSupportAmount) {
        ship.shipMaxCrew = ship.shipMaxCrew + ship.shipBaseHull.hullCrewMax;
    }
    if (addition.fittingLifeSupportDuration) {
        ship.shipLifeSupportDuration = ship.shipLifeSupportDuration + (ship.shipMaxCrew * 60);
    }

    if (addition.fittingCargo) {
        if ((2 * ((getPowerAndMassModifier(ship.shipSizeClass)) - 1) * 10 ) === 0) {
            ship.shipCargo = ship.shipCargo + 2;
        }
        else {
            ship.shipCargo = ship.shipCargo + (2 * ((getPowerAndMassModifier(ship.shipSizeClass)) - 1) * 10 )
        }
    }

    if (addition.fittingSmuglerCargo) {
        if ((0.2 * ((getPowerAndMassModifier(ship.shipSizeClass)) - 1) * 10 ) === 0) {
            ship.shipSmuglerCargo = ship.shipSmuglerCargo + 0.2;
        }
        else {
            ship.shipSmuglerCargo = ship.shipSmuglerCargo + (0.2 * ((getPowerAndMassModifier(ship.shipSizeClass)) - 1) * 10 )
        }
    }

    if (addition.fittingAtmospheric) {
        ship.shipAtmospheric = true;
    }
    if (addition.fittingAmphibious) {
        ship.shipAtmospheric = true;
        ship.shipAmphibious = true;
    }

    if (addition.fittingSpikeDrive) {
        ship.shipSpikeDrive = addition.fittingSpikeDrive;
    }
    if (addition.fittingFuelForSpike) {
        ship.shipFuelForSpike = ship.shipFuelForSpike + 1;
    }



//    ship.shipCost = ship.shipCost + (addition.generalCost * getCostModifier(ship.shipSizeClass));
//    ship.shipFreePower = ship.shipFreePower - (addition.generalPowerModifier * getPowerAndMassModifier(ship.shipSizeClass));
//    ship.shipFreeMass  = ship.shipFreeMass  - (addition.generalMassModifier * getPowerAndMassModifier(ship.shipSizeClass));
    ship.shipAddedFittings.push(addition);
}
/*
fittingSpikeDrive?: number;
fittingCargo?: boolean;
fittingSmuglerCargo?: boolean;
fittingAtmospheric?: boolean;
fittingAmphibious?: boolean;
fittingLifeSupportAmount?: number;
fittingLifeSupportDuration?: number;
fittingFuelForSpike?: number;
*/


function figureFittingWeapons(ship: Ship) {

    return ShipWeapons.filter((fit: ShipWeapon) => {
        return ((checkMass(fit, ship.shipSizeClass, ship.shipFreeMass)) 
            && (checkPower(fit, ship.shipSizeClass, ship.shipFreePower)) 
            && (checkHardPoints(fit, ship.shipFreeHardpoints))
            && (checkCanHaveMultipleWeapons(fit, ship)))
    })
}

function figureFittingDefences(ship: Ship) {

    return ShipDefenses.filter((fit: ShipDefense) => {
        return ((checkMass(fit, ship.shipSizeClass, ship.shipFreeMass)) 
            && (checkPower(fit, ship.shipSizeClass, ship.shipFreePower))
            && (checkCanHaveMultipleDefences(fit, ship)))
    })
}

function figureFittingFittings(ship: Ship) {

    return ShipFittings.filter((fit: ShipFitting) => {
        return ((checkMass(fit, ship.shipSizeClass, ship.shipFreeMass)) 
            && (checkPower(fit, ship.shipSizeClass, ship.shipFreePower))
            && (checkCanHaveMultipleFittings(fit, ship))
            && (checkCanHaveSpikeUpgrade(ship, fit)) 
            && (checkCanHaveAtmosphericUpgrade(ship, fit))
            && (checkCanHaveFuelBunkers(ship, fit)))
    })
}

function checkCanHaveFuelBunkers(ship: Ship, upgrade: ShipFitting): boolean {
    if ((upgrade.fittingFuelForSpike === undefined) || ship.shipSpikeDrive !== 0) {
        return true;
    }
    return false;
}

function checkCanHaveSpikeUpgrade(ship: Ship, upgrade: ShipFitting): boolean {
    if (upgrade.fittingSpikeDrive === undefined) {
        return true
    }
    else {
        if (ship.shipSpikeDrive === 1) {
          return true;
        }
    }
    return false;
}

function checkCanHaveAtmosphericUpgrade(ship: Ship, upgrade: ShipFitting): boolean {
    if (getPowerAndMassModifier(ship.shipSizeClass) > 2) {
        return false;
    }
    else {
        if (ship.shipAtmospheric === false && ship.shipAmphibious === false) {
            return true;
        }
    }
    return false;
}


/* 
function figureFittingFittings(hullSize: ShipHullSize, power: number, mass: number) {
    
    const fittingShipFittings: ShipFitting[] = [];
    
    for (var i = 0; i < ShipFittings.length; i++) {
        if (ShipFittings[i].fittingHullSizes.includes(hullSize)) {
            if (checkMass(ShipFittings[i], hullSize, mass)) {
                if (checkPower(ShipFittings[i], hullSize, power)) {

                    fittingShipFittings.push(ShipFittings[i]);
                }
            }        
        }
    }
    return fittingShipFittings;
}
 */

function getPowerAndMassModifier(hullSize: ShipHullSize): number {

    const mod: number | undefined =  shipFittingsPowerAndMassModifier.get(hullSize);

    if (mod !== undefined) {
        return mod;
    }
    return 1;
}


function getCostModifier(hullSize: ShipHullSize): number {

    const mod: number | undefined =  shipFittingsCostModifier.get(hullSize);

    if (mod !== undefined) {
        return mod;
    }
    return 1;
}

///////////////////////////////////////
//                                   //
//      Chekcing functions start     //


function checkMass(fitting: ShipFitting | ShipWeapon | ShipDefense, hullSize: ShipHullSize, mass: number): boolean {
    
    if (fitting.generalMassHullSizeMultiplier) {               
        if ((fitting.generalMassModifier * getPowerAndMassModifier(hullSize)) <= mass) {
            return true;  
        }
    }
    else {
        if (fitting.generalMassModifier <= mass) {
            return true;
        }
    }
    return false;
}


function checkPower(fitting: ShipFitting | ShipWeapon | ShipDefense, hullSize: ShipHullSize, power: number): boolean {

    if (fitting.generalPowerHullSizeMultiplier) {
        if ((fitting.generalPowerModifier * getPowerAndMassModifier(hullSize)) <= power) {
//            console.log("CheckPower 1 : " + getPowerAndMassModifier(hullSize))
            return true;
        }
    }
    else {
        if (fitting.generalPowerModifier <= power) {
//            console.log("CheckPower 2 : " + fitting.generalPowerModifier)
            return true;
        }
    }
//    console.log("CheckPower 3 : " + fitting.generalPowerHullSizeMultiplier)          
    return false;
}

function checkHardPoints(fitting: ShipWeapon, hardPoints: number): boolean {
    
    if (fitting.weaponHardpoint <= hardPoints) {
        return true;
    }
    return false;
} 

function checkCanHaveMultipleWeapons(fitting: ShipWeapon, ship: Ship): boolean {

    if (fitting.generalCanHaveMultiple) {
        return true;
    }
    if ((fitting.generalCanHaveMultiple === false) && !(ship.shipAddedWeapons).includes(fitting)) {
        return true;
    }
    return false;
}

function checkCanHaveMultipleDefences(fitting: ShipDefense, ship: Ship): boolean {

    if (fitting.generalCanHaveMultiple) {
        return true;
    }
    if ((fitting.generalCanHaveMultiple === false) && !(ship.shipAddedDefenses).includes(fitting)) {
        return true;
    }
    return false;
}

function checkCanHaveMultipleFittings(fitting: ShipFitting, ship: Ship): boolean {

    if (fitting.generalCanHaveMultiple) {
        return true;
    }
    if ((fitting.generalCanHaveMultiple === false) && !(ship.shipAddedFittings).includes(fitting)) {
        return true;
    }
    return false;
}



//      Chekcing functions end       //
//                                   //
///////////////////////////////////////

