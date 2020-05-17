import { selector } from "../utils/Recoil";
import sectorAtom from "./atomSector";
import systemAtom from "./atomSystem";


const viewModeSelector = selector({
    key: "viewMode",
    get: ({get}) => {
        const sector = get(sectorAtom);
        const system = get(systemAtom);
        if(sector === null) return "LOADING";
        if(system !== null) return "SYSTEM";

        return "SECTOR";
    }
    
});

export default viewModeSelector;
