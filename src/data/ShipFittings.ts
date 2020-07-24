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
        fittingName: "Extended Life Support",
        generalCost: 5000,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 1,
        generalPowerHullSizeMultiplier: true,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: false,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Doubles maximum crew size",
        generalCanHaveMultiple: true,
        fittingLifeSupportAmount: true
    },

    {
        fittingName: "Extended Stores",
        generalCost: 2500,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 0,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: false,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Maximum life support duration doubled",
        generalCanHaveMultiple: true,
        fittingLifeSupportDuration: true
    },

    {
        fittingName: "Fuel bunkers",
        generalCost: 2500,
        generalCostHullSizeMultiplier: false,
        generalPowerModifier: 0,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: false,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Fuel for spike drill",
        generalCanHaveMultiple: true,
        fittingFuelForSpike: 1
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
        generalCanHaveMultiple: true,
        fittingCargo: true
    },

    {
        fittingName: "Smuggler's hold",
        generalCost: 0,
        generalCostHullSizeMultiplier: false,
        generalPowerModifier: 0,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: false,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Well-hidden cargo space",
        generalCanHaveMultiple: true,
        fittingSmuglerCargo: true
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
        generalCanHaveMultiple: false,
        fittingSpikeDrive: 2
    },

    {
        fittingName: "Drive-3 upgrade",
        generalCost: 20000,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 2,
        generalPowerHullSizeMultiplier: true,
        generalMassModifier: 2,
        generalMassHullSizeMultiplier: true,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Upgrade a spike drive to drive-3 rating",
        generalCanHaveMultiple: false,
        fittingSpikeDrive: 3
    },

    {
        fittingName: "Drive-4 upgrade",
        generalCost: 40000,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 2,
        generalPowerHullSizeMultiplier: true,
        generalMassModifier: 3,
        generalMassHullSizeMultiplier: true,
        generalHullSizes: [ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Upgrade a spike drive to drive-4 rating",
        generalCanHaveMultiple: false,
        fittingSpikeDrive: 4
    },

    {
        fittingName: "Drive-5 upgrade",
        generalCost: 100000,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 3,
        generalPowerHullSizeMultiplier: true,
        generalMassModifier: 3,
        generalMassHullSizeMultiplier: true,
        generalHullSizes: [ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Upgrade a spike drive to drive-5 rating",
        generalCanHaveMultiple: false,
        fittingSpikeDrive: 5
    },

    {
        fittingName: "Drive-6 upgrade",
        generalCost: 500000,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: 3,
        generalPowerHullSizeMultiplier: true,
        generalMassModifier: 4,
        generalMassHullSizeMultiplier: true,
        generalHullSizes: [ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Upgrade a spike drive to drive-6 rating",
        generalCanHaveMultiple: false,
        fittingSpikeDrive: 6
    },


/* 
    {
        fittingName: "System Drive",
        generalCost: 0,
        generalCostHullSizeMultiplier: true,
        generalPowerModifier: -1,
        generalPowerHullSizeMultiplier: true,
        generalMassModifier: -2,
        generalMassHullSizeMultiplier: true,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        fittingEffectDescription: "Removes Spike drive",
        generalCanHaveMultiple: false,
        fittingSpikeDrive: 0
    }
 */







]

export const ShipFittingSystemDrive: ShipFitting =
{
    fittingName: "System Drive",
    generalCost: 0,
    generalCostHullSizeMultiplier: true,
    generalPowerModifier: -1,
    generalPowerHullSizeMultiplier: true,
    generalMassModifier: -2,
    generalMassHullSizeMultiplier: true,
    generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
    fittingEffectDescription: "Removes Spike drive",
    generalCanHaveMultiple: false,
    fittingSpikeDrive: 0
}