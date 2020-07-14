import { ShipHull, ShipHullSize } from "../interfaces/Ship";


export const ShipHullTemplates: ShipHull[] = [

    {
        hullName: "Strike Fighter",
        hullCost: 200000,
        hullSpeed: 5,
        hullArmor: 5,
        hullHP: 8,
        hullCrewMin: 1,
        hullCrewMax: 1,
        hullAC: 16,
        hullPower: 5,
        hullMass: 2,
        hullHardpoints: 1,
        hullSizeClass: ShipHullSize.Fighter
    },



    {
        hullName: "Free Mechant",
        hullCost: 500000,
        hullSpeed: 3,
        hullArmor: 2,
        hullHP: 20,
        hullCrewMin: 1,
        hullCrewMax: 6,
        hullAC: 14,
        hullPower: 10,
        hullMass: 15,
        hullHardpoints: 2,
        hullSizeClass: ShipHullSize.Frigate
    },

];
