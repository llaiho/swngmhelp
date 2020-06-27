
import { Sector, StarSystem, Hex } from "../interfaces/Sector";
import { getAllSectors } from "../firebase/apiSector";
import { eventIs } from "../utils/jokiTools";
import { isProcessEvent, ProcessCycleActions } from "../utils/tools/initializationProcess";
import createSector, { CreateSectorOptions } from "../generators/createCubeSector";
import { JokiServiceApi, JokiService, JokiEvent } from "jokits";

function SectorService(serviceId: string, api: JokiServiceApi): JokiService<Sector> {
    const items: Map<string, Sector> = new Map<string, Sector>();

    function eventHandler(event: JokiEvent) {
        if (event.to === serviceId) {
            switch (event.action) {
                case "set":
                    if (event.data) {
                        setItem(event.data as Sector);
                    }
                    break;
                case "get":
                    if (event.data) {
                        return getItem(event.data);
                    }
                    break;
                case "create":
                    if (event.data) {
                        createItem(event.data as CreateSectorOptions);
                    }
                    break;
                case "del":
                    if (event.data) {
                        delItem(event.data);
                    }
                    break;
                case "load":
                    load(event.data);
                    break;
                default:
                    break;
            }
        }

        const actions = isProcessEvent(event);
        if (actions) {
            switch (actions[0]) {
                case "ServiceInitializationProcess":
                    init(actions[1]);
                    break;
                default:
                    break;
            }
        }

        // if (eventIs(event, { from: "JOKI.STATEENGINE", action: "StateChanged", data: "init" })) {
        //     console.log("Initialize Sector Service");
        //     init();
        // }
    }

    async function init(processActions: ProcessCycleActions) {
        processActions.begin(serviceId);
        await load();
        processActions.done(serviceId);
    }

    function getItem(key: string | string[]): Sector | Sector[] | undefined {
        if (!Array.isArray(key)) {
            return items.get(key);
        }

        return Array.from(items.values()).filter((i: Sector) => {
            return key.includes(i.id);
        });
    }

    function setItem(item: Sector): void {
        items.set(item.id, item);
        api.updated(itemsParser());
    }

    function createItem(options: CreateSectorOptions) {
        const [sector, hexes, starsystems]  = createSector(options);
        
        items.set(sector.id, sector);
        api.updated(itemsParser());

    }

    function delItem(itemId: string): void {
        if (items.has(itemId)) {
            items.delete(itemId);
            api.updated(itemsParser());
        }
    }

    function getState(): Sector[] {
        return itemsParser();
    }

    function itemsParser(): Sector[] {
        return Array.from(items.values());
    }

    async function load(itemId?: string) {
        const sectors = await getAllSectors();

        sectors.forEach((s: Sector) => {
            items.set(s.id, s);
        });
        api.updated(itemsParser());
        return;
    }

    return {
        eventHandler,
        getState,
    };
}

export default SectorService;
