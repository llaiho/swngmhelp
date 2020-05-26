import { JokiEvent, JokiInternalApi } from "jokits";
import { addInterceptor } from "jokits-react";
import { Sector, StarSystem } from "../interfaces/Sector";
import { Character } from "../interfaces/Npc";

function sectorSelectionInterceptor(event: JokiEvent, api: JokiInternalApi): JokiEvent {
    console.log("Sector selected", event);

    if (event.data) {
        const sector: Sector = event.data as Sector;

        // Set Atom SelectedSector
        api.setAtom<Sector>("SelectedSector", sector);
        api.setAtom("ViewMode", "SECTOR");
    }

    return event;
}

function sectorUpdateOnSelectedSectorInterceptor(event: JokiEvent, api: JokiInternalApi): JokiEvent {
    if (event.data && event.data.id) {
        if (api.hasAtom("SelectedSector")) {
            const sectorAtom = api.getAtom<Sector>("SelectedSector");
            const sector: Sector = sectorAtom.get();
            if (event.data.id === sector.id) {
                console.log("Currently selected sector has updated!");
                sectorAtom.set(event.data as Sector);
            }
        }
    }

    return event;
}


function systemSelectionInterceptor(event: JokiEvent, api: JokiInternalApi): JokiEvent {
    console.log("System selected", event);

    if (event.data) {
        const system: StarSystem = event.data as StarSystem;
        // Set Atom SelectedSector
        api.setAtom<StarSystem|undefined>("SelectedSystem", system);
        api.setAtom("ViewMode", "SYSTEM");
    }
    if(event.data === undefined) {
        api.setAtom<StarSystem|undefined>("SelectedSystem", undefined);
        api.setAtom("ViewMode", "SECTOR");
    }

    return event;
}


export function initInterceptors() {
    // addInterceptor({
    //     action: "SectorSelected",
    //     fn: sectorSelectionInterceptor,
    // });

    // addInterceptor({
    //     action: "SelectStarSystem",
    //     fn: systemSelectionInterceptor,
    // });

    addInterceptor({
        from: "SectorService",
        action: "ServiceStateUpdated",
        fn: sectorUpdateOnSelectedSectorInterceptor,
    });
}
