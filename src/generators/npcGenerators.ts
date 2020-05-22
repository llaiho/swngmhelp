import {
    Character,
    NpcMotivation,
    Possession,
    Skill,
    NonPlayerCharacterTemplate,
    Adjust,
    randomRange,
    Customizer,
} from "../interfaces/Npc";
import { v4 } from "uuid";
import { arnd, rnd, arnds, roll, grnd } from "../utils/randUtils";
import { TechLevel } from "../interfaces/Sector";

import faker from "faker";

import SKILLS from "../data/Skills";
import { rollDice } from "../utils/dice";
import { getAttributeBonus, rollHitpoints } from "../utils/characterUtils";

interface PossessionGeneratorOptions {
    techlevel?: TechLevel;
    wealthLevel?: number;
    weapons?: boolean;
}

export function randomNpcGenerator(): Character {
    const npc: Character = {
        id: v4(),
        name: "Generated Random Person",
        gender: arnd(["Male", "Female"]),
        age: grnd(40, 10, 5, 18, 80),
        attributes: {
            str: grnd(11, 7, 1, 3, 18),
            dex: grnd(11, 7, 1, 3, 18),
            con: grnd(11, 7, 1, 3, 18),
            int: grnd(11, 7, 1, 3, 18),
            wis: grnd(11, 7, 1, 3, 18),
            cha: grnd(11, 7, 1, 3, 18),
        },
        skills: [],
        motivation: motivationGenerator(),
        description: "",
        possessions: possessionGenerator({ wealthLevel: rnd(1, 10) }),
        hitpoints: 0,
        attackBonus: 0,
        hitDice: 1,
        armourClass: 10,
        charClass: "",
        level: 0,

    };

    // Roll hps
    npc.hitpoints = rollHitpoints(npc);

    // Name

    faker.locale = arnd(["en", "fr", "ru", "pl", "nl", "tr", "es", "de", "ge"]);
    if (npc.gender === "Male") {
        npc.name = `${faker.name.firstName(0)} ${faker.name.lastName(0)}`;
    } else {
        npc.name = `${faker.name.firstName(1)} ${faker.name.lastName(1)}`;
    }

    // random non-combat skills
    let maxSkills = 3;
    if (npc.age > 50) maxSkills++;
    if (npc.age < 25) maxSkills--;
    if (npc.attributes) {
        if (npc.attributes.int > 12) maxSkills++;
        if (npc.attributes.int > 15) maxSkills++;
        if (npc.attributes.int > 17) maxSkills++;
        if (npc.attributes.wis > 15) maxSkills++;
        if (npc.attributes.int < 8) maxSkills--;
        if (npc.attributes.int < 5) maxSkills--;
        if (npc.attributes.wis < 8) maxSkills--;
    }

    if (maxSkills < 1) maxSkills = 1;

    const gSkills = arnds(
        SKILLS.filter((s: Skill) => s.type === "general"),
        rnd(1, maxSkills),
        true
    );
    npc.skills = gSkills.map((s: Skill) => {
        const ns: Skill = { ...s };
        let val = 0;
        while (roll(60 - val * 15)) {
            val++;
        }
        ns.value = val;
        return ns;
    });

    // May have combat skills
    if (roll(30)) {
        npc.skills.push(randomCombatSkill(rnd(0, 1)));
    }

    npc.description = generateDescription(npc);

    return npc;
}

export function generateDescription(npc: Character): string {
    const genderPron: string = npc.gender === "Male" ? "He" : "She";

    function rndHairColor() {
        return arnd(["blond", "blond", "brown", "brown", "dark", "dark", "reddish", "gray", "white"]);
    }
    const descr = `${genderPron} is${arnd([
        " a tiny",
        " a short",
        " a short",
        "",
        "",
        "",
        " a tall",
        " a tall",
        " a very tall",
    ])}${arnd([
        " extremely thin",
        " thin",
        " slender",
        "",
        "",
        "",
        " round",
        " overweight",
        " bulky",
        " athletic",
        " muscular",
    ])} ${npc.gender.toLowerCase()} with ${arnd([
        "no hair",
        rndHairColor() + " short crew cut",
        rndHairColor() + " short messy hair",
        rndHairColor() + " short clean hair",
        "a " + rndHairColor() + " ponytail",
        rndHairColor() + " long curls",
        "a colorful mohawk",
    ])}.`;

    return descr;
}

/**
 * Generate a new NPC from template
 *
 * @param tmpl
 */
export function generateNpcFromTemplate(tmpl: NonPlayerCharacterTemplate): Character {
    const npc = randomNpcGenerator();
    return overlayTemplateToNpc(npc, tmpl);
}

/**
 * Adjust existing Npc with a template
 *
 * @param npc
 * @param tmpl
 */
export function overlayTemplateToNpc(npc: Character, tmpl: NonPlayerCharacterTemplate): Character {
    const newNpc = { ...npc };

    function adjust(val: Adjust, orig: number): number {
        return orig + val.amount;
    }

    function range(val: randomRange): number {
        return rnd(val.min, val.max);
    }

    function options<T>(val: T[]): T {
        return arnd(val);
    }

    function numberOrRange(val: number | randomRange): number {
        if (typeof val === "number") return val;
        return range(val);
    }

    function numberOrAdjust(val: number | Adjust, orig: number): number {
        if (typeof val === "number") return val;
        return adjust(val, orig);
    }

    function custom<T>(val: Customizer<T>, orig: T, npc: Character): T {
        if (typeof val.fn === "function") {
            return val.fn(npc);
        }

        if (val.options && val.options.length > 0) {
            return arnd(val.options);
        }

        return orig;
    }

    function customNumber(val: Customizer<number>, orig: number, npc: Character): number {
        if (typeof val.fn === "function") {
            return val.fn(npc);
        }

        if (typeof orig === "number" && typeof val.adjust === "number") {
            return adjust({amount: val.adjust}, orig);
            
        }

        if (typeof orig === "number" && typeof val?.range?.min === "number") {
            return range(val.range);
        }

        if (val.options && val.options.length > 0) {
            return arnd(val.options);
        }

        return orig;
    }

    function numberOrCustom(val: number | Customizer<number>, orig: number, npc: Character): number {
        if (typeof val === "number") return val;
        return customNumber(val, orig, npc);
    }

    // Adjust age
    if (tmpl.age) {
        newNpc.age = numberOrRange(tmpl.age);
    }

    // Adjust Gender
    if (tmpl.gender) {
        newNpc.gender = tmpl.gender;
        newNpc.description = generateDescription(newNpc);
    }

    if (!newNpc.attributes) {
        newNpc.attributes = {
            str: 11,
            dex: 11,
            con: 11,
            int: 11,
            wis: 11,
            cha: 11,
        };
    }

    if (tmpl.str) newNpc.attributes.str = numberOrCustom(tmpl.str, newNpc.attributes.str, newNpc);
    if (tmpl.dex) newNpc.attributes.dex = numberOrCustom(tmpl.dex, newNpc.attributes.dex, newNpc);
    if (tmpl.con) newNpc.attributes.con = numberOrCustom(tmpl.con, newNpc.attributes.con, newNpc);
    if (tmpl.int) newNpc.attributes.int = numberOrCustom(tmpl.int, newNpc.attributes.int, newNpc);
    if (tmpl.wis) newNpc.attributes.wis = numberOrCustom(tmpl.wis, newNpc.attributes.wis, newNpc);
    if (tmpl.cha) newNpc.attributes.cha = numberOrCustom(tmpl.cha, newNpc.attributes.cha, newNpc);
    
    // Add combat skills
    if(tmpl.combatSkills) {
        
        // Remove existing combat skills
        const nSkills: Skill[] = newNpc.skills ? newNpc.skills.filter((s: Skill) => s.type !== "combat") : [];
        
        if(typeof tmpl.combatSkills === "number") {
                
            const allCombatSkills = SKILLS.filter((s: Skill) => s.type === "combat");
            arnds(allCombatSkills, tmpl.combatSkills, true).forEach((s: Skill) => {
                s.value = rnd(0,2);
                nSkills.push(s);
            });

        }

        



        newNpc.skills = nSkills;
    }

    return newNpc;
}

/**
 * Generate possesions
 *
 * @param options
 */
export function possessionGenerator(options: PossessionGeneratorOptions): Possession[] {
    const possessions: Possession[] = [];

    const wealthPow = options.wealthLevel !== undefined ? options.wealthLevel * options.wealthLevel : 4;
    const minCred = wealthPow * 5;
    const maxCred = wealthPow * 20;

    possessions.push({
        name: "Credits",
        amount: rnd(minCred, maxCred),
    });

    return possessions;
}

export function randomSkill(type: string, value?: number) {
    const s: Skill = { ...arnd(SKILLS.filter((s: Skill) => s.type === type)) };
    if (value) {
        s.value = value;
    } else {
        s.value = rnd(0, 2);
    }
    return s;
}

export function randomGeneralSkill(value?: number): Skill {
    return randomSkill("general", value);
}

export function randomCombatSkill(value?: number): Skill {
    return randomSkill("combat", value);
}

export function motivationGenerator(): NpcMotivation {
    const mot: NpcMotivation = {
        initialManner: arnd(MANNERS),
        defaultDealOutcome: arnd(OUTCOME),
        motivation: arnd(MOTIVATION),
        hook: arnd(HOOK),
        power: arnd(POWER),
        want: arnd(WANT),
    };

    return mot;
}

export const MANNERS: string[] = [
    "Ingratiating and cloying",
    "Grim suspicion of the PCs or their backers",
    "Xenophilic interest in the novelty of the PCs",
    "Pragmatic and businesslike",
    "Romantically interested in one or more PCs",
    "A slimy used-gravcar dealer’s approach",
    "Wide-eyed awe at the PCs",
    "Cool and superior attitude toward PC “hirelings”",
    "Benevolently patronizing toward outsiders",
    "Sweaty-palmed need or desperation",
    "Xenophobic mistrust of the PCs",
    "Idealistic enthusiasm for a potentially shared cause",
    "Somewhat intoxicated by recent indulgence",
    "Smoothly persuasive and reasonable",
    "Visibly uncomfortable with the PCs",
    "Grossly overconfident in PC abilities",
    "Somewhat frightened by the PCs",
    "Deeply misunderstanding the PCs’ culture",
    "Extremely well-informed about the PCs’ past",
    "Distracted by their current situation",
];

export const OUTCOME: string[] = [
    "They’ll screw the PCs over even at their own cost",
    "They firmly intend to actively betray the PCs",
    "They won’t keep the deal unless driven to it",
    "They plan to twist the deal to their own advantage",
    "They won’t keep their word unless it’s profitable",
    "They’ll flinch from paying up when the time comes",
    "They mean to keep the deal, but are reluctant",
    "They’ll keep most of the deal, but not all of it",
    "They’ll keep the deal slowly and grudgingly",
    "They’ll keep the deal but won’t go out of their way",
    "They’ll be reasonably punctual about the deal",
    "They’ll want a further small favor to pay up on it",
    "They’ll keep the deal in a way that helps them",
    "They’ll keep the deal if it’s still good for them",
    "They’ll offer a bonus for an additional favor",
    "Trustworthy as long as the deal won’t hurt them",
    "Trustworthy, with the NPC following through",
    "They’ll be very fair in keeping to their agreements",
    "They’ll keep bargains even to their own cost",
    "Complete and righteous integrity to the bitter end",
];

export const MOTIVATION: string[] = [
    "An ambition for greater social status",
    "Greed for wealth and indulgent riches",
    "Protect a loved one who is somehow imperiled",
    "A sheer sadistic love of inflicting pain and suffering",
    "Hedonistic enjoyment of pleasing company",
    "Searching out hidden knowledge or science",
    "Establishing or promoting a cultural institution",
    "Avenging a grievous wrong to them or a loved one",
    "Promoting their religion and living out their faith",
    "Winning the love of a particular person",
    "Winning glory and fame in their profession",
    "Dodging an enemy who is pursuing them",
    "Driving out or killing an enemy group",
    "Deposing a rival to them in their line of work",
    "Getting away from this world or society",
    "Promote a friend or offspring’s career or future",
    "Taking control of a property or piece of land",
    "Building a structure or a complex prototype tech",
    "Perform or create their art to vast acclaim",
    "Redeem themselves from a prior failure",
];

export const WANT: string[] = [
    "Bring them an exotic piece of tech",
    "Convince someone to meet with the NPC",
    "Kill a particular NPC",
    "Kidnap or non-fatally eliminate a particular NPC",
    "Pay them a large amount of money",
    "Take a message to someone hard to reach",
    "Acquire a tech component that’s hard to get",
    "Find proof of a particular NPC’s malfeasance",
    "Locate a missing NPC",
    "Bring someone to a destination via dangerous travel",
    "Retrieve a lost or stolen object",
    "Defend someone from an impending attack",
    "Burn down or destroy a particular structure",
    "Explore a dangerous or remote location",
    "Steal something from a rival NPC or group",
    "Intimidate a rival into ceasing their course of action",
    "Commit a minor crime to aid the NPC",
    "Trick a rival into doing something",
    "Rescue an NPC from a dire situation",
    "Force a person or group to leave an area",
];

export const POWER: string[] = [
    "They’re just really appealing and sympathetic to PCs",
    "They have considerable liquid funds",
    "They control the use of large amounts of violence",
    "They have a position of great social status",
    "They’re a good friend of an important local leader",
    "They have blackmail info on the PCs",
    "They have considerable legal influence here",
    "They have tech the PCs might reasonably want",
    "They can get the PCs into a place they want to go",
    "They know where significant wealth can be found",
    "They have information about the PCs’ current goal",
    "An NPC the PCs need has implicit trust in them",
    "The NPC can threaten someone the PCs like",
    "They control a business relevant to PC needs",
    "They have considerable criminal contacts",
    "They have pull with the local religion",
    "They know a great many corrupt politicians",
    "They can alert the PCs to an unexpected peril",
    "They’re able to push a goal the PCs currently have",
    "They can get the PCs useful permits and rights",
];

export const HOOK: string[] = [
    "A particular odd style of dress",
    "An amputation or other maiming",
    "Visible cyberware or prosthetics",
    "Unusual hair, skin, or eye colors",
    "Scarring, either intentional or from old injuries",
    "Tic-like overuse of a particular word or phrase",
    "Specific unusual fragrance or cologne",
    "Constant fiddling with a particular item",
    "Visible signs of drug use",
    "Always seems to be in one particular mood",
    "Wears badges or marks of allegiance to a cause",
    "Extremely slow or fast pace of speech",
    "Wheezes, shakes, or other signs of infirmity",
    "Constantly with a drink to hand",
    "Always complaining about a group or organization",
    "Paranoid, possibly for justifiable reasons",
    "Insists on a particular location for all meetings",
    "Communicates strictly through a third party",
    "Abnormally obese, emaciated, tall, or short",
    "Always found with henchmen or friends",
];
