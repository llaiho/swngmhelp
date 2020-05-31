import { Faction, FactionTag } from "../interfaces/Factions";
import { v4 } from "uuid";
import { rnd, arnd } from "../utils/randUtils";


export default function createFaction(): Faction {


    const faction: Faction = {
        id: v4(),
        sectorId: "",
        name: "",
        assets: [],
        cunningRating: rnd(1, 8),
        forceRating: rnd(1, 8),
        wealthRating: rnd(1, 8),

        hps: 1,
        experience: 0,
        facCreds: 1,

        goals: [],

        systems: [],
        tags: [],
        events: [],
    };

    faction.hps = 4 + ratingToHps[faction.cunningRating] + ratingToHps[faction.forceRating] + ratingToHps[faction.wealthRating];

    const goal: [string, string] = arnd(factionGoals);
    faction.goals.push(goal[0]);
    faction.tags.push(arnd(factionTags));


    

    return faction;
}


const ratingToHps = [
    0,
    1,
    2,
    4,
    6,
    9,
    12,
    16,
    20
];

const factionTags: FactionTag[] = [
    {
        name: 'Colonists',
        description: 'This faction is a fresh colony on an otherwise largely untouched planet. It is this brave band of pioneers that will tame the world’s wild forces and bring forth a better life for those who come after.',
        effect: 'This faction has all the benefits of the Planetary Government tag for its homeworld, as no other government exists on a fresh colony. The faction’s homeworld is also treated as if it had at least tech level 4. Colonies with fewer than 100,000 citizens lack the necessary industrial infrastructure to build Spaceship-type assets.',
    }, {
        name: 'Deep Rooted',
        description: 'This faction has been part of a world’s life for time out of mind. Most natives can hardly imagine the world without this faction’s presence, and the traditional prerogatives and dignities of the group are instinctively respected.',
        effect: 'This faction can roll one additional d10 when defending against attacks on assets on their homeworld. If the faction ever changes homeworlds, this tag is lost.',
    }, {
        name: 'Eugenics Cult',
        description: 'The forbidden maltech secrets of advanced human genetic manipulation are known to this faction, and they use them with gusto. Slave-engineered humanoids and “deathless” leadership are just two of the more common alterations these unstable scientists undertake.',
        effect: 'Eugenics Cultists can buy the Gengineered Slaves asset; it’s an asset requiring Force 1 with the statistics of 6 HP, 2 FacCred cost, tech level 4 required, with an Attack of Force vs. Force/1d6 damage and a Counterattack of 1d4 damage. Once per turn, the Eugenics Cult can roll an extra d10 on an attack or defense by a Gengineered Slaves asset, regardless of the stat being used. Gengineered Slaves can count as either a Military Unit or Special Forces, determined when the cult first creates a specific asset.',
    }, {
        name: 'Exchange Consulate',
        description: 'This faction is either led through an Exchange Consulate or has close ties with that pacifistic society of bankers and diplomats. The sophisticated economic services they provide strengthen the faction.',
        effect: 'When the faction successfully completes a “Peaceable Kingdom” Goal, they may roll 1d6; on a 4+, they gain a bonus experience point. Once per turn, the faction may roll an extra d10 when defending against a Wealth attack.',
    }, {
        name: 'Fanatical',
        description: 'The members of this faction just don’t know when to quit. No matter how overmatched, the members will keep fighting to the bitter end- and occasionally past it.',
        effect: 'The faction always rerolls any dice that come up as 1. This zealousness leaves them open at times, however; they always lose ties during attacks.',
    }, {
        name: 'Imperialists',
        description: 'This faction nurses wild dreams of controlling the sector, whether out of an impulse to bring their local culture and technology to less fortunate worlds or simple lust for dominion. They excel at defeating planetary defenses and standing armies.',
        effect: 'This faction may roll an extra d10 for attacks made as part of a Seize Planet action.',
    }, {
        name: 'Machiavellian',
        description: 'This faction’s meat and drink is intrigue, its members delighting in every opportunity to scheme. It may be a secret cabal of hidden masters or the decadent court of a fallen stellar empire, but its membership has forgotten more of treachery than most others ever learn.',
        effect: 'Once per turn, this faction can roll an additional d10 when making a Cunning attack.',
    }, {
        name: 'Mercenary Group',
        description: 'The faction sells its services to the highest bidder, and is an extremely mobile organization. Vast amounts of men and material can be moved interstellar distances in just a few months.',
        effect: 'All faction assets gain the following special ability: As an action, the asset may move itself to any world within one hex.',
    }, {
        name: 'Perimeter Agency',
        description: 'This faction is or is closely tied to an Agency of the enigmatic Perimeter organization. Originally organized by the Terran Mandate to detect and contain maltech outbreaks until Mandate fleet resources could be dispatched, the Perimeter retains numerous ancient override codes for pretech security protocols.',
        effect: 'Once per turn, the faction may roll an additional d10 when making an attack against an asset tional d10 when making an attack against an asset that requires tech level 5 to purchase. The faction may roll an extra die when making a test to detect Stealthed assets.',
    }, {
        name: 'Pirates',
        description: 'This faction is a scourge of the spacelanes, driving up the cost of shipping and terrorizing merchant captains without pity. They steal and refit ships with vicious ingenuity, cobbling together space armadas out of the leavings of their prey.',
        effect: 'Any movement of an asset onto a world that has a Base of Influence for this faction costs one extra FacCred, paid to this faction.',
    }, {
        name: 'Planetary Government',
        description: 'This faction is the legitimate government of a planet. Rebel groups and rival factions may have assets on the planet, but control over the instruments of the state is firmly in this faction’s hands. The faction may rule openly, or it may simply have an inexorable grasp on the existing authorities.',
        effect: 'The faction’s permission is required to buy or import those assets marked as needing government permission. This tag can be acquired multiple times, once for each planet the faction controls.',
    }, {
        name: 'Plutocratic',
        description: 'This faction prizes wealth, and its membership strives constantly to expand and maintain personal fortunes. Perhaps it is a ruling council of oligarchs or a star-spanning trade cartel.',
        effect: 'Once per turn, this faction can roll an additional d10 when making a Wealth attack.',
    }, {
        name: 'Preceptor Archive',
        description: 'This faction is or has close ties to a Preceptor Archive a place of learning operated by the learned Preceptors of the Great Archive. These Archives are peaceful institutions dedicated to the spread of practical knowledge and useful engineering to the wider cosmos. Their large numbers of educated personnel make advanced equipment more practical for deployment.',
        effect: 'Purchasing an asset that requires tech level 4 or more costs one fewer FacCred than normal. The Preceptor Archive may also take the special action “Teach Planetary Population”, costing 2 FacCreds and allowing them to roll 1d12 for one world. On a 12, the world’s tech level permanently becomes 4 for the purposes and purchases of this faction.',
    }, {
        name: 'Psychic Academy',
        description: 'Most significant factions are capable of employing psychics, but this faction can actually train their own. They excel at precise and focused application of the psionic disciplines, and can get far more out of their available psychic resources than other factions.',
        effect: 'This faction can provide psionic mentor training to qualified psychics. Once per turn, this faction can also force a rival faction to reroll any one d10, whether or not they’re involved in the roll.',
    }, {
        name: 'Savage',
        description: 'Whether a proud tribe of neoprimitives struggling against the material limits of their world or a pack of degenerate tomb world cannibals, this faction is accustomed to surviving without the benefits of advanced technology and maximizing local resources.',
        effect: 'Once per turn, this faction can roll an extra die when defending with an asset that requires tech level 0 to purchase.',
    }, {
        name: 'Scavengers',
        description: 'This faction might live within the wreckage of a tomb world, salvage the castoffs of some decadent pleasure-world or ply the ruins of an orbital scrapyard. Whatever their territory, this faction knows how to find worth amid seemingly useless trash.',
        effect: 'Whenever the faction destroys an asset or has one of their assets destroyed, they gain 1 FacCred.',
    }, {
        name: 'Secretive',
        description: 'This faction is marked by elaborate protocols of secrecy and misdirection. It may be split up into numerous semi-autonomous cells, or consist largely of trained espionage professionals. Finding the assets of such a faction can often be more difficult than destroying them.',
        effect: 'All assets purchased by this faction automatically begin Stealthed. See the list of Cunning assets for details on Stealth.',
    }, {
        name: 'Technical Expertise',
        description: 'The faction is staffed by large numbers of expert engineers and scientists. They can turn even the most unpromising labor pool into superb technicians.',
        effect: 'This faction treats all planets on which they have a Base of Influence as if they were at least tech level 4. They can build Starship-type assets on any world with at least ten thousand occupants.',
    }, {
        name: 'Theocratic',
        description: 'The faction is fueled by the fierce certainty that God is with them- and with no one else. The tight and occasionally irrational obedience that pervades the organization makes it difficult to infiltrate or subvert effectively.',
        effect: 'Once per turn, this faction can roll an extra d10 when defending against a Cunning attack.',
    }, {
        name: 'Warlike',
        description: 'There are factions with a military orientation, and then there are factions that just really love killing things. Whether or not this faction has developed sophisticated military resources and techniques, the membership is zealous in battle and has a positive taste for fighting.',
        effect: 'Once per turn, this faction can roll an additional d10 when making a Force attack.d10 when making a Force attack.'
    }
];

export const factionGoals: [string, string][] = [
    ['Military Conquest', ' Destroy a number of Force assets of rival factions equal to your faction’s Force rating. Difficulty is 1/2 number of assets destroyed.'],
    ['Commercial Expansion', ' Destroy a number of Wealth assets of rival factions equal to your faction’s Wealth rating. Difficulty is 1/2 number of assets destroyed.'],
    ['Intelligence Coup', ' Destroy a number of Cunning assets of rival factions equal to your faction’s Cunning rating. Difficulty is 1/2 number of assets destroyed.'],
    ['Planetary Seizure', ' Take control of a planet, becoming the legitimate planetary government. Difficulty equal to half the average of the current ruling faction’s Force, Cunning, and Wealth ratings. If the planet somehow lacks any opposing faction to resist the seizure, it counts as Difficulty 1.'],
    ['Expand Influence', ' Plant a Base of Influence on a new planet. Difficulty 1, +1 if the attempt is contested by a rival faction.'],
    ['Blood the Enemy', ' Inflict a number of hit points of damage on enemy faction assets or bases equal to your faction’s total Force, Cunning, and Wealth ratings. Difficulty 2.'],
    ['Peaceable Kingdom', ' Don’t take an Attack action for four turns. Difficulty 1.'],
    ['Destroy the Foe', ' Destroy a rival faction. Difficulty equal to 1 plus the average of the faction’s Force, Cunning, and Wealth ratings.'],
    ['Inside Enemy Territory', ' Have a number of stealthed assets on worlds with other planetary governments equal to your Cunning score. Units that are already stealthed on worlds when this goal is adopted don’t count. Difficulty 2.'],
    ['Invincible Valor', ' Destroy a Force asset with a minimum purchase rating higher than your faction’s Force rating. Thus, if your Force is 3, you need to destroy a unit that requires Force 4 or higher to purchase. Difficulty 2.'],
    ['Wealth of Worlds', ' Spend FacCreds equal to four times your faction’s Wealth rating on bribes and influence. This money is effectively lost, but the goal is then considered accomplished. The faction’s Wealth rating must increase before this goal can be selected again. Difficulty 2.'],
];


export const cunningAssets: [string, string][] = [
    ['Base of Influence', ' This asset is special, and is required for purchasing or upgrading units on a particular world. Any damage done to a Base of Influence is also done to a faction’s hit points.The cost of a Base of Influence equals its maximum hit points, which can be any number up to the total maximum hit points of its owning faction.A faction’s bases of influence don’t count against their maximum assets.A Base of Influence can only be purchased with the Expand Influence action.'],
    ['Blackmail', ' Selectively degrade the effectiveness of an asset. Any attempt to attack or defend against Blackmail loses any bonus dice earned by tags.'],
    ['Boltholes', ' Equipped with a number of postech innovations to make cleaning them out a costly and dangerous pursuit. If a faction Special Forces or Military Unit asset on the same planet as the Boltholes suffers damage sufficient to destroy it, it is instead set at 0 HP and rendered untouchable and unusable until it is repaired to full strength. If the Boltholes are destroyed before this happens, the asset is destroyed with them.'],
    ['Book of Secrets', ' Exhaustively cataloged psychometric records on important and influential local figures, allowing uncanny accuracy in predicting their actions. Once per turn, a Book of Secrets allows the faction to reroll one die for an action taken on that world or force an enemy faction to reroll one die. This reroll can only be forced once per turn, no matter how many Books of Secrets are owned.'],
    ['Covert Shipping', ' Quiet interstellar asset transport. Any one Special Forces unit can be moved between any worlds within three hexes of the Covert Shipping at the cost of one FacCred.'],
    ['Covert Transit Net', ' Facilities web an area of space with a network of smugglers and gray-market freighter captains. As an action, any Special Forces assets can be moved between any worlds within three hexes of the Covert Transit Net.'],
    ['Cracked Comms', ' A cryptographic asset for the interception and deciphering of enemy communications. Friendly fire can be induced with the right interference. If the Cracked Comms succeeds in defending against an attack, it can immediately cause the attacking asset to make an attack against itself for normal damage or counterattack results.'],
    ['Cyberninjas', ' Outfitted with the latest in personal stealth cyberware, cyberninjas are designed to avoid all but the most careful scans.'],
    ['Demagogues', ' Popular leaders of a particular faith or ideology that can be relied upon to point their followers in the direction of maximum utility.'],
    ['False Front', ' This asset allows a faction to preserve more valuable resources. If another asset on the planet suffers enough damage to destroy it, the faction can sacrifice the false front instead to nullify the killing blow. '],
    ['Informers', ' Minions that lace a planet’s underworld, watchful for intruders. They can choose to Attack a faction without specifying a target asset. On a successful Cunning vs. Cunning attack, all Stealthed assets on the planet belonging to that faction are revealed. Informers can target a faction even if none of their assets are visible on a world; at worst, they simply learn that there are no stealthed assets.'],
    ['Lobbyists', ' Usable to block the governmental permission that is sometimes required to buy an asset or transport it into a system.When a rival faction gains permission to do so, the Lobbyists can make an immediate Cunning vs.Cunning test against the faction; if successful, the permission is withdrawn and cannot be re - attempted until next turn. '],
    ['Organization Moles ', ' These can subvert and confuse enemy assets, striking to damage their cohesion.'],
    ['Panopticon Matrix', ' These facilities weave braked-AI intelligence analysts into a web of observation capable of detecting the slightest evidence of intruders on a world. Every rival Stealthed asset on the planet must succeed in a Cunning vs. Cunning test at the beginning of every turn or lose their Stealth.The owner also gains an additional die on all Cunning attacks and defenses on that planet.'],
    ['Party Machines', ' Political blocks control particular cities or regions… blocks that are firmly in control of the faction. Each turn, a Party Machine provides 1 FacCred to its owning faction.'],
    ['Popular Movements', ' A planet-wide surge of enthusiasm for a cause controlled by the faction. This support pervades all levels of government, and the government always grants any asset purchase or movement requests made by the faction.'],
    ['Saboteurs', ' Minions rained in launching strikes against enemy operations. An asset attacked by saboteurs cannot apply any Use Asset Ability action until the start of the attacking faction’s next turn. This applies whether or not the attack was successful.'],
    ['Seditionists', ' These asset sap a target’s loyalty and will to obey. For a cost of 1d4 FacCreds, the Seditionists can attach themselves to an enemy asset. Until they attach to a different asset or no longer share the same planet, the affected asset cannot attack.If the asset is destroyed, the Seditionists survive.'],
    ['Seductresses', ' They and their male equivalents subvert the leadership of enemy assets. As an action, a Seductress can travel to any world within one hex. As an attack, a Seductress does no damage, but an asset that has been successfully attacked immediately reveals any other Stealthed assets of that faction on the planet. Only Special Forces units can attack a Seductress.can attack a Seductress.'],
    ['Smugglers', 'Men and women skilled in extracting personnel. For one FacCred, the smugglers asset can transport itself and/or any one Special Forces unit to a planet up to two hexes away.'],
    ['Stealth', 'Not an asset, per se, but a special quality that can be purchased for another Special Forces asset on the planet. An asset that has been Stealthed cannot be detected or attacked by other factions. If the unit normally requires the permission of a planetary government to be moved onto a planet, that permission may be foregone. An asset loses its Stealth if it is used to attack or defend.'],
    ['Transport Lockdown', 'These techniques involve selective pressure on local routing and shipping companies. On a successful Cunning vs. Cunning attack against a rival faction, the rival faction cannot transport assets onto that planet without spending 1d4 FacCreds and waiting one turn.'],
    ['Treachery', 'Traitors can attack an enemy asset. On a successful attack, the Treachery asset is lost, 5 FacCreds are gained, and the targeted asset switches sides to join the traitor’s faction, even if the faction does not otherwise have the attributes necessary.'],
    ['Tripwire Cells', 'These observers are alert to the arrival of stealthed units. Whenever a stealthed asset lands or is purchased on a planet with tripwire cells, the Cells make an immediate Cunning vs. Cunning attack against the owning faction. If successful, the asset loses its stealth.'],
    ['Vanguard Cadres', 'Followers of the movement are inspired sufficiently to take up arms and fight on behalf of their leadership.behalf of their leadership.']
];

export const forceAssets: [string, string][] = [
    ['Base of Influence', 'This asset is special, and is required for purchasing or upgrading units on a particular world. Any damage done to a Base of Influence is also done to a faction’s hit points. The cost of a Base of Influence equals its maximum hit points, which can be any number up to the total maximum hit points of its owning faction. A faction’s bases of influence don’t count against their maximum assets. A Base of Influence can only be purchased with the Expand Influence action.'],
    ['Beachhead Landers', 'A collection of short-range, high-capacity spike drive ships capable of moving large numbers of troops. As an action, the asset may move any number of assets on the planet, including itself, to any world within one hex at a cost of one FacCred per asset moved.'],
    ['Blockade Fleets', 'A ragtag lot of corsairs, pirates, privateers, and other deniable assets. When they successfully Attack an enemy faction asset, they steal 1d4 FacCreds from the target faction as well. This theft can occur to a faction only once per turn, no matter how many blockade fleets attack. As an action, this asset may also move itself to a world within one hex.'],
    ['Capital Fleets', 'The pride of an empire, this is a collection of massive capital warships without peer in most sectors. Capital fleets are expensive to keep flying, and cost an additional 2 FacCreds of maintenance each turn. As an action, they may move to any world within three hexes of their current location. Planetary government permission is required to raise a capital fleet, but not to move one into a system.'],
    ['Counterintel Units', 'These security units specialize in code breaking, internal security, and monitoring duties. They can crack open enemy plots long before they have time to come to fruition.'],
    ['Cunning Traps', 'This asset covers all the myriad stratagems of war, from induced landslides to spreading local diseases.'],
    ['Deep Strike Landers', 'These advanced transport ships are capable of moving an asset long distances. As an action, any one non-Starship asset, including itself, can be moved between any two worlds within three hexes of the deep strike landers, at a cost of 2 FacCreds. This movement can be done even if the local planetary government objects, albeit doing so is usually an act of open war.'],
    ['Elite Skirmishers', 'These lightly-equipped troops are trained for guerrilla warfare and quick raids.'],
    ['Extended Theater', 'These facilities allow for transporting assets long distances. As an action, any one non-Starship asset, including itself, can be moved between any two worlds within two hexes of the extended theater, at a cost of 1 FacCred.'],
    ['Gravtank Formations', 'These tank formations are composed of advanced postech gravtank units that are capable of covering almost any terrain and cracking even the toughest defensive positions.'],
    ['Guerrilla Populace', 'Such assets reflect popular support among the locals and a cadre of men and women willing to fight as partisans.'],
    ['Hardened Personnel', 'These are the employees and support staff of the faction that have been trained in defensive fighting and equipped with supply caches and hardened fallback positions.'],
    ['Heavy Drop Assets', 'These craft allow for the transport of resources from one world to another. As an action, any one non-Starship asset, including this one, may be moved to any world within one hex for one FacCred.'],
    ['Hitmen', 'Crudely-equipped thugs and assassins with minimal training that have been aimed at a rival faction’s leadership.'],
    ['Integral Protocols', 'A complex web of braked-AI supported sensors and redundant security checks used to defeat attempts to infiltrate an area. They can defend only against attacks versus Cunning, but they add an additional die to the defender’s roll.'],
    ['Militia Units', 'Groups of lightly-equipped irregular troops with rudimentary military training but no heavy support.'],
    ['Planetary Defenses', 'Massive mag cannons and gravitic braker gun arrays designed to defend against starship bombardments and repel unauthorized landing. Planetary defenses can only defend against attacks by Starship-type assets.'],
    ['Postech Infantry', 'The backbone of most planetary armies, these well-trained soldiers are usually equipped with mag weaponry and combat field uniforms, and have heavy support units attached.'],
    ['Pretech Infantry', 'The cream of the stellar ground forces, elite troops kitted out in the best pretech weaponry and armor available, with sophisticated heavy support weaponry integral to the unit.'],
    ['Pretech Logistics', 'These assets represent caches, smugglers, or internal research and salvage programs. As an action, a pretech logistics asset allows the owner to buy one Force asset on that world that requires up to tech level 5 to purchase. This asset costs half again as many FacCreds as usual, rounded up. Only one asset can be purchased per turn.'],
    ['Psychic Assassins', 'Combat-trained psychics equipped with advanced pretech stealth gear and psitech weaponry. Psychic assassins automatically start Stealthed when purchased.'],
    ['Security Personnel', 'Standard civilian guards or policemen, usually equipped with nonlethal weaponry or personal sidearms.or personal sidearms.'],
    ['Space Marines', 'Heavily-armored specialist troops trained for ship boarding actions and opposed landings. As an action, they can move to any world within one hex of their current location, whether or not the planetary government permits it.'],
    ['Strike Fleets', 'Forces composed of frigate or cruiser-class vessels equipped with space-to-ground weaponry and sophisticated defenses against light planetary weaponry. As an action, they can move to any world within one hex of their current location.'],
    ['Zealots', 'Members of the faction so utterly dedicated that they are willing to launch suicide attacks or hold positions to the death. Zealots take 1d4 damage every time they launch a successful attack or perform a counterattack.AssetHPCostTLTypeAttackCounterNote']
];

export const wealthAssets: [string, string][] = [
    ['Bank Assets', 'Once per turn, the faction can ignore one cost or FacCred loss imposed by another faction. This does not require an action. Multiple bank assets allow multiple losses to be ignored.'],
    ['Base of Influence', 'These follow the standard rules for Bases of Influence.'],
    ['Blockade Runners', 'These starship captains excel at transporting goods through unfriendly lines. As an action, a blockade runner can transfer itself or any one Military Unit or Special Forces to a world within three hexes for a cost of two FacCreds. They can even move units that would otherwise require planetary government permission to enter.'],
    ['Commodities Brokers', 'They substantially lessen the cost of large-scale investments by timing materials purchases properly. As an action, the owner of a commodities broker can roll 1d8; that many FacCreds are subtracted from the cost of their next asset purchase, down to a minimum of half normal price, rounded down.'],
    ['Franchise', 'This asset reflects a deniable connection with a local licensee for the faction’s goods and services. When a Franchise successfully attacks a enemy asset, the enemy faction loses one FacCred (if available), which is gained by the Franchise’s owner. This loss can happen only once a turn, no matter how many Franchises attack.'],
    ['Freighter Contract', 'A special link with heavy shipping spacers. As an action, the faction may move any one non-Force asset, including this one, to any world within two hexes at a cost of one FacCred.'],
    ['Harvesters', 'These gather the natural resources of a world, whether ore, biologicals, or other unprocessed goods. As an action, the Harvesters’ owning faction may roll 1d6. On 3+, gain one FacCred.'],
    ['Hostile Takeover', 'This asset can seize control of damaged and poorly-controlled assets. If a Hostile Takeover does enough damage to destroy an asset, the target is instead reduced to 1 hit point and acquired by the Hostile Takeover’s owning faction.'],
    ['Laboratory', 'The lab allows a world to make hesitant progress in tech. The presence of a Laboratory allows assets to be purchased on that world as if it had Tech Level 4.'],
    ['Lawyers', 'Sophists in immaculate suits or charismatic tribal skalds, lawyers have the ability to tie an enemy up in the coils of their own internal rules, damaging assets with confusion and red tape. Lawyers cannot attack or counterattack Force assets.'],
    ['Local Investments', 'These give the faction substantial influence over the commerce on a world. Any other faction that tries to buy an asset on that planet must pay one extra FacCred. This money is not given to the investments’ owner, but is lost. This penalty is only applied once.'],
    ['Marketers', 'Deployed to confuse enemy factions into untimely investments. As an action, the marketers may test Cunning vs. Wealth against a rival faction’s asset. If successful, the target faction must immediately pay half the asset’s purchase cost, rounded down, or have it become disabled and useless until this price is paid.'],
    ['Medical Center', 'Salvage and repair damaged assets. Once between turns, if a Special Forces or Military Unit asset on the world is destroyed, the faction may immediately pay half its purchase cost to restore it with one hit point. Any Repair Asset action taken on that world costs one less FacCred for Special Forces and Military Units.'],
    ['Mercenaries', 'Groups of well-equipped, highly-trained soldiers willing to serve the highest bidder. Mercenaries have a maintenance cost of one FacCred per turn. As an action, Mercenaries can move to any world within one hex of their current location. To purchase or move a Mercenary asset to a planet requires government permission.'],
    ['Monopoly', 'An open or tacit stranglehold on certain vital businesses or resources on a world. As an action, owners of a monopoly may force one other faction with unstealthed assets on that world to pay them one FacCred. If the target faction can’t pay, they lose one asset of their choice on the world.'],
    ['Postech Industry', 'As an action, the owning faction can roll 1d6 for a Postech Industry asset. On a 1, one FacCred is lost, on a 2-4 one FacCred is earned, and a 5-6 returns two FacCreds. If money is lost and no resources are available to pay it, the Postech Industry is destroyed.'],
    ['Pretech Manufactories', 'Rare, precious examples of functioning pretech industrial facilities, retrofitted to work without the benefit of specialized psychic disciplines. As an action, the owning faction can roll 1d8 for a Pretech Manufactory, and gain half that many FacCreds, rounded up.'],
    ['Pretech Researchers', 'A highly versatile team of research and design specialists capable of supporting limited pretech… as long as they’re adequately funded. Any world with Pretech Researchers on it is treated as tech level 5 for the purpose of buying Cunning and Wealth assets. Pretech researchers have a maintenance cost of 1 FacCred per turn.'],
    ['R%26D Departments', 'These allow the smooth extension of wealth-creation and industrial principles to the farthest reaches of the faction’s operations. A faction with an R%26D department may treat all planets as having tech level 4 for purposes of buying Wealth assets.'],
    ['Scavenger Fleets', 'These rag-tag armadas bring enormous technical and mercantile resources to their patrons, along with a facility with heavy guns. As patrons, along with a facility with heavy guns. As an action, a Scavenger Fleet can be moved to any world within three hexes. Scavenger Fleets cost 2 FacCreds a turn in maintenance.'],
    ['Shipping Combine', 'Transport large amounts of equipment and personnel between worlds. As an action, the combine may move any number of non-Force assets, including itself, to any world within two hexes at a cost of one FacCred per asset.'],
    ['Surveyors', 'Explore potential resource and investment options on worlds. The presence of a Surveyor crew allows one additional die to be rolled on Expand Influence actions. As an action, a surveyor crew can be moved to any world within two hexes.'],
    ['Transit Web', 'These facilities allow almost effortless relocation of all assets. For one FacCred, any number of non-starship Cunning or Wealth assets may be moved between any two worlds within three hexes of the Transit Web. This may be done freely on the owner’s turn so long as the fee can be paid, and using the ability doesn’t require an action.'],
    ['Union Toughs', 'These bruisers don’t much like scabs and management, and they’re willing to take the faction’s word on which people are which. They’re lightly armed and poorly trained, but they can infiltrate to perform sabotage.'],
    ['Venture Capital', 'This asset grows resources out of seemingly nowhere, harvesting the best of entrepreneurship for the faction’s benefit. As an action, venture capital can be tapped. 1d8 is rolled; on a 1, the asset is destroyed, while on a 2-3 one FacCred is gained, 4-7 yields two FacCreds and 8 grants three FacCreds.three FacCreds.']
];

