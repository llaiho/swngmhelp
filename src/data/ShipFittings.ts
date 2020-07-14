import { ShipFitting, ShipHullSize } from "../interfaces/Ship";


const shipFittingsPowerAndMassModifier = new Map<ShipHullSize, number>();

shipFittingsPowerAndMassModifier.set(ShipHullSize.Fighter, 1);
shipFittingsPowerAndMassModifier.set(ShipHullSize.Frigate, 2);
shipFittingsPowerAndMassModifier.set(ShipHullSize.Cruiser, 3);
shipFittingsPowerAndMassModifier.set(ShipHullSize.Capital, 4);

export {
    shipFittingsPowerAndMassModifier
}






const shipFittingsCostModifier = new Map<ShipHullSize, number>();

shipFittingsCostModifier.set(ShipHullSize.Fighter, 1);
shipFittingsCostModifier.set(ShipHullSize.Frigate, 10);
shipFittingsCostModifier.set(ShipHullSize.Cruiser, 25);
shipFittingsCostModifier.set(ShipHullSize.Capital, 100);

export {
    shipFittingsCostModifier
}


export const ShipFittings: ShipFitting[] = [

    {
        fittingName: "Automation support",
        fittingCost: 10000,
        fittingCostHullSizeMultiplier: true,
        fittingPowerModifier: 2,
        fittingPowerHullSizeMultiplier: false,
        fittingMassModifier: 1,
        fittingMassHullSizeMultiplier: false,
        fittingHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Ship can use simple robots as crew"
    },
        
    {
        fittingName: "Cargo space",
        fittingCost: 0,
        fittingCostHullSizeMultiplier: false,
        fittingPowerModifier: 0,
        fittingPowerHullSizeMultiplier: false,
        fittingMassModifier: 1,
        fittingMassHullSizeMultiplier: false,
        fittingHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
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
        fittingHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Upgrade a spike drive to drive-2 rating"
    }








]