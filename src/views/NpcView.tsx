import React, { FC, useState, useEffect } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useRecoilState } from "../utils/Recoil";
import { Container, Card, Button, Select, MenuItem, TextField } from "@material-ui/core";
import atomNpcSelection from "../atoms/atomNpcSelection";
import { NonPlayerCharacter, Attributes, Skill, NpcMotivation } from "../interfaces/Npc";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import AttributeContainer from "../components/AttributeContainer";
import useKeyValueListStyle from "../styles/useKeyValueListStyle";

import "./data-view.scss";
import sectorAtom from "../atoms/atomSector";
import { CubeSector } from "../interfaces/Sector";
import SKILLS from "../data/Skills";
import { MANNERS, MOTIVATION, WANT, POWER, HOOK, OUTCOME } from "../generators/npcGenerators";
import TextInput from "../components/TextInput";

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

                    borderColor: theme.palette.primary.light
                }
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
        }
    })
);

const NpcView: FC = () => {
    const [npc, setNpcSelected] = useRecoilState<NonPlayerCharacter | null>(atomNpcSelection);
    const [edited, setEdited] = useState(false);
    const [oldNpc, setOldNpc] = useState<NonPlayerCharacter | null>(null);
    const [sector, setSector] = useRecoilState<CubeSector>(sectorAtom);

    const classes = useStyles();
    const listStyle = useKeyValueListStyle();

    useEffect(() => {
        if (oldNpc === null) {
            setOldNpc(npc);
        }
    }, [oldNpc, npc]);

    function back() {
        setNpcSelected(null);
    }

    function save() {
        if (npc !== null) {
            const sec: CubeSector = { ...sector } as CubeSector;
            const npcs: NonPlayerCharacter[] = [...sec.npcs];
            const npcIndex = npcs.findIndex((n: NonPlayerCharacter) => n && n.id === npc.id);
            npcs.splice(npcIndex, 1, npc);
            sec.npcs = npcs;
            setSector(sec);
            setEdited(false);
        }
    }

    function cancel() {
        setNpcSelected(oldNpc);
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

            const nnpc: NonPlayerCharacter = { ...npc } as NonPlayerCharacter;
            nnpc.attributes = attrs;
            setNpcSelected(nnpc);
            setEdited(true);
        }
    }

    function editSkill(skill: Skill) {
        console.log("edit skill", skill);
        if (npc && npc.skills) {
            const skills: Skill[] = npc.skills.filter((s: Skill) => s.name !== skill.name);
            skills.push(skill);

            const nnpc: NonPlayerCharacter = { ...npc } as NonPlayerCharacter;
            nnpc.skills = skills.filter((s: Skill) => s.value > -1);

            setNpcSelected(nnpc);
            setEdited(true);
        }
    }

    function editMotivation(type: string, value: string) {
        if (npc && npc.motivation) {
            const nnpc: NonPlayerCharacter = { ...npc } as NonPlayerCharacter;
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
        const nnpc: NonPlayerCharacter = { ...npc } as NonPlayerCharacter;

        if (key === "description") nnpc.description = value;
        if (key === "name") nnpc.name = value;

        setNpcSelected(nnpc);
        setEdited(true);
    }

    if (npc === null) {
        return null;
    }

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
                <div className="editButtons">
                    <Button
                        onClick={cancel}
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        color="secondary"
                        disabled={!edited}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={save}
                        variant="contained"
                        startIcon={<DoneOutlineIcon />}
                        color="primary"
                        disabled={!edited}
                    >
                        Save
                    </Button>
                </div>
            </header>

            {npc.attributes && (
                <>
                    <h4 className={classes.partHeader}>Attributes</h4>
                    <Card classes={{ root: classes.card }}>
                        <p className="attributes">
                            <AttributeContainer name="Strength" value={npc.attributes.str} onEdit={editAttributes} />
                            <AttributeContainer name="Dexterity" value={npc.attributes.dex} onEdit={editAttributes} />
                            <AttributeContainer
                                name="Constitution"
                                value={npc.attributes.con}
                                onEdit={editAttributes}
                            />
                            <AttributeContainer
                                name="Intelligence"
                                value={npc.attributes.int}
                                onEdit={editAttributes}
                            />
                            <AttributeContainer name="Wisdom" value={npc.attributes.wis} onEdit={editAttributes} />
                            <AttributeContainer name="Charisma" value={npc.attributes.cha} onEdit={editAttributes} />
                        </p>
                    </Card>
                </>
            )}

            <h4 className={classes.partHeader}>Skills</h4>
            <Card classes={{ root: classes.card }}>
                <div className={classes.wrapper}>
                    {SKILLS.map((s: Skill) => {
                        if (npc.skills) {
                            const npcSkill = npc.skills.find((ns: Skill) => ns.name === s.name);
                            if (npcSkill) {
                                return <SkillContainer skill={npcSkill} key={npcSkill.name} onEdit={editSkill} />;
                            }
                        }
                        return <SkillContainer skill={s} key={s.name} onEdit={editSkill} />;
                    })}
                </div>
            </Card>

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
                        classes={{root: classes.select}}
                    />
                </div>
            </Card>

            <h4 className={classes.partHeader}>Possessions</h4>

            <h4 className={classes.partHeader}>Foci</h4>

            <h4 className={classes.partHeader}>Other Info</h4>
        </Container>
    );
};

interface SkillContainerProps {
    skill: Skill;
    onEdit?: (skill: Skill) => void;
}

const SkillContainer: FC<SkillContainerProps> = (props: SkillContainerProps) => {
    const skill = props.skill;
    const charHasSkill = skill.value > -1;
    const editMode = props.onEdit !== undefined;

    const classes = useStyles();

    function plusOne() {
        if (props.onEdit && skill.value < 4) {
            const ns: Skill = { ...skill } as Skill;
            ns.value++;
            props.onEdit(ns);
        }
    }

    function minusOne() {
        if (props.onEdit && skill.value > -1) {
            const ns: Skill = { ...skill } as Skill;
            ns.value--;
            props.onEdit(ns);
        }
    }

    return (
        <div className={classes.skillContainer}>
            {editMode && (
                <Button
                    startIcon={<ExposureNeg1Icon />}
                    className="minusButton"
                    disabled={skill.value < 0}
                    variant="contained"
                    color="primary"
                    onClick={minusOne}
                />
            )}
            <p className="skillName">{skill.name}</p>
            <p className="skillValue">{charHasSkill ? skill.value : "-"}</p>
            {editMode && (
                <Button
                    startIcon={<ExposurePlus1Icon />}
                    className="plusButton"
                    disabled={skill.value === 4}
                    variant="contained"
                    color="primary"
                    onClick={plusOne}
                />
            )}
        </div>
    );
};

export default NpcView;
