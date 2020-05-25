import { JokiServiceApi, JokiEvent, JokiService } from "jokits-react";
import { Character } from "../interfaces/Npc";


function CharacterService(serviceId: string, api: JokiServiceApi): JokiService<Character> {
    const items: Map<string, Character> = new Map<string, Character>();

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

    function getItem(key: string | string[]): Character | Character[] | undefined {
        if (!Array.isArray(key)) {
            return items.get(key);
        }

        return Array.from(items.values()).filter((i: Character) => {
            return key.includes(i.id);
        });
    }

    function setItem(item: Character): void {
        items.set(item.id, item);
        api.updated(items);
    }

    function delItem(itemId: string): void {
        if(items.has(itemId)) {
            items.delete(itemId);
            api.updated(items);
        }
    }

    function getState(): Map<string, Character> {
        return items;
    }

    return {
        eventHandler,
        getState,
    };
}

export default CharacterService;
