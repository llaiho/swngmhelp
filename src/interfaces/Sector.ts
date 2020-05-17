

export interface Sector {
    id: string;
    name: string;
    stars: StarSystem[];
    rows: number;
    columns: number;
    density: string;

}


export interface CubeSector {
    id: string;
    name: string;
    stars: StarSystem[];
    hexes: Hex[],
    rings: number;
    density: string;
}

export interface StarSystem {
    id: string;
    name: string;
    position: [number, number, number?];
    inHex?: string;

    routes: string[];

    planets: Planet[];

    star: Star[];

    POIs: PointOfInterest[]
}

export interface Hex {
    x: number;
    y: number;
    z: number;
    type?: string;
    id: string;
}


export type StarSize = "dwarf"|"small"|"average"|"large"|"giant";

export enum Atmosphere {
    Corrosive = "Corrosive",
    Inert = "Inert",
    Airless = "Airless or Thin",
    Breathable = "Breathable",
    Thick = "Thick",
    Invasive = "Invasive",
    Hostile = "Invasive and Corrosive"
};

export enum Temperature {
    Frozen = "Frozen",
    Cold = "Cold",
    VarCold = "Variable Cold",
    Temperate = "Temperate",
    VarWarm = "Variable Warm",
    Warm = "Warm",
    Burning = "Burning"
};


export enum Biosphere {
    Remnant = "Remnant",
    Microbial = "Microbial",
    No = "No biosphere",
    HumanMiscible = "Human-miscible",
    Immiscible = "Immiscible",
    Hybrid = "Hybrid",
    Engineered = "Engineered",
};

export enum Population {
    None = "No population",
    Failed = "Failed Colony",
    Outpost = "Outpost",
    Small = "Fewer than a million inhabitants",
    Medium = "Several million inhabitants",
    Large = "Hundreds of millions inhabitants",
    Massive = "Billions of inhabitants",
    Alien = "Alien Inhabitants"
};

export enum TechLevel {
    TL0 = "Neolithic tech",
    TL1 = "Medieval tech",
    TL2 = "Early Industrial Age tech",
    TL3 = "21st century tech",
    TL4 = "Modern Postech",
    TL4p = "Modern Postech with specialities",
    TL5 = "Pretech with infra",
    TLA = "Alien tech",
    TLN = "No tech",
};

export interface Star {
    id: string;
    color: string;
    size: StarSize,
}

export interface Planet {
    id: string;
    name: string;

    planetGenre: "primary"|"secondary"|"general";

    starsystemId: string;

    description: string;

    POIs: PointOfInterest[];
}

export interface PrimaryPlanet extends Planet{

    tags: Set<Tag>;

    atmosphere: Atmosphere;
    temperature: Temperature;
    biosphere: Biosphere;
    population: Population;
    techLevel: TechLevel;

    
}

export interface SecondaryPlanet extends Planet {
    
    tags: Set<Tag>;

    atmosphere: Atmosphere;
    temperature: Temperature;
    biosphere: Biosphere;
    population: Population;
    techLevel: TechLevel;
    
    origin: string;
    currentRelationsToPrimary: string;
    contactPoint: string;
}

export enum GeneralPlanetType {
    Rock = "Rock",           // Moon
    Barren = "Barren",       // Mars
    Toxic = "Toxic",         // Venus
    Radiation = "Radiation", // Merkurius
    GasGiant = "Gas Giant"
}   

export interface GeneralPlanet extends Planet {
    
    planetType: GeneralPlanetType;

    
}

export interface Tag {
    name: string;
}

export interface PointOfInterest {
    id: string;
    name: string;
    point: string;
    occupied: string;
    situation: string;
    previousSituations: string[];
}
