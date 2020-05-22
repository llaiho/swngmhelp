import { selector } from "../utils/Recoil";
import sectorAtom from "./atomSector";
import systemAtom from "./atomSystem";
import atomMainView from "./atomMainView";
import atomNpcSelection from "./atomNpcSelection";
import EncounterSelector from "../selectors/EncounterSelector";

const viewModeSelector = selector({
    key: "viewMode",
    get: ({get}) => {
        const mainView = get(atomMainView);
        const sector = get(sectorAtom);
        const system = get(systemAtom);
        const npcSelection = get(atomNpcSelection);
        const encounter = get(EncounterSelector);

        if(mainView === "map") {
            if(sector === null) return "LOADING";
            if(system !== null) return "SYSTEM";
            return "SECTOR";
        }
        
        if(mainView === "npc") {
            if(npcSelection !== null) return "NPCVIEW";
            return "NPCLIST";
        }

        if(mainView === "enc") {
            if(encounter !== null) return "ENCOUNTER";
            return "ENCOUNTERLIST";
        }

        

        return "MAIN";
    }
    
});

export default viewModeSelector;
