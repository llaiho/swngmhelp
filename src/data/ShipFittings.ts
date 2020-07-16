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
        generalCost: 10000,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 2,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: false,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Ship can use simple robots as crew",
        generalCanHaveMultiple: false
    },
        
    {
        fittingName: "Cargo space",
        generalCost: 0,
        generalCostHullSizeMultiplier: false,
        generalPowerModifier: 0,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: false,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Pressurized cargo space",
        generalCanHaveMultiple: false
    },

    {
        fittingName: "Drive-2 upgrade",
        generalCost: 10000,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 1,
        generalPowerHullSizeMultiplier: true,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: true,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Upgrade a spike drive to drive-2 rating",
        generalCanHaveMultiple: false
    }








]