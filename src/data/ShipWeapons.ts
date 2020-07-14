import { ShipWeapon, ShipHullSize } from "../interfaces/Ship";



export const ShipWeapons: ShipWeapon[] = [

    {
        weaponName: "Multifocal Laser",
        generalCost: 100000,
        generalCostHullSizeMultiplier: false,
        weaponDamage: "1d4",
        generalPowerModifier: 5,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 1,
        generalMassHullSizeMultiplier: false,
        weaponHardpoint: 1,
        generalHullSizes: [ShipHullSize.Fighter, ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        weaponTechnologyLevel: 4,
        weaponQualitiesAP: 20    
    },


    {
        weaponName: "Torpedo Launcher",
        generalCost: 100000,
        generalCostHullSizeMultiplier: false,
        weaponAmmoCost: 2500,
        weaponDamage: "3d8",
        generalPowerModifier: 10,
        generalPowerHullSizeMultiplier: false,
        generalMassModifier: 3,
        generalMassHullSizeMultiplier: false,
        weaponHardpoint: 1,
        generalHullSizes: [ShipHullSize.Frigate, ShipHullSize.Cruiser, ShipHullSize.Capital],
        weaponTechnologyLevel: 4,
        weaponQualitiesAP: 20,
        weaponQualitiesAmmo: 4    
    },    

]