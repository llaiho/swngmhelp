import { rnd, reps } from "./randUtils";

export function d4(): number {
    return rnd(1, 4);
}

export function d6(): number {
    return rnd(1, 6);
}

export function d8(): number {
    return rnd(1, 8);
}

export function d10(): number {
    return rnd(1, 10);
}

export function d12(): number {
    return rnd(1, 12);
}

export function d20(): number {
    return rnd(1, 20);
}

export function d100(): number {
    return rnd(1, 100);
}

/**
 * Roll a single die type return the total value
 *
 * Formula is [numberOfDice][dieType][adjuster] ie.
 * d6       roll a single d6
 * 3d10     Roll three d10's
 * 2d8+3    Rolld three d8's, sum the results and add +3 to it
 *
 */
export function rollDice(formula: string): number {
    const f = formula.trim().toLowerCase().replace(/ /g, "");

    // Get multiplier
    const mSplit = f.split("d", 2);
    const multiplier = mSplit[0].length > 0 ? Number(mSplit[0]) : 1;

    // Split for additional adjustments
    const adjSplit = mSplit[1].replace(/\+/g, ",+").replace(/\-/g, ",-").split(",");

    // Get proper die function
    const die = `d${adjSplit.shift()}`;
    const dief = getDieFunction(die);
    
    // Sum up all adjustments
    const adjustment = adjSplit.reduce((tot: number, cur:string): number => {
        tot += Number(cur);
        return tot;
    }, 0);

    // Let the dice roll!
    let res = 0;
    for(let i = 0; i < multiplier;i++) {
        res += dief();
    }
    return res + adjustment;
}

export function rollDicePool(formulas: string[]): [number, [string, number][]] {

    const diceResults: [string, number][] = [];

    let total = 0;
    formulas.forEach((rollFormula: string) => {
        const res = rollDice(rollFormula);
        diceResults.push([rollFormula, res]);
        total += res;
    });

    return [total, diceResults];
}

export function codeDiceRoll(multiplier: number, die: number, adjust=0, adjustPerDie=false): number {
    
    let tot = 0;
    for(let r = 0; r < multiplier; r++) {
        tot += rnd(1, die);
        if(adjustPerDie) {
            tot += adjust;
        }
    }
    if(!adjustPerDie) {
        tot += adjust;
    }
    return tot;

}

function getDieFunction(d: string): () => number {
    switch (d) {
        case "d4":
            return d4;
        case "d6":
            return d6;
        case "d8":
            return d8;
        case "d10":
            return d10;
        case "d12":
            return d12;
        case "d20":
            return d20;
        default:
            throw new Error(`Uknown die ${d}!`);
    }
}
