import { ShipHullSize, Ship, ShipHull, ShipFitting, ShipDefense, ShipWeapon, ShipAddition  } from "../interfaces/Ship";

import { arnd, rnd, arnds, roll, grnd } from "../utils/randUtils";
import { Uuid } from "../interfaces/Sector";

import { shipFittingsPowerAndMassModifier, shipFittingsCostModifier, ShipFittings } from "../data/ShipFittings";
import { ShipWeapons } from "../data/ShipWeapons";
import { ShipDefenses } from "../data/ShipDefenses";
import { ShipHullTemplates } from "../data/ShipHullTemplates";
import { v4 } from "uuid";




export function randomShipGenerator(): Ship {

    const hull = arnd(ShipHullTemplates);

    const ship: Ship = {
        id: v4(), 
        location: "Uuid",
        shipName: "string",
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
    }

    for (var i = 0; i < 10; i++) {
        if ((ship.shipFreeMass > 0) || (ship.shipFreePower > 0)) {
            figureAdditions(ship)
        }
    }

    console.log(ship.shipAddedFittings);
    console.log(ship.shipAddedDefenses);
    console.log(ship.shipAddedWeapons);

//    while (((ship.shipFreeMass > 0) || (ship.shipFreePower > 0)) && const i < 10 ) {
//        figureAdditions(ship)
//    }

//    figureFittingFittings(ship)

//    console.log(ship);
    return ship;
}

function figureAdditions(ship: Ship) {

    if ((ship.shipFreePower > 0)  && (ship.shipFreeMass > 0) && (ship.shipFreeHardpoints)) { // shuttle saa aina sandthrowerin
        if (figureFittingWeapons(ship).length > 0) {
            const newWeapon = arnd(figureFittingWeapons(ship));
            modifyShipValuesWeapon(ship, newWeapon);
        }       
    }
    if ((ship.shipFreePower > 0)  && (ship.shipFreeMass > 0)) {
        if (figureFittingDefences(ship).length > 0) {
            if (roll(30)) {
                const newDefence = arnd(figureFittingDefences(ship))
                modifyShipValuesDefense(ship, newDefence);
            }
        }
        const newFitting = arnd(figureFittingFittings(ship));
        modifyShipValuesFitting(ship, newFitting);
    }
}


function modifyShipValuesWeapon(ship: Ship, weapon: ShipWeapon) {
    ship.shipCost = ship.shipCost + (weapon.generalCost * getCostModifier(ship.shipSizeClass));
    ship.shipFreePower = ship.shipFreePower - (weapon.generalPowerModifier * getPowerAndMassModifier(ship.shipSizeClass));
    ship.shipFreeMass  = ship.shipFreeMass  - (weapon.generalMassModifier * getPowerAndMassModifier(ship.shipSizeClass));
    ship.shipFreeHardpoints = ship.shipFreeHardpoints - weapon.weaponHardpoint;
    ship.shipAddedWeapons.push(weapon);
}

function modifyShipValuesDefense(ship: Ship, addition: ShipDefense) {
    ship.shipCost = ship.shipCost + (addition.generalCost * getCostModifier(ship.shipSizeClass));
    ship.shipFreePower = ship.shipFreePower - (addition.generalPowerModifier * getPowerAndMassModifier(ship.shipSizeClass));
    ship.shipFreeMass  = ship.shipFreeMass  - (addition.generalMassModifier * getPowerAndMassModifier(ship.shipSizeClass));
    ship.shipAddedDefenses.push(addition);
}

function modifyShipValuesFitting(ship: Ship, addition: ShipFitting) {
    ship.shipCost = ship.shipCost + (addition.generalCost * getCostModifier(ship.shipSizeClass));
    ship.shipFreePower = ship.shipFreePower - (addition.generalPowerModifier * getPowerAndMassModifier(ship.shipSizeClass));
    ship.shipFreeMass  = ship.shipFreeMass  - (addition.generalMassModifier * getPowerAndMassModifier(ship.shipSizeClass));
    ship.shipAddedFittings.push(addition);
}



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
            && (checkCanHaveMultipleFittings(fit, ship)))
    })
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
            return true;
        }
    }
    else {
        if (fitting.generalPowerModifier <= power) {
            return true;
        }
    }          
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

