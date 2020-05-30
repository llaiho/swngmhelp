import React, { FC, useState } from "react";
import { makeStyles, Theme, createStyles, Container, Card, Stepper, Step, StepLabel, Grid } from "@material-ui/core";

import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from "react-beautiful-dnd";

import "./data-view.scss";
import { Character } from "../interfaces/Npc";
import { v4 } from "uuid";
import { randomNpcGenerator } from "../generators/npcGenerators";
import { rollDice } from "../utils/dice";
import AttributeContainer from "../components/AttributeContainer";

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
            textShadow: "-1px -1px 1px white, 1px -1px 1px white, 1px 1px 1px white, -1px 1px 1px white",
        },

        grid: {
            width: "100%",
        },
        rollPool: {
            width: "auto",
            height: "6rem",
            padding: "0.5rem",
            backgroundColor: "rgba(0,0,0,0.25)",
            border: "dashed 2px black",
            display: "flex",
            flexDirection: "row",
            margin: "1rem",
        },
        dropBox: {
            width: "7rem",
            height: "7rem",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "1rem",
        },
        rollResult: {
            width: "5rem",
            height: "5rem",
            backgroundColor: "white",
            color: "black",
            fontSize: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // margin: "1rem",
        },
    })
);

const emptyCharacter: Character = randomNpcGenerator();

const CharacterWizardView: FC = () => {
    const classes = useStyles();

    const [character, setCharacter] = useState<Character>(emptyCharacter);
    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <Container className="data-view">
            <header className={classes.header}>
                <h2>Character Creation Wizard</h2>
            </header>

            <Card>
                <Stepper activeStep={activeStep}>
                    <Step>
                        <StepLabel>Attributes</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Background</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Skills</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Class</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Foci</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Bonus skill</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Psychic</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Equipment</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>Details</StepLabel>
                    </Step>
                </Stepper>
            </Card>

            <AttributeRoller />
        </Container>
    );
};

interface Roll {
    value: number;
    id: string;
}

interface AttributeRolls {
    str: Roll | undefined;
    dex: Roll | undefined;
    con: Roll | undefined;
    int: Roll | undefined;
    wis: Roll | undefined;
    cha: Roll | undefined;
}

const AttributeRoller: FC = () => {
    const [rollCount, setRollCount] = useState<number>(5);

    const [rolls, setRolls] = useState<Roll[]>([
        {
            id: "roll1",
            value: rollDice(`3d6`),
        },
        {
            id: "roll2",
            value: rollDice(`3d6`),
        },
        {
            id: "roll3",
            value: rollDice(`3d6`),
        },
        {
            id: "roll4",
            value: rollDice(`3d6`),
        },
        {
            id: "roll5",
            value: rollDice(`3d6`),
        },
        {
            id: "roll6",
            value: rollDice(`3d6`),
        },
    ]);

    const [attributes, setAttributes] = useState<AttributeRolls>({
        str: undefined,
        dex: undefined,
        con: undefined,
        int: undefined,
        wis: undefined,
        cha: undefined,
    });

    const classes = useStyles();

    function dragEnd(result: DropResult, provider: ResponderProvided) {
        console.log("DropResult", result, result.draggableId, result.destination);
        if (result.destination) {
            if(result.destination.droppableId === "rollpool") {
                returnRollBackToPool(result.draggableId, result.source.droppableId, result.destination.index);
            } else {
                if (result.destination) moveRollFromPoolToAttribute(result.draggableId, result.destination.droppableId);
            }
            
        }
    }

    function moveRollFromPoolToAttribute(rollId: string, dropId: string) {
        const roll: Roll | undefined = rolls.find((r: Roll) => r.id === rollId);
        setRolls((prev) => {
            return prev.filter((r: Roll) => r.id !== rollId);
        });

        setAttributes((prev) => {
            return { ...prev, [dropId]: roll };
        });
    }

    function returnRollBackToPool(rollId: string, fromId: string, toPos: number) {
        const k: keyof AttributeRolls = fromId as keyof AttributeRolls;
        const roll: Roll|undefined = attributes[k];
        if(roll) {
            setAttributes(prev => ({...prev, [k]: undefined}));
            
            setRolls(prev => [...prev, roll]);
        }


    }

    const attrs: string[] = ["str", "dex", "con", "int", "wis", "char"];

    return (
        <>
            <h4 className={classes.partHeader}>Attributes</h4>
            <Card>
                <DragDropContext onDragEnd={dragEnd}>
                    <Droppable droppableId="rollpool" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                // style={getListStyle(snapshot.isDraggingOver)}
                                className={classes.rollPool}
                                {...provided.droppableProps}
                            >
                                {rolls.map((item, index) => (
                                    <RollResult roll={item} index={index} />
                                ))}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <hr />

                    <Grid container>
                        {attrs.map((attrKey: string) => {
                            const attrRoll: Roll | undefined = attributes[attrKey as keyof AttributeRolls];
                            return (
                                <Grid item xs={2}>
                                    <Droppable droppableId={attrKey} direction="horizontal" isDropDisabled={attrRoll !== undefined}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                className={classes.dropBox}
                                                // style={getListStyle(snapshot.isDraggingOver)}
                                                {...provided.droppableProps}
                                            >
                                                {attrRoll !== undefined && <RollResult roll={attrRoll} index={1} />}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </Grid>
                            );
                        })}
                        {/* 
                        <Grid item xs={2}>
                            <Droppable droppableId="str" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={classes.dropBox}
                                        // style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {attributes.str !== undefined && <RollResult roll={attributes.str} index={1} />}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item xs={2}>
                            <Droppable droppableId="dex" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={classes.dropBox}
                                        // style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {attributes.dex !== undefined && <RollResult roll={attributes.dex} index={1} />}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item xs={2}>
                            <Droppable droppableId="con" direction="horizontal" isDropDisabled={attributes.con !== undefined}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={classes.dropBox}
                                        // style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {attributes.con !== undefined && <RollResult roll={attributes.con} index={1} />}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item xs={2}>
                            <Droppable droppableId="int" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={classes.dropBox}
                                        // style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {attributes.int !== undefined && <RollResult roll={attributes.int} index={1} />}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item xs={2}>
                            <Droppable droppableId="wis" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={classes.dropBox}
                                        // style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {attributes.wis !== undefined && <RollResult roll={attributes.wis} index={1} />}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item xs={2}>
                            <Droppable droppableId="cha" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={classes.dropBox}
                                        // style={getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        {attributes.cha !== undefined && <RollResult roll={attributes.cha} index={1} />}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid> */}
                    </Grid>
                </DragDropContext>
            </Card>
        </>
    );
};

interface RollResultProps {
    roll: Roll;
    index: number;
}

const RollResult: FC<RollResultProps> = (props: RollResultProps) => {
    const classes = useStyles();
    const { roll, index } = props;
    return (
        <Draggable key={roll.id} draggableId={roll.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={classes.rollResult}
                    // style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                    {roll.value}
                </div>
            )}
        </Draggable>
    );
};

export default CharacterWizardView;
