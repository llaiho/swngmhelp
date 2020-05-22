import { randomNpcGenerator, generateNpcFromTemplate } from "./npcGenerators";
import { reps } from "../utils/randUtils";
import { Character, NonPlayerCharacterTemplate } from "../interfaces/Npc";
import { codeDiceRoll } from "../utils/dice";

describe("npc generator", () => {
    xit("simple test", () => {
        const npc = randomNpcGenerator();
        console.log("NPC", npc);
    });

    it("Test Templates", () => {
        const res: Character[] = [];

        const tmpl: NonPlayerCharacterTemplate = {
            templateName: "TestTemplate",
            combatSkills: 2,
        };

        reps(1, (): void => {
            const npc = generateNpcFromTemplate(tmpl);
            res.push(npc);
        });

        res.forEach((r) => {
            console.log(r.name, r.skills);
        });
    });

   it("Testing interfaces", () => {
        interface Maybe {
            alpha?: number;
            beta?: number;
        }

        const val: Maybe = {
            alpha: 1,
        };

        function getNum(key: keyof Maybe, source: Maybe, def: number): number {
            const val: number | undefined = source[key];
            return val !== undefined ? val : def;
        }
        const n = getNum("alpha", val, 0);

        console.log("N:", n);
        expect(n).toBe(1);
    });

    it("Through away object", () => {

        interface HashStore {
            [key: string]: any;
        }

        const val: HashStore = {
            foo: 1,
            bar: "BAR"
        };

        const k: string = "foo";

        expect(val[k]).toBe(1);

    })

    it("Testin dynamic interface injection", () => {

        interface Data {
            alpha: number;
            beta: string;
        };

        const key = "alpha";

        const d: Data = {
            alpha: 2,
            beta: "foo",
        };

        d.alpha++;
        expect(d.alpha).toBe(3);
        d["alpha"]--;
        expect(d.alpha).toBe(2);

        d[key]++;
        expect(d.alpha).toBe(3);
        
        function modData(k: keyof Data, dat: Data, val: number) {
            if(typeof dat[k] === typeof val) {
                dat[k] = val;
                return dat;
            }
            
            
        }

        const nd = modData("alpha", d, 6);
        expect(nd.alpha).toBe(6);
    });

    fit("Test die roller", () => {

        const res: number[] = [];
        reps(10000, () => {
            const r = codeDiceRoll(2, 8, 2, true);
            if(res[r] === undefined) {
                res[r] = 0;
            }
            res[r]++;
        });

        console.table(res);

        
        

    })

});
