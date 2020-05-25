import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { addService, addJokiStates } from "jokits-react";
import SectorService from "./services/SectorService";
import { Sector, StarSystem, Planet } from "./interfaces/Sector";
import StarSystemService from "./services/StarSystemService";
import PlanetService from "./services/PlanetService";
import { Character } from "./interfaces/Npc";
import CharacterService from "./services/CharacterService";

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

addJokiStates([
  {
    state: "busy",
    validNext: ["ready", "error"],
    onNext: "ready",
    onError: "error",
    initial: true
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
    onNext: "ready"
  },
]);

// Interceptors maybe?

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
