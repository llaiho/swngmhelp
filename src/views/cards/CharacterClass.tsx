import React, { FC } from "react";
import CharacterCardProps from "./CharacterCardProps";
import { Character } from "../../interfaces/Npc";
import { makeStyles, createStyles, Card, ButtonGroup, Button, Grid } from "@material-ui/core";
import useCardStyles from "./useCardStyle";
import atomNpcSelection from "../../atoms/atomNpcSelection";
import { useRecoilState } from "../../utils/Recoil";
import LabelValue from "../../components/LabelValue";
import EditableNumber from "../../components/EditableNumber";
import DeleteIcon from "@material-ui/icons/Delete";

const CharacterClassCard: FC<CharacterCardProps> = (props: CharacterCardProps) => {
    const classes = useCardStyles();

    const { character } = props;

    const hasClasses = character.charClass.length > 0;

    function addNewClass(charClassName: string) {
        const nc: Character = { ...props.character };
        nc.charClass = charClassName;
        if (nc.level < 1) {
            nc.level = 1;
        }

        props.updateCharacter(nc);
    }

    function levelUpdated(k: string, v: number) {
        props.updateCharacter({ ...props.character, level: v });
    }

    function removeClass() {
        props.updateCharacter({ ...props.character, charClass: "", level: 0 });
    }

    const charClasses: string[] = [
        "Warrior",
        "Expert",
        "Psychic",
        "Adventurer: Warrior/Expert",
        "Adventurer: Psychic/Warrior",
        "Adventurer: Psychic/Expert",
    ];

    return (
        <Card classes={{ root: classes.card }}>
            {hasClasses && (
                <Grid container alignItems="center" justify="space-around">
                    <Grid item xs={5}>
                        <h2>{character.charClass}</h2>
                    </Grid>
                    <Grid item xs={5}>
                        <h3>
                            Level:
                            <EditableNumber
                                name="level"
                                value={character.level}
                                onEdit={levelUpdated}
                                min={1}
                                max={10}
                            />
                        </h3>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={removeClass} startIcon={<DeleteIcon />} color="secondary">
                            Remove Class
                        </Button>
                    </Grid>
                </Grid>
            )}

            {!hasClasses && (
                <Grid container alignItems="center" justify="space-around">
                    <Grid item xs={2}>
                        <h3>Add new class</h3>
                    </Grid>
                    <Grid item xs={10}>
                        <ButtonGroup variant="contained" color="primary">
                            {charClasses.map((cl: string) => (
                                <Button onClick={() => addNewClass(cl)} key={cl}>
                                    {cl}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Grid>
                </Grid>
            )}
        </Card>
    );
};

export default CharacterClassCard;
