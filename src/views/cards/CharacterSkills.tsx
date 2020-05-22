import React, { FC, useMemo } from "react";
import CharacterCardProps from "./CharacterCardProps";
import useCardStyles from "./useCardStyle";
import { Card, Theme, createStyles, Button, Grid, makeStyles } from "@material-ui/core";
import SKILLS from "../../data/Skills";
import { Skill } from "../../interfaces/Npc";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import { characterIsPsychic, characterIsNpc } from "../../utils/characterUtils";

const CharacterSkills: FC<CharacterCardProps> = (props: CharacterCardProps) => {
    const classes = useCardStyles();

    const generalSkills = useMemo(() => SKILLS.filter((s: Skill) => s.type === "general"), []);
    const combatSkills = useMemo(() => SKILLS.filter((s: Skill) => s.type === "combat"), []);
    const psychicSkills = useMemo(() => SKILLS.filter((s: Skill) => s.type === "psychic"), []);

    function editSkill(skill: Skill) {
        props.setCharacter((prev) => {
            if (prev) {
                const skills: Skill[] = character.skills.filter((s: Skill) => s.name !== skill.name);
                skills.push(skill);
                return { ...prev, skills: skills };
            }

            return prev;
        });
    }

    const { character } = props;

    const gridSize = 3;

    const isPsychic = characterIsPsychic(character) || characterIsNpc(character);

    return (
        <Card classes={{ root: classes.card }}>
            <h5>General Skills</h5>
            <Grid container alignItems="center" justify="flex-start">
                {generalSkills.map((s: Skill) => {
                    if (character.skills) {
                        const characterSkill = character.skills.find((ns: Skill) => ns.name === s.name);
                        if (characterSkill) {
                            return (
                                <Grid item xs={gridSize} key={s.name}>
                                    <SkillContainer
                                        skill={characterSkill}
                                        key={characterSkill.name}
                                        onEdit={editSkill}
                                    />
                                </Grid>
                            );
                        }
                    }
                    return (
                        <Grid xs={gridSize} item key={s.name}>
                            <SkillContainer skill={s} key={s.name} onEdit={editSkill} />
                        </Grid>
                    );
                })}
            </Grid>

            <h5>Combat Skills</h5>
            <Grid container alignItems="center" justify="flex-start">
                {combatSkills.map((s: Skill) => {
                    if (character.skills) {
                        const characterSkill = character.skills.find((ns: Skill) => ns.name === s.name);
                        if (characterSkill) {
                            return (
                                <Grid item xs={gridSize} key={s.name}>
                                    <SkillContainer
                                        skill={characterSkill}
                                        key={characterSkill.name}
                                        onEdit={editSkill}
                                    />
                                </Grid>
                            );
                        }
                    }
                    return (
                        <Grid xs={gridSize} item key={s.name}>
                            <SkillContainer skill={s} key={s.name} onEdit={editSkill} />
                        </Grid>
                    );
                })}
            </Grid>

            {isPsychic && (
                <>
                    <h5>Psychic Skills</h5>
                    <Grid container alignItems="center" justify="flex-start">
                        {psychicSkills.map((s: Skill) => {
                            if (character.skills) {
                                const characterSkill = character.skills.find((ns: Skill) => ns.name === s.name);
                                if (characterSkill) {
                                    return (
                                        <Grid item xs={gridSize} key={s.name}>
                                            <SkillContainer
                                                skill={characterSkill}
                                                key={characterSkill.name}
                                                onEdit={editSkill}
                                            />
                                        </Grid>
                                    );
                                }
                            }
                            return (
                                <Grid xs={gridSize} item key={s.name}>
                                    <SkillContainer skill={s} key={s.name} onEdit={editSkill} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
        </Card>
    );
};

const useSkillStyles = makeStyles((theme: Theme) =>
    createStyles({
        skillContainer: {
            flex: "1 1 auto",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            padding: "0.25rem",
            alignItems: "center",
            justifyContent: "flex-start",
            "& p.skillName": {
                width: "50%",
                "&.combat": {
                    // color: theme.palette.error.light,
                },
                "&.psychic": {
                    // color: theme.palette.primary.light,
                },
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
    })
);

interface SkillContainerProps {
    skill: Skill;
    onEdit?: (skill: Skill) => void;
}

const SkillContainer: FC<SkillContainerProps> = (props: SkillContainerProps) => {
    const skill = props.skill;
    const charHasSkill = skill.value > -1;
    const editMode = props.onEdit !== undefined;

    const classes = useSkillStyles();

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
            <p className={`skillName ${skill.type}`}>{skill.name}</p>
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

export default CharacterSkills;
