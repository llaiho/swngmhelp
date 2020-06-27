import React, { FC, useState, useEffect } from "react";
import faker from "faker";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import {
    Container,
    Card,
    Button,
    Select,
    MenuItem,
    IconButton,
    Grid,
    ButtonGroup,
    CircularProgress,
    Fab,
    Switch,
} from "@material-ui/core";

import { Character, Attributes, Skill, NpcMotivation } from "../interfaces/Npc";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@material-ui/icons/Cancel";
import RefreshIcon from "@material-ui/icons/Refresh";
import CasinoIcon from "@material-ui/icons/Casino";

import AttributeContainer from "../components/AttributeContainer";
import useKeyValueListStyle from "../styles/useKeyValueListStyle";

import SKILLS from "../data/Skills";
import { MANNERS, MOTIVATION, WANT, POWER, HOOK, OUTCOME } from "../generators/npcGenerators";
import TextInput from "../components/TextInput";
import { arnd } from "../utils/randUtils";

import {
    rollHitpoints,
    getAttributeBonus,
    getBaseAttackBonus,
    getPunchAttackBonus,
    getStabAttackBonus,
    getShootAttackBonus,
    getPilotAttackBonus,
    characterIsNpc,
    characterIsWarrior,
    getHpRange,
} from "../utils/characterUtils";
import LabelValue from "../components/LabelValue";

import CharacterClassCard from "./cards/CharacterClass";
import EditableNumber from "../components/EditableNumber";
import CharacterAttributes from "./cards/CharacterAttributes";
import CharacterSkills from "./cards/CharacterSkills";
import { insertOrUpdateCharacter } from "../firebase/apiCharacters";
import FabSave from "../components/FabSave";
import { useAtomValue, trigger, once } from "jokits-react";
import useSelectedCharacter from "../hooks/useSelectedCharacter";

import "./data-view.scss";
import ButtonOptions from "../components/ButtonOptions";
import { JokiEvent } from "jokits";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            padding: "3rem 0",
            display: "flex",
            flexDirection: "row",
            "& > button": {
                marginRight: theme.spacing(2),
            },
            "& > h2": {
                color: theme.palette.primary.light,
                fontFamily: theme.typography.fontFamily,
                fontSize: "2rem",
            },
            "& > div.text-field-viewer > p": {
                color: theme.palette.primary.light,
                fontFamily: theme.typography.fontFamily,
                fontSize: "2rem",
                borderBottom: "solid 1px transparent",
                "&:hover": {
                    cursor: "pointer",
                    borderBottom: "solid 1px",

                    borderColor: theme.palette.primary.light,
                },
            },
            "& .MuiInputBase-input": {
                fontSize: "2rem",
            },

            "& > div.search": {
                marginLeft: "3rem",
            },
            "& div.editButtons": {
                flex: "1 1 auto",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                "& > button": {
                    marginLeft: theme.spacing(1),
                },
            },
        },
        partHeader: {
            margin: "2rem 0 0.5rem 0.5rem",
            paddingLeft: "0.5rem",
            position: "relative",
            color: theme.palette.primary.dark,
            fontFamily: theme.typography.fontFamily,
            fontSize: "1.6rem",
            textShadow: "-1px -1px 1px white, 1px -1px 1px white, 1px 1px 1px white, -1px 1px 1px white",
        },
        card: {
            position: "relative",
            padding: "0.5rem",
            marginBottom: theme.spacing(1),
            "&.hidden": {
                display: "none",
            },
            "& > div.actions": {
                position: "absolute",
                top: 0,
                right: 0,
                height: "2.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
            },
            "& > div.details": {
                display: "none",
                marginTop: theme.spacing(1),
                "&.open": {
                    display: "block",
                },
                "& h5": {
                    marginTop: theme.spacing(1),
                },
            },
            "& p.attributes": {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
            },
            "& span.attribute-container": {
                marginRight: theme.spacing(1),
                fontSize: "1rem",
                fontWeight: "normal",
                padding: " 0.25rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                "& > b": {
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginLeft: theme.spacing(1),
                    marginRight: theme.spacing(1),
                },
                "& > small": {
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    "&.positive": {
                        color: "#88FF88",
                    },
                    "&.negative": {
                        color: "#FF8888",
                    },
                },
                "& > span.edit-buttons": {
                    display: "inline-flex",
                    flexDirection: "column",
                    marginRight: theme.spacing(1),
                    "& > button": {
                        height: "1rem",
                        padding: 0,
                        margin: 0,
                        marginBottom: "0.25rem",
                        minWidth: "2rem",
                        "& .MuiButton-startIcon": {
                            marginRight: 0,
                            marginLeft: 0,
                        },
                        "& svg": {
                            fontSize: "1rem",
                        },
                        "&:last-child": {
                            marginBottom: 0,
                        },
                    },
                },
            },
            "& h3 > small.helpText": {
                fontSize: "0.8rem",
                fontWeight: "normal",
                fontStyle: "italic",
                display: "block",
                marginTop: "-1rem",
            },
        },
        wrapper: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: theme.spacing(1),
        },
        skillContainer: {
            flex: "1 1 auto",
            width: "20%",
            display: "flex",
            flexDirection: "row",
            padding: "0.25rem",
            alignItems: "center",
            justifyContent: "flex-start",
            "& p.skillName": {
                width: "50%",
            },
            "& p.skillValue": {
                fontSize: "1.2rem",
                fontWeight: "bold",
                width: "20%",
                padding: "0 0.25rem",
                textAlign: "center",
            },
            "& button": {
                minWidth: "2rem",
                width: "2rem",
                padding: 0,
                margin: "0 0.25rem",
                "& .MuiButton-startIcon": {
                    marginRight: 0,
                    marginLeft: 0,
                },
                "& svg": {
                    fontSize: "1rem",
                },
            },
        },

        select: {
            width: "100%",
            fontFamily: "Candara, Arial",
            marginRight: "1rem",
            fontSize: "1rem",
        },
        padder: {
            padding: "1rem 0.25rem",
        },

        ageText: {
            fontSize: "1.6rem",
            fontWeight: "bold",
        },
    })
);

const CharacterView: FC = () => {
    const [character, setCharacter] = useState<Character | undefined>(undefined);

    const [selectedCharacter, selectCharacter] = useSelectedCharacter();

    const [edited, setEdited] = useState(false);
    const [oldNpc, setOldNpc] = useState<Character | null>(null);

    const [saving, setSaving] = useState<boolean>(false);

    const classes = useStyles();
    const listStyle = useKeyValueListStyle();

    useEffect(() => {
        if (oldNpc === null) {
            if (character !== undefined) {
                setOldNpc(character);
            }
        } else {
            if (oldNpc !== character) {
                setEdited(true);
            }
        }
    }, [oldNpc, character]);

    useEffect(() => {
        setCharacter(selectedCharacter);
    }, [selectedCharacter]);

    function back() {
        // setNpcSelected(null);
        selectCharacter(undefined);
    }

    function save() {
        if (character !== undefined) {
            // setEdited(false);
            setSaving(true);
            selectCharacter(character);

            once({
                from: "CharacterService",
                action: "ItemSaved",
                fn: (e: JokiEvent) => {
                    setSaving(false);
                    setEdited(false);
                    return e.data.id === character.id;
                },
            });

            trigger({
                from: "React:CharacterView",
                to: "CharacterService",
                action: "set",
                data: character,
            });
        }
    }

    function cancel() {
        // setNpcSelected(oldNpc);
        setEdited(false);
    }

    function editMotivation(type: string, value: string) {
        if (character && character.motivation) {
            const nnpc: Character = { ...character } as Character;
            const mot: NpcMotivation = { ...nnpc.motivation };
            if (type === "initialManner") mot.initialManner = value;
            if (type === "hook") mot.hook = value;
            if (type === "power") mot.power = value;
            if (type === "motivation") mot.motivation = value;
            if (type === "want") mot.want = value;
            if (type === "defaultDealOutcome") mot.defaultDealOutcome = value;

            nnpc.motivation = mot;
            setCharacter(nnpc);
            setEdited(true);
        }
    }

    function editMainStringData(key: string, value: string) {
        // const nnpc: NonPlayerCharacter = { ...npc } as NonPlayerCharacter;

        // if (key === "description") nnpc.description = value;
        // if (key === "name") nnpc.name = value;

        setCharacter((prevState: Character | undefined) => {
            if (prevState !== undefined) {
                const nState: Character = { ...prevState, [key]: value };

                return nState;
            }
            return undefined;
        });
        setEdited(true);
    }

    function editMainNumberData(key: keyof Character, value: number) {
        console.log("EDIT NUMBER", key, value);
        setCharacter((prevState: Character | undefined) => {
            if (prevState !== undefined) {
                const nState: Character = { ...prevState };

                console.log(`Current value of ${key} is ${nState[key]}`);
                (nState[key] as any) = value;
                console.log(`New value of ${key} is ${nState[key]}`);

                return nState;
            }
            return undefined;
        });
        setEdited(true);
    }

    function getNewRandomName() {
        // faker.locale = arnd(["en", "fr", "ru", "pl", "nl", "tr", "es", "de", "ge"]);
        faker.locale = arnd(["en"]);
        let newName = "";

        if (character !== undefined && character.gender === "Male") {
            console.log("Generate Male Name");
            newName = `${faker.name.firstName(0)} ${faker.name.lastName()}`;
        } else {
            console.log("Generate Female Name");
            newName = `${faker.name.firstName(1)} ${faker.name.lastName()}`;
        }

        editMainStringData("name", newName);
    }

    function updateCharacter(character: Character): void {
        console.log("Update character", character);
        setCharacter(character);
    }

    function toggleIsNpc() {
        setCharacter((prev: Character | undefined) => {
            if (prev) {
                const nc: Character = { ...prev, isNpc: !prev.isNpc };
                return nc;
            }

            return prev;
        });
    }

    if (!character) {
        return null;
    }

    const hpRange = getHpRange(character);
    return (
        <Container className="data-view">
            <header className={classes.header}>
                <Button onClick={back} variant="contained" startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
                <TextInput
                    value={character.name}
                    onDataSave={editMainStringData}
                    dataKey="name"
                    clickToEdit={true}
                    variant="outlined"
                />
                <IconButton onClick={getNewRandomName}>
                    <RefreshIcon />
                </IconButton>
                <div className="editButtons">
                    <Button
                        onClick={cancel}
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        color="secondary"
                        disabled={!edited || saving}
                    >
                        Cancel
                    </Button>

                    <FabSave onClick={save} deactivated={!edited} saving={saving} />
                </div>
            </header>

            <Card classes={{ root: classes.card }}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    <Grid item xs={1}>
                        <Switch checked={character.isNpc} onChange={toggleIsNpc} name="isNpc" color="primary" disabled={character.charClass.length > 0}/>
                    </Grid>
                    <Grid item xs={3}>
                        {character.isNpc && <h3>Non-Player Character</h3>}
                        {!character.isNpc && <h3>Character</h3>}
                    </Grid>

                    <Grid item xs={1}>
                        <h3>Gender:</h3>
                    </Grid>
                    <Grid item xs={3}>
                        <ButtonOptions
                            value={character.gender}
                            options={["Male", "Female"]}
                            onChange={editMainStringData}
                            dataKey="gender"
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <h3>Age</h3>
                    </Grid>

                    <Grid item xs={3}>
                        <TextInput
                            dataKey="age"
                            variant="outlined"
                            value={String(character.age)}
                            onDataSave={(k: string, v: string) => editMainNumberData(k as keyof Character, Number(v))}
                            clickToEdit={true}
                            className={classes.ageText}
                        />
                    </Grid>
                </Grid>
            </Card>

            <h4 className={classes.partHeader}>Attributes</h4>
            <CharacterAttributes character={character} updateCharacter={updateCharacter} />

            {!character.isNpc && (
                <>
                    <h4 className={classes.partHeader}>Class Information</h4>
                    <CharacterClassCard character={character} updateCharacter={updateCharacter} />{" "}
                </>
            )}

            <h4 className={classes.partHeader}>Skills</h4>
            <CharacterSkills character={character} updateCharacter={updateCharacter} />

            <h4 className={classes.partHeader}>Combat Data</h4>
            <Card classes={{ root: classes.card }}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    <Grid item>
                        <h3>
                            Hitpoints: <big>{character.hitpoints}</big>{" "}
                            <IconButton onClick={() => editMainNumberData("hitpoints", rollHitpoints(character))}>
                                <CasinoIcon />
                            </IconButton>
                            <small className="helpText">
                                Ranges between {hpRange[0]} - {hpRange[1]}
                            </small>
                        </h3>
                    </Grid>
                    {characterIsNpc(character) && (
                        <Grid item>
                            <h3>
                                Hit Dice (d8)
                                <big>
                                    <EditableNumber
                                        value={character.hitDice}
                                        onEdit={(k: string, val: number) =>
                                            editMainNumberData(k as keyof Character, val)
                                        }
                                        name="hitDice"
                                    />
                                </big>
                            </h3>
                        </Grid>
                    )}
                    {!characterIsNpc(character) && (
                        <Grid item>
                            <h3>
                                {character.charClass} (d6{characterIsWarrior(character) ? "+2" : ""}):{" "}
                                <big>{character.level}</big>
                            </h3>
                        </Grid>
                    )}

                    <Grid item>
                        <h3>
                            Armour Class:{" "}
                            <big>
                                <EditableNumber
                                    value={character.armourClass}
                                    onEdit={(k: string, val: number) => editMainNumberData(k as keyof Character, val)}
                                    name="armourClass"
                                />
                            </big>
                        </h3>
                    </Grid>
                    <Grid item>
                        <h3>
                            Base Attack Bonus: <big>{getBaseAttackBonus(character)}</big>
                        </h3>
                    </Grid>

                    <Grid item>
                        <LabelValue label="Punch" value={getPunchAttackBonus(character)} />
                        <LabelValue label="Stab" value={getStabAttackBonus(character)} />
                        <LabelValue label="Shoot" value={getShootAttackBonus(character)} />
                        <LabelValue label="Pilot" value={getPilotAttackBonus(character)} />
                    </Grid>
                </Grid>
            </Card>

            

            {character.isNpc && <h4 className={classes.partHeader}>Personality & Motivations & Description</h4>}
            {character.isNpc && (
                <Card classes={{ root: classes.card }}>
                    <div className={classes.wrapper}>
                        <dl className={listStyle.root}>
                            <dd>Initial Manners:</dd>
                            <dt>
                                <Select
                                    classes={{ root: classes.select }}
                                    id="npc-motivation-manner"
                                    value={character.motivation.initialManner}
                                    onChange={(e: any) => editMotivation("initialManner", e.target.value)}
                                >
                                    {MANNERS.map((m: string) => (
                                        <MenuItem value={m} key={m}>
                                            {m}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </dt>
                            <dd>Motivation</dd>
                            <dt>
                                <Select
                                    classes={{ root: classes.select }}
                                    id="npc-motivation-motivation"
                                    value={character.motivation.motivation}
                                    onChange={(e: any) => editMotivation("motivation", e.target.value)}
                                >
                                    {MOTIVATION.map((m: string) => (
                                        <MenuItem value={m} key={m}>
                                            {m}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </dt>
                        </dl>
                        <dl className={listStyle.root}>
                            <dd>What they want</dd>
                            <dt>
                                <Select
                                    classes={{ root: classes.select }}
                                    id="npc-motivation-want"
                                    value={character.motivation.want}
                                    onChange={(e: any) => editMotivation("want", e.target.value)}
                                >
                                    {WANT.map((m: string) => (
                                        <MenuItem value={m} key={m}>
                                            {m}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </dt>
                            <dd>Power</dd>
                            <dt>
                                <Select
                                    classes={{ root: classes.select }}
                                    id="npc-motivation-power"
                                    value={character.motivation.power}
                                    onChange={(e: any) => editMotivation("power", e.target.value)}
                                >
                                    {POWER.map((m: string) => (
                                        <MenuItem value={m} key={m}>
                                            {m}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </dt>
                        </dl>
                        <dl className={listStyle.root}>
                            <dd>Hook</dd>
                            <dt>
                                <Select
                                    classes={{ root: classes.select }}
                                    id="npc-motivation-hook"
                                    value={character.motivation.hook}
                                    onChange={(e: any) => editMotivation("hook", e.target.value)}
                                >
                                    {HOOK.map((m: string) => (
                                        <MenuItem value={m} key={m}>
                                            {m}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </dt>
                            <dd>When deal is done</dd>
                            <dt>
                                <Select
                                    classes={{ root: classes.select }}
                                    id="npc-motivation-defaultDealOutcome"
                                    value={character.motivation.defaultDealOutcome}
                                    onChange={(e: any) => editMotivation("defaultDealOutcome", e.target.value)}
                                >
                                    {OUTCOME.map((m: string) => (
                                        <MenuItem value={m} key={m}>
                                            {m}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </dt>
                        </dl>
                    </div>

                    <div className={classes.padder}>
                        <TextInput
                            dataKey="description"
                            value={character.description}
                            label="Description & Notes"
                            onDataSave={editMainStringData}
                            rows={3}
                            variant="outlined"
                            multiline={true}
                            classes={{ root: classes.select }}
                        />
                    </div>
                </Card>
            )}

            <h4 className={classes.partHeader}>Possessions</h4>

            <h4 className={classes.partHeader}>Foci</h4>

            <h4 className={classes.partHeader}>Other Info</h4>
        </Container>
    );
};

export default CharacterView;
