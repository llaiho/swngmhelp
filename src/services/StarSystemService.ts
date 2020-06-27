
import { StarSystem } from "../interfaces/Sector";
import { JokiServiceApi, JokiService, JokiEvent } from "jokits";

function StarSystemService(serviceId: string, api: JokiServiceApi): JokiService<StarSystem> {
    const items: Map<string, StarSystem> = new Map<string, StarSystem>();

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

    function getItem(key: string | string[]): StarSystem | StarSystem[] | undefined {
        if (!Array.isArray(key)) {
            return items.get(key);
        }

        return Array.from(items.values()).filter((i: StarSystem) => {
            return key.includes(i.id);
        });
    }

    function setItem(item: StarSystem): void {
        items.set(item.id, item);
        api.updated(items);
    }

    function delItem(itemId: string): void {
        if(items.has(itemId)) {
            items.delete(itemId);
            api.updated(items);
        }
    }

    function getState(): Map<string, StarSystem> {
        return items;
    }

    return {
        eventHandler,
        getState,
    };
}

export default StarSystemService;
