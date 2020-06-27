
import { isProcessEvent, ProcessCycleActions } from "../utils/tools/initializationProcess";
import { JokiServiceApi, JokiService, JokiEvent } from "jokits";

export default function StarShipService(serviceId: string, api: JokiServiceApi): JokiService<any> {
    const items: Map<string, any> = new Map<string, any>();

    function eventHandler(event: JokiEvent) {
        if (event.to === serviceId) {
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
    }

    async function init(processActions: ProcessCycleActions) {
        processActions.begin(serviceId);
    
        setTimeout( () => {
            processActions.done(serviceId);
        }, 200);
        
    }

    function getState(): any[] {
        return Array.from(items.values());
    }

    return {
        eventHandler,
        getState,
    };
}
