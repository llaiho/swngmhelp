import { ShipDefense, ShipHullSize } from "../interfaces/Ship";


export const ShipDefenses: ShipDefense[] = [

    {
        defenseName: "Ablative Hull Compartments",
        defenseCost: 100000,
        defensePowerModifier: 5,
        defenseMassModifier: 2,
        defenseMinimumHullSize: ShipHullSize.Capital,
        defenseEffectDescription: "+1 AC, +20 maximum hit points",
        defenseEffectAC: 1,
        defenseEffectHP: 20
    },


    {
        defenseName: "Augmented Plating",
        defenseCost: 25,
        defensePowerModifier: 0,
        defenseMassModifier: 1,
        defenseMinimumHullSize: ShipHullSize.Fighter,
        defenseEffectDescription: "+2 AC, -1 Speed",
        defenseEffectAC: 2,
        defenseEffectSpeed: -1
    }


]