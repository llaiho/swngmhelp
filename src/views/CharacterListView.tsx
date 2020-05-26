import React, { FC, useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, Input, TextField, Card, IconButton } from "@material-ui/core";

import { Sector, FullSector } from "../interfaces/Sector";
import { Character, Skill, NonPlayerCharacterTemplate } from "../interfaces/Npc";

import NPCTemplates from "../data/npcTemplates";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings";

import { randomNpcGenerator, overlayTemplateToNpc } from "../generators/npcGenerators";
import useKeyValueListStyle from "../styles/useKeyValueListStyle";

import AttributeContainer from "../components/AttributeContainer";

import { rollDice, rollDicePool } from "../utils/dice";
import { useService, trigger } from "jokits-react";
import useSelectedCharacter, { useChangeSelectedCharacter } from "../hooks/useSelectedCharacter";

import "./data-view.scss";
// Die testing

// console.log("DIE TEST", rollDicePool( ["d20", "d8+2"] ) );

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            padding: "3rem 0",
            display: "flex",
            flexDirection: "row",
            "& > h2": {
                color: theme.palette.primary.light,
                fontFamily: theme.typography.fontFamily,
                fontSize: "2rem",
            },
            "& > div.search": {
                marginLeft: "3rem",
            },
        },
        partHeader: {
            margin: "2rem 0 0.5rem 0.5rem",
            paddingLeft: "0.5rem",
            position: "relative",
            color: theme.palette.primary.dark,
            fontFamily: theme.typography.fontFamily,
            fontSize: "1.6rem",
            borderLeft: "solid 1rem rgba(255,255,255,0.5)",

            borderTopLeftRadius: "1rem 1rem",
            borderBottomLeftRadius: "1rem 1rem",
            textShadow: "-1px -1px 1px white, 1px -1px 1px white, 1px 1px 1px white, -1px 1px 1px white",
        },
        card: {
            position: "relative",
            padding: "0.5rem",
            marginBottom: theme.spacing(1),

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
            "& span.attribute-container": {
                marginRight: theme.spacing(1),
                fontSize: "0.7rem",
                fontWeight: "normal",
                "& > b": {
                    fontSize: "1rem",
                    fontWeight: "bold",
                },
                "& > small": {
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    "&.positive": {
                        color: "#88FF88",
                    },
                    "&.negative": {
                        color: "#FF8888",
                    },
                },
            },
            "&.template": {
                backgroundColor: theme.palette.grey[600],
            },
        },
        wrapper: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: theme.spacing(1),
            "& > dl": {
                flex: "1 1 auto",
                maxWidth: "50%",
            },
        },

        skill: {
            "& > span": {
                marginRight: theme.spacing(1),
            },
            "&.general": {
                color: "#CCC",
            },
            "&.combat": {
                color: "red",
            },
            "&.psychic": {
                color: "purple",
            },
        },
    })
);

const CharacterListView: FC = () => {
    const [npcs, send] = useService<Character[]>("CharacterService");

    const selectCharacter = useChangeSelectedCharacter();

    // const [npcs, setNpcs] = useRecoilState(npcAtoms);
    const [searchKey, setSearchKey] = useState("");
    const classes = useStyles();

    function generateRandomNpc() {
        send("createRandom");
    }

    function createNpcFromTemplate(action: string, npcTemplate: NonPlayerCharacterTemplate) {
        send("createRandom", npcTemplate);
    }

    function openNpcEditor(type: string, npc: Character) {
        selectCharacter(npc);
    }

    function updateSearchKey(e: any) {
        const val = e.target.value;
        setSearchKey(val);
    }

    if (!npcs) {
        return null;
    }

    const activeNpcs: Character[] =
        searchKey.length > 0 && npcs !== undefined
            ? npcs.filter((n: Character) => {
                  if (n.name.includes(searchKey)) return true;
                  if (n.gender.includes(searchKey)) return true;
                  if (n.description.includes(searchKey)) return true;

                  return false;
              })
            : npcs;

    return (
        <Container className="data-view">
            <header className={classes.header}>
                <h2>Non Player Characters</h2>
                <div className="search">
                    <TextField value={searchKey} label="Search" variant="outlined" onChange={updateSearchKey} />
                </div>
            </header>

            <h4 className={classes.partHeader}>Current NPCs</h4>
            {activeNpcs.length === 0 && <p style={{ color: "white" }}>No NPCs currently in the sector.</p>}
            {activeNpcs.map((npc: Character) => {
                const title: string = `${npc.name}, ${npc.gender}, ${npc.age} years old`;
                return <NpcCard npc={npc} key={npc.id} title={title} actionIcon="edit" action={openNpcEditor} />;
            })}

            <h4 className={classes.partHeader}>NPC Templates</h4>

            <Card classes={{ root: classes.card }}>
                <p>
                    <b>Fully random NPC character</b>
                </p>
                <div className="actions">
                    <IconButton onClick={generateRandomNpc}>
                        <PersonAddIcon />
                    </IconButton>
                </div>
            </Card>

            {NPCTemplates.map((npc: NonPlayerCharacterTemplate) => (
                <NpcTemplateCard npc={npc} key={npc.templateName} action={createNpcFromTemplate} />
            ))}
        </Container>
    );
};

interface NpcCardProps {
    npc: Character;
    action?: (type: string, npc: Character) => void;
    actionIcon?: string;
    title?: string;
}

const NpcCard: FC<NpcCardProps> = (props: NpcCardProps) => {
    const classes = useStyles();

    const [detailsOpen, setDetailState] = useState(false);
    const listStyle = useKeyValueListStyle();

    function toggleDetails() {
        setDetailState((prev) => !prev);
    }

    function actionHandler(e: React.SyntheticEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (props.action) {
            props.action(props.actionIcon || "default", npc);
        }
    }

    const npc = props.npc;

    return (
        <Card classes={{ root: classes.card }} onClick={toggleDetails}>
            <p>
                <b>{props.title || npc.name}</b>
            </p>
            {props.action && (
                <div className="actions">
                    <IconButton onClick={actionHandler}>
                        {props.actionIcon ? <EditIcon /> : <PersonAddIcon />}
                    </IconButton>
                </div>
            )}

            <div className={`details ${detailsOpen ? "open" : ""}`}>
                <p>{npc.description}</p>

                {npc.attributes && (
                    <>
                        <h5>Attributes</h5>
                        <p>
                            <AttributeContainer name="STR" value={npc.attributes.str} />
                            <AttributeContainer name="DEX" value={npc.attributes.dex} />
                            <AttributeContainer name="CON" value={npc.attributes.con} />
                            <AttributeContainer name="INT" value={npc.attributes.int} />
                            <AttributeContainer name="WIS" value={npc.attributes.wis} />
                            <AttributeContainer name="CHA" value={npc.attributes.cha} />
                        </p>
                    </>
                )}
                {npc.skills && (
                    <>
                        <h5>Skills</h5>
                        <p className={classes.skill}>
                            {npc.skills.map((s: Skill) => (
                                <span className={`${s.type}`} key={s.name}>
                                    {s.name} <small>[{s.type.charAt(0).toUpperCase()}]</small>: <b>{s.value}</b>
                                </span>
                            ))}
                        </p>
                    </>
                )}
                {npc.motivation && (
                    <>
                        <h5>Personality</h5>
                        <div className={classes.wrapper}>
                            <dl className={listStyle.root}>
                                <dd>Initial Manners:</dd>
                                <dt>{npc.motivation.initialManner}</dt>
                                <dd>Motivation</dd>
                                <dt>{npc.motivation.motivation}</dt>
                            </dl>
                            <dl className={listStyle.root}>
                                <dd>What they want</dd>
                                <dt>{npc.motivation.want}</dt>
                                <dd>Power</dd>
                                <dt>{npc.motivation.power}</dt>
                            </dl>
                            <dl className={listStyle.root}>
                                <dd>Hook</dd>
                                <dt>{npc.motivation.hook}</dt>
                                <dd>When deal is done</dd>
                                <dt>{npc.motivation.defaultDealOutcome}</dt>
                            </dl>
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};

interface NpcTemplateCardProps {
    npc: NonPlayerCharacterTemplate;
    action?: (type: string, npc: NonPlayerCharacterTemplate) => void;
    actionIcon?: string;
    title?: string;
}

const NpcTemplateCard: FC<NpcTemplateCardProps> = (props: NpcTemplateCardProps) => {
    const classes = useStyles();

    const [detailsOpen, setDetailState] = useState(false);
    const listStyle = useKeyValueListStyle();

    function toggleDetails() {
        setDetailState((prev) => !prev);
    }

    const npc = props.npc;

    function actionHandler(e: React.SyntheticEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (props.action) {
            props.action(props.actionIcon || "default", npc);
        }
    }

    return (
        <Card classes={{ root: classes.card }} className="template" onClick={toggleDetails}>
            <p>
                <b>{props.title || npc.templateName}</b>
            </p>
            {props.action && (
                <div className="actions">
                    <IconButton onClick={actionHandler}>
                        {props.actionIcon ? <EditIcon /> : <PersonAddIcon />}
                    </IconButton>
                </div>
            )}

            <div className={`details ${detailsOpen ? "open" : ""}`}>
                <p>{npc.description}</p>
            </div>
        </Card>
    );
};

export default CharacterListView;
