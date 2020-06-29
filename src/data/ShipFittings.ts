import { ShipFitting } from "../interfaces/Ship";


const ShipFittings: ShipFitting[] = [

    {
        fittingName: "Automation support",
        fittingCost: 10000,
        fittingCostHullSizeMultiplier: true,
        fittingPowerModifier: 2,
        fittingMassModifier: 1,
        fittingMinimumHullSize: "Fighter",
        fittingEffectDescription: "Ship can use simple robots as crew"
    },
        
    {
        fittingName: "Cargo space",
        fittingPowerModifier: 0,
        fittingMassModifier: 1,
        fittingMinimumHullSize: "Fighter",
        fittingEffectDescription: "Pressurized cargo space"
    },

    {
        fittingName: "Drive-2 upgrade",
        fittingCost: 10000,
        fittingCostHullSizeMultiplier: true,
        fittingPowerModifier: 1,
        fittingPowerHullSizeMultiplier: true,
        fittingMassModifier: 1,
        fittingMassHullSizeMultiplier: true,
        fittingMinimumHullSize: "Fighter",
        fittingEffectDescription: "Upgrade a spike drive to drive-2 rating"
    }








]