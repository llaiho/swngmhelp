import React, { FC, useState, useEffect } from "react";

import { Encounter } from "../interfaces/Encounter";
import { Uuid } from "../interfaces/Sector";

import encounterAtoms from "../atoms/encounterAtoms";
import encounterSelectAtom from "../atoms/encounterSelectAtom";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "../utils/Recoil";
import EncounterSelector from "../selectors/EncounterSelector";
import { makeStyles, Theme, createStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        encounterView: {
            paddingTop: "5rem",
        },
        header: {
            padding: "5rem 1rem 1rem 1rem",
            "& > h1": {
                color: theme.palette.text.primary,
            },
        },
        board: {
            display: "block",
            margin: "0 auto",
            width: "1000px",
            height: "1000px",
            
            "& .board-grid-container": {
                height: "100%",
                width: "100%",

                "& .board-grid-item": {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    color: "white",
                    border: "solid 2px rgba(255,255,255,0.2)",
                    "&:hover": {
                        border: "solid 2px rgba(128,128,255,0.5)",
                    }
                }
            }
        }
    })
);

const EncounterView: FC = () => {
    const classes = useStyles();
    const encounter = useRecoilValue<Encounter | null>(EncounterSelector);

    if (encounter === null) {
        return null;
    }

    return (
        <div className={classes.encounterView}>
            <header className={classes.header}>
                <h1>{encounter.name}</h1>
            </header>


            <div className={classes.board}>
                <BoardGrid />
            </div>
            
        </div>
    );
};

interface GridCell {
    id: string;
    x: number;
    y: number;
    movable: boolean;
}

const BoardGrid: FC = () => {
    const size = 12;
    const grid: GridCell[] = [];
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const g: GridCell = {
                id: `${x}-${y}`,
                x,
                y,
                movable: true,
            };
            grid.push(g);
        }
    }

    return (
        <Grid container className="board-grid-container">
            {grid.map((g: GridCell) => {
                return (
                    <Grid item key={g.id} xs={1} className="board-grid-item">
                        {g.x}, {g.y}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default EncounterView;
