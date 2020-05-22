import { Character, Skill } from "../interfaces/Npc";
import { rollDice, codeDiceRoll } from "./dice";

export function getAttributeBonus(attributeValue: number): number {
    if (attributeValue >= 18) return 2;
    if (attributeValue >= 14) return 1;

    if (attributeValue <= 3) return -2;
    if (attributeValue <= 7) return -1;
    return 0;
}

export function rollHitpoints(char: Character): number {
    const conBonus = getAttributeBonus(char.attributes.con);

    const isNpc = characterIsNpc(char);
    const isWarrior = characterIsWarrior(char);

    const hitDice = isNpc ? char.hitDice : char.level;

    let total = 0;
    for (let i = 0; i < hitDice; i++) {
        const dieMax = isNpc ? 8 : 6;
        const bonus = isWarrior ? conBonus + 2 : conBonus;
        const res = codeDiceRoll(1, dieMax, bonus, true);
        if (res < 1) {
            total += 1;
        } else {
            total += res;
        }
    }

    return total;
}

export function getHpRange(char: Character): [number, number] {
    const isNpc = characterIsNpc(char);
    const isWarrior = characterIsWarrior(char);

    const mult = isNpc ? char.hitDice : char.level;
    const die = isNpc ? 8 : 6;
    const warBonus = isWarrior ? 2 : 0;

    const minHp: number = mult + getAttributeBonus(char.attributes.con) + warBonus;
    const maxHp = (die + getAttributeBonus(char.attributes.con) + warBonus) * mult;
    // let maxHp = (isNpc ? char.mult * 8 : (char.level + (isWarrior ? 2 : 0)) * 6 ) + getAttributeBonus(char.attributes.con) * mult;

    return [minHp > 0 ? minHp : 1, maxHp];
}

export function getBaseAttackBonus(char: Character): number {
    // If character has classes use d6 and modifiers
    if (char.charClass !== "") {
        if (char.charClass === "Warrior") {
            return char.level;
        }
        if (char.charClass.includes("Warrior")) {
            if (char.level >= 5) {
                return Math.floor(char.level / 2) + 2;
            }
            return Math.floor(char.level / 2) + 1;
        }
        return Math.floor(char.level / 2);
    }
    // Otherwise this is an npc so use d8
    return char.hitDice;
}

export function getSkillBasedAttackBonus(char: Character, skillName: string) {
    const base = getBaseAttackBonus(char);

    const skill = char.skills.find((s: Skill) => s.name === skillName);
    if (!skill) {
        return base - 2;
    }
    return base + skill.value;
}

export function getPunchAttackBonus(char: Character): number {
    return getSkillBasedAttackBonus(char, "Punch") + getAttributeBonus(char.attributes.str);
}

export function getStabAttackBonus(char: Character, forceStr = false): number {
    const strBonus = getAttributeBonus(char.attributes.str);
    const dexBonus = getAttributeBonus(char.attributes.dex);
    const bonus = forceStr || strBonus > dexBonus ? strBonus : dexBonus;
    return getSkillBasedAttackBonus(char, "Stab") + bonus;
}

export function getShootAttackBonus(char: Character): number {
    return getSkillBasedAttackBonus(char, "Shoot") + getAttributeBonus(char.attributes.dex);
}

export function getPilotAttackBonus(char: Character): number {
    return getSkillBasedAttackBonus(char, "Pilot");
}

export function characterIsNpc(char: Character) {
    return char.charClass === "";
}

export function characterIsWarrior(char: Character) {
    return char.charClass.includes("Warrior");
}

export function characterIsPsychic(char: Character) {
    return char.charClass.includes("Psychic");
}

export function characterIsExpert(char: Character) {
    return char.charClass.includes("Expert");
}
