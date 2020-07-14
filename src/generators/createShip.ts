import { ShipHullSize, Ship, ShipHull, ShipFitting, ShipDefense, ShipWeapon  } from "../interfaces/Ship";

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

    figureFittingFittings(ship.shipSizeClass, ship.shipFreePower, ship.shipFreeMass)

    return ship;
}





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


function getModifier(fitting: ShipFitting, hullSize: ShipHullSize): number {

    const mod: number | undefined =  shipFittingsPowerAndMassModifier.get(hullSize);

    if (mod !== undefined) {
        return mod;
    }
    return 1;
}


function checkMass(fitting: ShipFitting, hullSize: ShipHullSize, mass: number): boolean {
    
    if (fitting.fittingMassHullSizeMultiplier) {               
        if ((fitting.fittingMassModifier * getModifier(fitting, hullSize)) <= mass) {
            return true;  
        }
    }
    else {
        if (fitting.fittingMassModifier <= mass) {
            return true;
        }
    }
    return false;
}


function checkPower(fitting: ShipFitting, hullSize: ShipHullSize, power: number): boolean {

    if (fitting.fittingPowerHullSizeMultiplier) {
        if ((fitting.fittingPowerModifier * getModifier(fitting, hullSize)) <= power) {
            return true;
        }
    }
    else {
        if (fitting.fittingPowerModifier <= power) {
            return true;
        }
    }          
    return false;
}








