import React, { FC, useState } from "react";
import { Container, Card, Button, makeStyles, createStyles, Theme, Fab, Box, Grid } from "@material-ui/core";
import { v4 } from "uuid";

import { Encounter } from "../interfaces/Encounter";
import { Uuid } from "../interfaces/Sector";

import useListViewStyles from "./useListViewStyle";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import "./data-view.scss";
import { arnd } from "../utils/randUtils";

const EncountersView: FC = () => {
    // const [encounters, setEncounters] = useRecoilState<Encounter[]>(encounterAtoms);

    const encounters: Encounter[] = [];
    // const setEncounter = useSetRecoilState<Uuid>(encounterSelectAtom);

    const classes = useListViewStyles();

    function createEncounter() {
        const wordA = [
            "Operation",
            "Mission of",
            "Encounter",
            "Battle of",
            "Plan",
            "Interruption",
            "Design",
            "Campaign",
            "War of",
        ];
        const wordB = [
            "shiny",
            "dark",
            "light",
            "Cyber",
            "massive",
            "divine",
            "alpha",
            "beta",
            "omega",
            "furious",
            "terror",
        ];
        const wordC = ["rose", "tower", "club", "number", "book", "wasp", "tree", "cave", "shades", "moon"];
        const enc: Encounter = {
            id: v4(),
            name: `${arnd(wordA)} ${arnd(wordB)} ${arnd(wordC)}`,
            features: [],
            location: "",
            participants: [],
            round: 0,
            status: "DRAFT",
        };
        // setEncounters((prev) => [...prev, enc]);
    }

    function deleteEncounter(e: Encounter) {
        // setEncounters(prev => prev.filter((enc: Encounter) => e.id !== enc.id));
    }

    function selectEncounter(enc: Encounter) {
        // setEncounter(enc.id);
    }

    return (
        <Container classes={{ root: classes.container }}>
            <header className={classes.header}>
                <h1>Encounters</h1>
                <div className={classes.actionFabs}>
                    <Fab color="primary" onClick={createEncounter}>
                        <AddIcon />
                    </Fab>
                </div>
            </header>

            {encounters.length === 0 && (
                <Card classes={{ root: classes.errorMsg }}>
                    <h4>No Encounters!</h4>
                </Card>
            )}

            {encounters.map((e: Encounter) => (
                <Card key={e.id} classes={{ root: classes.card }} onClick={() => selectEncounter(e)}>
                    <Grid container alignItems="center" justify="space-around">
                        <Grid item xs={5}>
                            <h2>{e.name}</h2>
                        </Grid>
                        <Grid item xs={2} classes={{ root: classes.centerValue }}>
                            <p>Features</p>
                            <h3>{e.features.length}</h3>
                        </Grid>
                        <Grid item xs={2} classes={{ root: classes.centerValue }}>
                            <p>Participants</p>
                            <h3>{e.participants.length}</h3>
                        </Grid>
                        <Grid item xs={2} classes={{ root: classes.centerValue }}>
                            <p>Round</p>
                            <h3>{e.round}</h3>
                        </Grid>
                        <Grid item xs={1} classes={{ root: classes.centerValue }}>
                            <Button onClick={() => deleteEncounter(e)}>
                                <DeleteIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </Container>
    );
};

export default EncountersView;
