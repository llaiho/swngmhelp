import { NonPlayerCharacter } from "../interfaces/Npc";
import { getSkill } from "./Skills";

const NPCTemplates: NonPlayerCharacter[] = [
    {
        id: "",
        name: "Random Human Male Citizen",
        description: "A random person from the street.",
        gender: "Male",
        age: 25,
        possessions: [],
        
        motivation: {
            defaultDealOutcome: "",
            initialManner: "",
            hook: "",
            motivation: "",
            power: "",
            want :""
        },
        
        attributes: {
            str: 11,
            dex: 10,
            con: 11,
            int: 10,
            wis: 10,
            cha: 10
        },
        skills: [
            getSkill("Work", 1),
        ]
    },
    {
        id: "",
        name: "Random Human Female Citizen",
        description: "A random person from the street.",
        gender: "Female",
        age: 25,
        possessions: [],
        motivation: {
            defaultDealOutcome: "",
            initialManner: "",
            hook: "",
            motivation: "",
            power: "",
            want :""
        },
        attributes: {
            str: 10,
            dex: 11,
            con: 10,
            int: 10,
            wis: 10,
            cha: 11
        },
        skills: [
            getSkill("Work", 1),
        ]
    }
];

export default NPCTemplates;