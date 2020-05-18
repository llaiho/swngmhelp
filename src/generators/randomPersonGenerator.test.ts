import { randomNpcGenerator } from "./npcGenerators";


describe("npc generator", () => {

    it("simple test", () => {
        const npc =  randomNpcGenerator();

        console.log("NPC", npc);
    })
})
