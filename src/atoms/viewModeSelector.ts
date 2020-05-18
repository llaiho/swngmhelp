import { selector } from "../utils/Recoil";
import sectorAtom from "./atomSector";
import systemAtom from "./atomSystem";
import atomMainView from "./atomMainView";
import atomNpcSelection from "./atomNpcSelection";


const viewModeSelector = selector({
    key: "viewMode",
    get: ({get}) => {
        const mainView = get(atomMainView);
        const sector = get(sectorAtom);
        const system = get(systemAtom);
        const npcSelection = get(atomNpcSelection);

        if(mainView === "map") {
            if(sector === null) return "LOADING";
            if(system !== null) return "SYSTEM";
        }
        
        if(mainView === "npc") {
            if(npcSelection !== null) return "NPCVIEW";
            return "NPCLIST";
        }

        return "SECTOR";
    }
    
});

export default viewModeSelector;
