import { Skill } from "../interfaces/Npc";

interface SkillLock extends Skill {
    readonly name: string;
    readonly value: number;
    readonly type: "general"|"combat"|"psychic"
}

const SKILLS: SkillLock[] = [
    {
        name: "Administer",
        value: -1,
        type: "general"
    },
    {
        name: "Connect",
        value: -1,
        type: "general"
    },
    {
        name: "Exert",
        value: -1,
        type: "general"
    },
    {
        name: "Fix",
        value: -1,
        type: "general"
    },
    {
        name: "Heal",
        value: -1,
        type: "general"
    },
    {
        name: "Know",
        value: -1,
        type: "general"
    },
    {
        name: "Lead",
        value: -1,
        type: "general"
    },
    {
        name: "Notice",
        value: -1,
        type: "general"
    },
    {
        name: "Perform",
        value: -1,
        type: "general"
    },
    {
        name: "Pilot",
        value: -1,
        type: "general"
    },
    {
        name: "Program",
        value: -1,
        type: "general"
    },
    {
        name: "Sneak",
        value: -1,
        type: "general"
    },
    {
        name: "Survive",
        value: -1,
        type: "general"
    },
    {
        name: "Talk",
        value: -1,
        type: "general"
    },
    {
        name: "Trade",
        value: -1,
        type: "general"
    },
    {
        name: "Work",
        value: -1,
        type: "general"
    },
    {
        name: "Punch",
        value: -1,
        type: "combat"
    },
    {
        name: "Shoot",
        value: -1,
        type: "combat"
    },{
        name: "Stab",
        value: -1,
        type: "combat"
    },
    {
        name: "Biopsionics",
        value: -1,
        type: "psychic"
    },
    {
        name: "Metapsionics",
        value: -1,
        type: "psychic"
    },
    {
        name: "Precognition",
        value: -1,
        type: "psychic"
    },
    {
        name: "Telekinesis",
        value: -1,
        type: "psychic"
    },
    {
        name: "Telepathy",
        value: -1,
        type: "psychic"
    },
    {
        name: "Teleportation",
        value: -1,
        type: "psychic"
    }
];


export default SKILLS as Skill[];

export function getSkills(): Skill[] {
    return SKILLS.map((s: Skill) => {
        const sk: Skill = {...s} as Skill;
        sk.value= -1;
        return sk;
    })
}

export function getSkill(name: string, value=0): Skill {
    const skill = SKILLS.find((s: Skill)=> s.name === name);
    if(!skill) {
        throw new Error(`Skill ${name} not found!`);
    }
    const ns: Skill = {...skill};
    ns.value = value;
    return ns;
}