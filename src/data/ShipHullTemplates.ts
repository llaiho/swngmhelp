import { ShipHull, ShipHullSize, Tag1 } from "../interfaces/Ship";


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



export const name1 : Tag1[] = [
    {name: "Black" }, 
    {name: "Green"},
    {name: "Red"},
    {name: "Golden"},
    {name: "White"},
    {name: "Blue"},
    {name: "Dripping"},
    {name: "Wet"},
    {name: "Drunken"},
    {name: "Tipsy"},
    {name: "Welcome"},
    {name: "Scurvy"},
    {name: "Rusty"},
    {name: "Dizzy"},
    {name: "Hungry"},
    {name: "Thirsty"},
    {name: "Sleeping"},
    {name: "Twisted"},
    {name: "Spinning"},
    {name: "Dancing"} 
]

export const name2 : Tag1[] = [ 
    {name: "Dog" }, 
    {name: "Horse"},
    {name: "Rat"},
    {name: "Fish"},
    {name: "Giant"},
    {name: "Dragon"},
    {name: "Vampire"},
    {name: "Elf"},
    {name: "Gnome"},
    {name: "Dwarf"},
    {name: "Orc"},
    {name: "Halfling"},
    {name: "Fool"},
    {name: "Wench"},
    {name: "Thug"},
    {name: "Pirate"},
    {name: "Priest"},
    {name: "Boot"},
    {name: "Bucket"},
    {name: "Tankard"} 
]