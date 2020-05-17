
export interface PointOfInterestData {
    type: "system"|"planet"|"city";
    point: string;
    occupied: string[];
    situation: string[];
}

const POIS: PointOfInterestData[] = [
    {
        type: "system",
        point: "Deep-space station",
        occupied: [
            "Dangerously odd transhumans",
            "Freeze-dried ancient corpses",
            "Secretive military observers",
            "Eccentric oligarch and minions",
            "Deranged but brilliant scientist",
        ],
        situation: [
            "Systems breaking down",
            "Foreign sabotage attempt",
            "Black market for the elite",
            "Vault for dangerous pretech",
            "Supply base for pirates"
        ]
    },
    {
        type: "system",
        point: "Asteroid base",
        occupied: [
            "Zealous religious sectarians",
            "Failed rebels from another world",
            "Wage-slave corporate miners",
            "Independent asteroid prospectors",
            "Pirates masquerading as otherwise",

        ],
        situation: [
            "Life support is threatened",
            "Base needs a new asteroid",
            "Dug out something nasty",
            "Fighting another asteroid",
            "Hit a priceless vein of ore"
        ]
    },
    {
        type: "system",
        point: "Remote moon base",
        occupied: [
            "Unlucky corporate researchers",
            "Reclusive hermit genius",
            "Remnants of a failed colony",
            "Military listening post",
            "Lonely overseers and robot miners",

        ],
        situation: [
            "Something dark has awoken",
            "Criminals trying to take over",
            "Moon plague breaking out",
            "Desperate for vital supplies",
            "Rich but badly-protected"
        ]
    },
    {
        type: "system",
        point: "Ancient orbital ruin",
        occupied: [
            "Robots of dubious sentience",
            "Trigger-happy scavengers",
            "Government researchers",
            "Military quarantine enforcers",
            "Heirs of the original alien builders",

        ],
        situation: [
            "Trying to stop it awakening",
            "Meddling with strange tech",
            "Impending tech calamity",
            "A terrible secret is unearthed",
            "Fighting outside interlopers"
        ]
    },
    {
        type: "system",
        point:"Research base ",
        occupied: [
            "Experiments that have gotten loose",
            "Scientists from a major local corp",
            "Black-ops governmental researchers",
            "Secret employees of a foreign power",
            "Aliens studying the human locals"
        ],
        situation: [
            "Perilous research underway",
            "Hideously immoral research",
            "Held hostage by outsiders",
            "Science monsters run amok",
            "Selling black-market tech"
        ]
    },
    {
        type: "system",
        point:"Asteroid belt",
        occupied: [
            "Grizzled belter mine laborers",
            "Ancient automated guardian drones",
            "Survivors of destroyed asteroid base",
            "Pirates hiding out among the rocks",
            "Lonely military patrol base staff"
        ],
        situation: [
            "Ruptured rock released a peril",
            "Foreign spy ships hide there",
            "Gold rush for new minerals",
            "Ancient ruins dot the rocks",
            "War between rival rocks"
        ]
    },
    {
        type: "system",
        point:"Gas giant mine",
        occupied: [
            "Miserable gas-miner slaves or serfs",
            "Strange robots and their overseers",
            "Scientists studying the alien life",
            "Scrappers in the ruined old mine",
            "Impoverished separatist group"
        ],
        situation: [
            "Things are emerging below",
            "They need vital supplies",
            "The workers are in revolt",
            "Pirates secretly fuel there",
            "Alien remnants were found"
        ]
    },
    {
        type: "system",
        point:"Refueling station",
        occupied: [
            "Half-crazed hermit caretaker",
            "Sordid purveyors of decadent fun",
            "Extortionate corporate minions",
            "Religious missionaries to travelers",
            "Brainless automated vendors"
        ],
        situation: [
            "A ship is in severe distress",
            "Pirates have taken over",
            "Has corrupt customs agents",
            "Foreign saboteurs are active",
            "Deep-space alien signal"
        ]
    },
];

export default POIS;
