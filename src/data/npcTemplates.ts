import { NonPlayerCharacterTemplate } from "../interfaces/Npc";
import { getSkill } from "./Skills";

const NPCTemplates: NonPlayerCharacterTemplate[] = [
    {
        templateName: "Random Young Adult Human Male",
        age: {min: 18, max: 28},
        gender: "Male",
    },
    
        
];

export default NPCTemplates;