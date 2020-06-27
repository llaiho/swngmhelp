
import { Planet } from "../interfaces/Sector";
import { JokiServiceApi, JokiService, JokiEvent } from "jokits";

function PlanetService(serviceId: string, api: JokiServiceApi): JokiService<Planet> {
    const items: Map<string, Planet> = new Map<string, Planet>();

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

    function getItem(key: string | string[]): Planet | Planet[] | undefined {
        if (!Array.isArray(key)) {
            return items.get(key);
        }

        return Array.from(items.values()).filter((i: Planet) => {
            return key.includes(i.id);
        });
    }

    function setItem(item: Planet): void {
        items.set(item.id, item);
        api.updated(items);
    }

    function delItem(itemId: string): void {
        if(items.has(itemId)) {
            items.delete(itemId);
            api.updated(items);
        }
    }

    function getState(): Map<string, Planet> {
        return items;
    }

    return {
        eventHandler,
        getState,
    };
}

export default PlanetService;
