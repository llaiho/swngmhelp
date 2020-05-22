import React, { FC, useState, useEffect } from "react";
import faker from "faker";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useRecoilState, useSetRecoilState } from "../utils/Recoil";
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
} from "@material-ui/core";
import atomNpcSelection from "../atoms/atomNpcSelection";
import { Character, Attributes, Skill, NpcMotivation } from "../interfaces/Npc";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import SaveIcon from "@material-ui/icons/Save";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CancelIcon from "@material-ui/icons/Cancel";
import RefreshIcon from "@material-ui/icons/Refresh";
import CasinoIcon from "@material-ui/icons/Casino";

import AttributeContainer from "../components/AttributeContainer";
import useKeyValueListStyle from "../styles/useKeyValueListStyle";

import "./data-view.scss";
import SKILLS from "../data/Skills";
import { MANNERS, MOTIVATION, WANT, POWER, HOOK, OUTCOME } from "../generators/npcGenerators";
import TextInput from "../components/TextInput";
import npcAtoms from "../atoms/npcAtoms";
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
    })
);

const NpcView: FC = () => {
    const [npc, setNpcSelected] = useRecoilState<Character | null>(atomNpcSelection);
    const [edited, setEdited] = useState(false);
    const [oldNpc, setOldNpc] = useState<Character | null>(null);

    const [saving, setSaving] = useState<boolean>(false);

    const setNpcs = useSetRecoilState<Character[]>(npcAtoms);

    const classes = useStyles();
    const listStyle = useKeyValueListStyle();

    useEffect(() => {
        if (oldNpc === null) {
            setOldNpc(npc);
        } else {
            if (oldNpc !== npc) {
                setEdited(true);
            }
        }
    }, [oldNpc, npc]);

    function back() {
        setNpcSelected(null);
    }

    function save() {
        if (npc !== null) {
            

            // setEdited(false);
            setSaving(true);


            if(npc.firebaseId === undefined) {
                insertOrUpdateCharacter(npc).then((ids: [string, string]) => {

                    
                    setNpcs((oldNpcs: Character[]) => {
                        
                        
                        const newNpcs = [...oldNpcs];
                        const npcIndex = newNpcs.findIndex((n: Character) => n && n.id === npc.id);
                        const newNpc = {...npc, firebaseId: ids[0]};
                        newNpcs.splice(npcIndex, 1, newNpc);
                        return newNpcs;
                    });

                    setSaving(false);
                    setEdited(false)
                    
                });
            }

            

        }
    }

    function cancel() {
        // setNpcSelected(oldNpc);
        setEdited(false);
    }

    function editAttributes(name: string, value: number) {
        if (npc?.attributes) {
            const attrs: Attributes = { ...npc?.attributes } as Attributes;

            if (name === "Strength") attrs.str = value;
            if (name === "Dexterity") attrs.dex = value;
            if (name === "Constitution") attrs.con = value;
            if (name === "Intelligence") attrs.int = value;
            if (name === "Wisdom") attrs.wis = value;
            if (name === "Charisma") attrs.cha = value;

            const nnpc: Character = { ...npc } as Character;
            nnpc.attributes = attrs;
            setNpcSelected(nnpc);
            setEdited(true);
        }
    }

    function editMotivation(type: string, value: string) {
        if (npc && npc.motivation) {
            const nnpc: Character = { ...npc } as Character;
            const mot: NpcMotivation = { ...nnpc.motivation };
            if (type === "initialManner") mot.initialManner = value;
            if (type === "hook") mot.hook = value;
            if (type === "power") mot.power = value;
            if (type === "motivation") mot.motivation = value;
            if (type === "want") mot.want = value;
            if (type === "defaultDealOutcome") mot.defaultDealOutcome = value;

            nnpc.motivation = mot;
            setNpcSelected(nnpc);
            setEdited(true);
        }
    }

    function editMainStringData(key: string, value: string) {
        // const nnpc: NonPlayerCharacter = { ...npc } as NonPlayerCharacter;

        // if (key === "description") nnpc.description = value;
        // if (key === "name") nnpc.name = value;

        setNpcSelected((prevState: Character | null) => {
            if (prevState !== null) {
                const nState: Character = { ...prevState };

                if (key === "name") {
                    nState.name = value;
                }
                if (key === "description") {
                    nState.description = value;
                }

                return nState;
            }
            return null;
        });
        setEdited(true);
    }

    function editMainNumberDate(key: keyof Character, value: number) {
        console.log("EDIT NUMBER", key, value);
        setNpcSelected((prevState: Character | null) => {
            if (prevState !== null) {
                const nState: Character = { ...prevState };

                console.log(`Current value of ${key} is ${nState[key]}`);
                (nState[key] as any) = value;
                console.log(`New value of ${key} is ${nState[key]}`);

                return nState;
            }
            return null;
        });
        setEdited(true);
    }

    function getNewRandomName() {
        faker.locale = arnd(["en", "fr", "ru", "pl", "nl", "tr", "es", "de", "ge"]);
        let newName = "";

        if (npc !== null && npc.gender === "Male") {
            newName = `${faker.name.firstName(0)} ${faker.name.lastName(0)}`;
        } else {
            newName = `${faker.name.firstName(1)} ${faker.name.lastName(1)}`;
        }

        editMainStringData("name", newName);
    }

    function updateCharacter(character: Character): void {
        console.log("Update character", character);
        setNpcSelected(character);
    }

    if (npc === null) {
        return null;
    }

    const hpRange = getHpRange(npc);
    return (
        <Container className="data-view">
            <header className={classes.header}>
                <Button onClick={back} variant="contained" startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
                <TextInput
                    value={npc.name}
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

            <h4 className={classes.partHeader}>Attributes</h4>
            <CharacterAttributes character={npc} setCharacter={setNpcSelected} />

            <h4 className={classes.partHeader}>Skills</h4>

            <CharacterSkills character={npc} setCharacter={setNpcSelected} />

            <h4 className={classes.partHeader}>Combat Data</h4>
            <Card classes={{ root: classes.card }}>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    <Grid item>
                        <h3>
                            Hitpoints: <big>{npc.hitpoints}</big>{" "}
                            <IconButton onClick={() => editMainNumberDate("hitpoints", rollHitpoints(npc))}>
                                <CasinoIcon />
                            </IconButton>
                            <small className="helpText">
                                Ranges between {hpRange[0]} - {hpRange[1]}
                            </small>
                        </h3>
                    </Grid>
                    {characterIsNpc(npc) && (
                        <Grid item>
                            <h3>
                                Hit Dice (d8)
                                <big>
                                    <EditableNumber
                                        value={npc.hitDice}
                                        onEdit={(k: string, val: number) =>
                                            editMainNumberDate(k as keyof Character, val)
                                        }
                                        name="hitDice"
                                    />
                                </big>
                            </h3>
                        </Grid>
                    )}
                    {!characterIsNpc(npc) && (
                        <Grid item>
                            <h3>
                                {npc.charClass} (d6{characterIsWarrior(npc) ? "+2" : ""}): <big>{npc.level}</big>
                            </h3>
                        </Grid>
                    )}

                    <Grid item>
                        <h3>
                            Armour Class:{" "}
                            <big>
                                <EditableNumber
                                    value={npc.armourClass}
                                    onEdit={(k: string, val: number) => editMainNumberDate(k as keyof Character, val)}
                                    name="armourClass"
                                />
                            </big>
                        </h3>
                    </Grid>
                    <Grid item>
                        <h3>
                            Base Attack Bonus: <big>{getBaseAttackBonus(npc)}</big>
                        </h3>
                    </Grid>

                    <Grid item>
                        <LabelValue label="Punch" value={getPunchAttackBonus(npc)} />
                        <LabelValue label="Stab" value={getStabAttackBonus(npc)} />
                        <LabelValue label="Shoot" value={getShootAttackBonus(npc)} />
                        <LabelValue label="Pilot" value={getPilotAttackBonus(npc)} />
                    </Grid>
                </Grid>
            </Card>

            <h4 className={classes.partHeader}>Class Information</h4>
            <CharacterClassCard character={npc} setCharacter={setNpcSelected} />

            <h4 className={classes.partHeader}>Personality & Motivations & Description</h4>
            <Card classes={{ root: classes.card }}>
                <div className={classes.wrapper}>
                    <dl className={listStyle.root}>
                        <dd>Initial Manners:</dd>
                        <dt>
                            <Select
                                classes={{ root: classes.select }}
                                id="npc-motivation-manner"
                                value={npc.motivation.initialManner}
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
                                value={npc.motivation.motivation}
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
                                value={npc.motivation.want}
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
                                value={npc.motivation.power}
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
                                value={npc.motivation.hook}
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
                                value={npc.motivation.defaultDealOutcome}
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
                        value={npc.description}
                        label="Description & Notes"
                        onDataSave={editMainStringData}
                        rows={3}
                        variant="outlined"
                        multiline={true}
                        classes={{ root: classes.select }}
                    />
                </div>
            </Card>

            <h4 className={classes.partHeader}>Possessions</h4>

            <h4 className={classes.partHeader}>Foci</h4>

            <h4 className={classes.partHeader}>Other Info</h4>
        </Container>
    );
};

interface FabSaveProps {
    deactivated: boolean;
    saving: boolean;
    onClick: () => void;
}


const useFabStyle = makeStyles((theme: Theme) => createStyles({
    fabWrap: {
        position: "relative",
        margin: theme.spacing(1),
    },
    fabProgress: {
        color: "green",
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
}))

const FabSave: FC<FabSaveProps> = (props: FabSaveProps) => {

    const classes = useFabStyle();

    const statusIcon = props.saving ? <HourglassEmptyIcon /> : props.deactivated ? <DoneOutlineIcon /> : <SaveIcon />;
    return (
        <span className={classes.fabWrap}>
            <Fab onClick={props.onClick} color="primary" disabled={props.deactivated || props.saving}>
                {statusIcon}
            </Fab>
            {props.saving && <CircularProgress size={68} className={classes.fabProgress} />}
        </span>
    );
};

export default NpcView;
