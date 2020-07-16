import { ShipDefense, ShipHullSize } from "../interfaces/Ship";


export const ShipDefenses: ShipDefense[] = [

    {
        defenseName: "Ablative Hull Compartments",
        generalCost: 100000,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 5,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 2,
        generalMassHullSizeMultiplier: true,
        generalHullSizes: [ShipHullSize.Capital],
        defenseEffectDescription: "+1 AC, +20 maximum hit points",
        defenseEffectAC: 1,
        defenseEffectHP: 20,
        generalCanHaveMultiple: false
    },


    {
        defenseName: "Augmented Plating",
        generalCost: 25,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 0,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: true,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        defenseEffectDescription: "+2 AC, -1 Speed",
        defenseEffectAC: 2,
        defenseEffectSpeed: -1,
        generalCanHaveMultiple: false
    }


]