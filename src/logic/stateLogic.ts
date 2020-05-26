import { joki, JokiState, addService, JokiEvent, config } from "jokits-react";
import { Sector, StarSystem, Planet } from "../interfaces/Sector";
import SectorService from "../services/SectorService";
import StarSystemService from "../services/StarSystemService";
import PlanetService from "../services/PlanetService";
import { Character } from "../interfaces/Npc";
import CharacterService from "../services/CharacterService";
import { createProcess } from "../utils/tools/initializationProcess";
import { initInterceptors } from "./interceptors";

const systemLogging = false;

export function stateLogic() {
    // States in the system

    // config("logger", "ON");

    joki.state.init([
        {
            state: "begin",
            validNext: ["init"],
            onNext: "init",
            initial: true,
        },
        {
            state: "busy",
            validNext: ["ready", "error", "init"],
            onNext: "ready",
            onError: "error",
        },
        {
            state: "init",
            validNext: ["ready", "error"],
            onNext: "ready",
            onError: "error",
        },
        {
            state: "ready",
            validNext: ["error", "busy"],
            onError: "error",
        },
        {
            state: "error",
            validNext: ["ready", "busy"],
            onError: "error",
            onNext: "ready",
        },
    ]);

    // Add listener for state changes
    joki.state.listen((state: JokiState) => {
        systemLogging && console.log("STATE LOGIC", state.state);

        switch (state.state) {
            case "init":
                initialize();
                break;
            default:
                break;
        }
    });

    const curState = joki.state.get();
    systemLogging && console.log("State logic started!", curState.state);

    if (curState.state === "begin") {
        begin();
    }
    // Go to next state from the begin state
    curState.next && curState.next();
}

function begin() {
    // Initialize Joki Services
    addService<Sector>({
        serviceId: "SectorService",
        service: SectorService,
    });

    addService<StarSystem>({
        serviceId: "StarSystemService",
        service: StarSystemService,
    });

    addService<Planet>({
        serviceId: "PlanetService",
        service: PlanetService,
    });

    addService<Character>({
        serviceId: "CharacterService",
        service: CharacterService,
    });
}

async function initialize() {

    try {
    console.log("Start Initialization process");
    const initProcess = createProcess("ServiceInitializationProcess");

    const servicesInitialized = await initProcess.startProcess();

    console.log("Initialization Process Done", servicesInitialized);
    
    const st = joki.state.get();

    // Initialize interceptors
    initInterceptors();

    st.next && st.next();
    
    return;
    } catch(e) {

    }
}
