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
    }


    if ((ship.shipFreeMass > 0) || (ship.shipFreePower > 0)) {
        figureAdditions(ship)
    }

//    figureFittingFittings(ship)

    return ship;
}

function figureAdditions(ship: Ship) {

    if ((ship.shipFreePower > 0)  && (ship.shipFreeMass > 0) && (ship.shipFreeHardpoints)) {
        figureFittingWeapons(ship)
    }
}

function figureFittingWeapons(ship: Ship) {

    return ShipWeapons.filter((fit: ShipWeapon) => {
        return (checkMass(fit, ship.shipSizeClass, ship.shipFreeMass) && (checkPower(fit, ship.shipSizeClass, ship.shipFreePower)) && checkHardPoints(fit, ship.shipFreeHardpoints))
    })
}

function figureFittingDefences(ship: Ship) {

    return ShipDefenses.filter((fit: ShipDefense) => {
        return (checkMass(fit, ship.shipSizeClass, ship.shipFreeMass) && (checkPower(fit, ship.shipSizeClass, ship.shipFreePower)))
    })
}

function figureFittingFittings(ship: Ship) {

    return ShipFittings.filter((fit: ShipFitting) => {
        return (checkMass(fit, ship.shipSizeClass, ship.shipFreeMass) && (checkPower(fit, ship.shipSizeClass, ship.shipFreePower)))
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

function getModifier(hullSize: ShipHullSize): number {

    const mod: number | undefined =  shipFittingsPowerAndMassModifier.get(hullSize);

    if (mod !== undefined) {
        return mod;
    }
    return 1;
}


function checkMass(fitting: ShipFitting | ShipWeapon | ShipDefense, hullSize: ShipHullSize, mass: number): boolean {
    
    if (fitting.generalMassHullSizeMultiplier) {               
        if ((fitting.generalMassModifier * getModifier(hullSize)) <= mass) {
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
        if ((fitting.generalPowerModifier * getModifier(hullSize)) <= power) {
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








