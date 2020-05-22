import { selector } from "../utils/Recoil";

import encounterSelectAtom from "../atoms/encounterSelectAtom";
import encounterAtoms from "../atoms/encounterAtoms";

import { Encounter } from "../interfaces/Encounter";


const EncounterSelector = selector({
    key: "EncounterSelector",
    get: ({get}): Encounter|null => {
        const encounterId: string = get(encounterSelectAtom);
        const encounters: Encounter[] = get(encounterAtoms);


        const enc: Encounter|undefined = encounters.find((enc: Encounter) =>  enc.id === encounterId);

        if(enc !== undefined) {
            return enc;
        }

        return null;
    }
});

export default EncounterSelector;