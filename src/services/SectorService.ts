import { JokiServiceApi, JokiEvent, JokiService } from "jokits-react";
import { Sector } from "../interfaces/Sector";

function SectorService(serviceId: string, api: JokiServiceApi): JokiService<Sector> {
    const items: Map<string, Sector> = new Map<string, Sector>();

    function eventHandler(event: JokiEvent) {
        if (event.to === serviceId) {
            switch (event.action) {
                case "set":
                    if (event.data) {
                        setItem(event.data);
                    }
                    break;
                case "get":
                    if (event.data) {
                        return getItem(event.data);
                    }

                    break;
                case "del":
                    if (event.data) {
                        delItem(event.data);
                    }
                    break;
                default:
                    break;
            }
        }
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
        api.updated(items);
    }

    function delItem(itemId: string): void {
        if(items.has(itemId)) {
            items.delete(itemId);
            api.updated(items);
        }
    }

    function getState(): Map<string, Sector> {
        return items;
    }

    return {
        eventHandler,
        getState,
    };
}

export default SectorService;
