import { ShipWeapon } from "../interfaces/Ship";



const ShipWeapons: ShipWeapon[] = [

    {
        weaponName: "Multifocal Laser",
        weaponCost: 100000,
        weaponDamage: "1d4",
        weaponPower: 5,
        weaponMass: 1,
        weaponHardpoint: 1,
        weaponMinHullSize: "Fighter",
        weaponTechnologyLevel: 4,
        weaponQualitiesAP: 20    
    },


    {
        weaponName: "Torpedo Launcher",
        weaponCost: 100000,
        weaponAmmoCost: 2500,
        weaponDamage: "3d8",
        weaponPower: 10,
        weaponMass: 3,
        weaponHardpoint: 1,
        weaponMinHullSize: "Frigate",
        weaponTechnologyLevel: 4,
        weaponQualitiesAP: 20,
        weaponQualitiesAmmo: 4    
    },    

]