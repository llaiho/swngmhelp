import { PrimaryPlanet, StarSystem, Tag, Atmosphere, Temperature, Biosphere, Population, TechLevel, GeneralPlanet, Planet, GeneralPlanetType, SecondaryPlanet } from "../interfaces/Sector";
import { v4 as uuidv4 } from 'uuid';
import { rnd, arnd } from "../utils/randUtils";
import { TAGS } from '../data/Tags';

const createPlanet = (system: StarSystem): PrimaryPlanet => {

    const planet: PrimaryPlanet = {
        id: uuidv4(),
        name: `${system.name} Prime`,
        planetGenre: "primary",
        description: "",
        starsystemId: system.id,
        tags: new Set<Tag>(),
        atmosphere: arnd([Atmosphere.Corrosive, Atmosphere.Inert, Atmosphere.Airless, Atmosphere.Breathable, Atmosphere.Breathable, Atmosphere.Breathable, Atmosphere.Breathable, Atmosphere.Breathable, Atmosphere.Thick, Atmosphere.Invasive, Atmosphere.Hostile]),
        temperature: arnd([Temperature.Frozen, Temperature.Cold, Temperature.VarCold, Temperature.VarCold, Temperature.Temperate, Temperature.Temperate, Temperature.Temperate, Temperature.VarWarm, Temperature.VarWarm, Temperature.Warm, Temperature.Burning]),
        biosphere: arnd([Biosphere.Remnant, Biosphere.Microbial, Biosphere.No, Biosphere.No, Biosphere.HumanMiscible, Biosphere.HumanMiscible, Biosphere.HumanMiscible, Biosphere.Immiscible, Biosphere.Immiscible, Biosphere.Hybrid, Biosphere.Engineered]),
        population: arnd([Population.Failed, Population.Outpost, Population.Small, Population.Small, Population.Medium, Population.Medium, Population.Medium, Population.Large, Population.Large, Population.Massive, Population.Alien]),
        techLevel: arnd([TechLevel.TL0, TechLevel.TL1, TechLevel.TL2, TechLevel.TL2, TechLevel.TL4, TechLevel.TL4, TechLevel.TL4, TechLevel.TL3, TechLevel.TL3, TechLevel.TL4p, TechLevel.TL5]),
        POIs: []
    }


    while (planet.tags.size < 2) {
        planet.tags.add(arnd(TAGS));
    }

    // console.log(Array.from(planet.tags).map(t => t.name).join(", "));

    return planet;
};



export const createSecondaryPlanet = (system: StarSystem): Planet => {

    
    // const type = arnd(["Toxic", "Barren", "Gas Giant", "Rock", "Radiated"]);

    const planetCount = system.planets.length;

    // const pType: PlanetType | undefined = planetTypes.find((p: PlanetType) => p.key === type);

    // if (!pType) throw new Error(`Planet Types is missing type ${type}`);

    const planet: SecondaryPlanet = {
        id: uuidv4(),
        name: `${system.name} ${planetCount + 1}`,
        description: ``,
        planetGenre: "secondary",
        starsystemId: system.id,
        tags: new Set<Tag>(),
        atmosphere: arnd([Atmosphere.Corrosive, Atmosphere.Inert, Atmosphere.Airless, Atmosphere.Breathable, Atmosphere.Breathable, Atmosphere.Breathable, Atmosphere.Breathable, Atmosphere.Breathable, Atmosphere.Thick, Atmosphere.Invasive, Atmosphere.Hostile]),
        temperature: arnd([Temperature.Frozen, Temperature.Cold, Temperature.VarCold, Temperature.VarCold, Temperature.Temperate, Temperature.Temperate, Temperature.Temperate, Temperature.VarWarm, Temperature.VarWarm, Temperature.Warm, Temperature.Burning]),
        biosphere: arnd([Biosphere.Remnant, Biosphere.Microbial, Biosphere.No, Biosphere.No, Biosphere.HumanMiscible, Biosphere.HumanMiscible, Biosphere.HumanMiscible, Biosphere.Immiscible, Biosphere.Immiscible, Biosphere.Hybrid, Biosphere.Engineered]),
        population: arnd([Population.Failed, Population.Outpost, Population.Small, Population.Small, Population.Medium, Population.Medium, Population.Medium, Population.Large, Population.Large, Population.Massive, Population.Alien]),
        techLevel: arnd([TechLevel.TL0, TechLevel.TL1, TechLevel.TL2, TechLevel.TL2, TechLevel.TL4, TechLevel.TL4, TechLevel.TL4, TechLevel.TL3, TechLevel.TL3, TechLevel.TL4p, TechLevel.TL5]),
        origin: arnd(["Recent colony from the primary world", "Refuge for exiles from primary", "Founded ages ago by a different group", "Founded long before the primary world", "Lost ancient colony of the primary", "Colony recently torn free of the primary", "Long-standing cooperative colony world", "Recent interstellar colony from elsewhere"]),
        currentRelationsToPrimary: arnd(["Confirmed hatred of each other", "Active cold war between them", "Old grudges or resentments", "Cultural disgust and avoidance", "Polite interchange and trade", "Cultural admiration for primary", "Long-standing friendship", "Unflinching mutual loyalty"]),
        contactPoint: arnd(["Trade in vital goods", "Shared religion", "Mutual language", "Entertainment content", "Shared research", "Threat to both of them", "Shared elite families", "Exploiting shared resource"]),
        POIs: []
    };

    while (planet.tags.size < 2) {
        planet.tags.add(arnd(TAGS));
    }
    
    return planet;

}

interface PlanetType {
    key: string;
    atmos: Atmosphere[],
    temp: Temperature[],
    bio: Biosphere[],
}


export const createGeneralPlanet = (system: StarSystem): Planet => {

    

    const planet: GeneralPlanet = {
        id: uuidv4(),
        name: `${system.name} ${system.planets.length + 1}`,
        description: "",
        planetGenre: "general",
        POIs: [],
        planetType: arnd([GeneralPlanetType.Barren, GeneralPlanetType.GasGiant, GeneralPlanetType.Radiation, GeneralPlanetType.Rock, GeneralPlanetType.Toxic]),
        starsystemId: system.id
    };

    return planet;
}

const planetTypes: PlanetType[] = [
    {
        key: "Toxic",
        atmos: [Atmosphere.Hostile, Atmosphere.Hostile, Atmosphere.Corrosive, Atmosphere.Inert],
        temp: [Temperature.Burning, Temperature.Warm, Temperature.Frozen, Temperature.Cold],
        bio: [Biosphere.No, Biosphere.No, Biosphere.No, Biosphere.Microbial, Biosphere.Remnant]
    },
    {
        key: "Barren",
        atmos: [Atmosphere.Airless, Atmosphere.Airless, Atmosphere.Invasive, Atmosphere.Corrosive, Atmosphere.Inert],
        temp: [Temperature.Frozen, Temperature.Cold, Temperature.VarCold, Temperature.Temperate, Temperature.VarWarm, Temperature.Warm, Temperature.Burning],
        bio: [Biosphere.No, Biosphere.No, Biosphere.No, Biosphere.Microbial]
    },
    {
        key: "Rock",
        atmos: [Atmosphere.Airless],
        temp: [Temperature.Frozen, Temperature.Cold, Temperature.VarCold, Temperature.Temperate, Temperature.VarWarm, Temperature.Warm, Temperature.Burning],
        bio: [Biosphere.No, Biosphere.No, Biosphere.No, Biosphere.Microbial]
    },
    {
        key: "Radiated",
        atmos: [Atmosphere.Airless, Atmosphere.Corrosive, Atmosphere.Invasive, Atmosphere.Hostile, Atmosphere.Hostile, Atmosphere.Inert],
        temp: [Temperature.Frozen, Temperature.Cold, Temperature.VarCold, Temperature.Temperate, Temperature.VarWarm, Temperature.Warm, Temperature.Burning],
        bio: [Biosphere.No, Biosphere.No, Biosphere.No, Biosphere.Microbial, Biosphere.Remnant]
    },
    {
        key: "Gas Giant",
        atmos: [Atmosphere.Corrosive, Atmosphere.Invasive, Atmosphere.Hostile, Atmosphere.Hostile, Atmosphere.Thick, Atmosphere.Inert],
        temp: [Temperature.Frozen, Temperature.Cold, Temperature.VarCold, Temperature.Temperate, Temperature.VarWarm, Temperature.Warm, Temperature.Burning],
        bio: [Biosphere.No, Biosphere.No, Biosphere.No, Biosphere.Microbial, Biosphere.Remnant]
    },
]

export default createPlanet;