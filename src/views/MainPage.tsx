import React, { FC, useState } from "react";
import {
    Container,
    Grid,
    makeStyles,
    Theme,
    createStyles,
    Card,
    Icon,
    ButtonGroup,
    Button,
    Slider,
} from "@material-ui/core";
import { Sector, Hex, StarSystem, HexStore, FullSector } from "../interfaces/Sector";

import AddIcon from "@material-ui/icons/Add";

import logo from "./swncover.png";
import createSector from "../generators/createCubeSector";

import CloudDoneIcon from "@material-ui/icons/CloudDone";
import Title from "../components/Title";
import { useService, useAtom, joki } from "jokits-react";
import { useChangeSelectedSector } from "../hooks/useSelectedSector";
import LabelValue from "../components/LabelValue";

import { randomShipGenerator } from "../generators/createShip";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            padding: "0.5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            "& > h1": {
                fontFamily: "Teko",
                fontSize: "3rem",
                fontWeight: 500,
                color: theme.palette.primary.dark,
                textTransform: "uppercase",
                letterSpacing: "0.5rem",
                textShadow:
                    "2px 2px 0 rgba(255,255,255,0.5), -2px 2px 0 rgba(255,255,255,0.5), -2px -2px 0 rgba(255,255,255,0.5), 2px -2px 0 rgba(255,255,255,0.5), 0 0 2rem purple",
            },
        },
        sectors: {},
        sector: {
            position: "relative",
            padding: "0 2rem 4rem 2rem",
            height: "250px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.75,
            transition: "all 0.3s ease-out",
            boxShadow: "inset 0 0 2rem 0.5rem rgba(0,0,0,0.2), 0 0 0.5rem 0.2rem black",
            "& > span.cloudIcon": {
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
            },
            "&:hover": {
                opacity: 0.9,
                backgroundColor: theme.palette.primary.dark,
                boxShadow: "inset 0 0 3rem 1rem rgba(0,0,0,0.3), 0 0 0.5rem 0.2rem black",
            },
            "& > h1": {
                fontFamily: "Teko",
                fontWeight: 500,
                fontSize: "1.4rem",
            },
            "& > h2": {
                fontFamily: "Teko",
                fontWeight: 400,
                fontSize: "1.1rem",
                marginTop: "1rem",
            },
            "&.newSector": {
                border: "dashed 3px rgba(255,255,255,0.5)",
                opacity: 0.9,
                "&:hover": {
                    backgroundColor: theme.palette.background.paper,
                },
            },
            "& > button": {
                position: "absolute",
                bottom: "0.5rem",
                width: "90%",
                left: "5%",
            },
        },
        addIcon: {
            display: "block",
            width: "auto",
            height: "auto",
            "& svg": {
                fontSize: "8rem",
                color: theme.palette.primary.main,
            },
        },

        logo: {
            height: "10rem",
        },
        slider: {
            padding: "1rem 0.25rem",
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
    })
);

const ringsToText: string[] = ["single", "mini", "Tiny", "Small", "Normal", "Large", "Huge"];

const MainPage: FC = () => {
    const [sectors, send] = useService("SectorService", "React:MainPage");

    const setSelectedSector = useChangeSelectedSector();

    const classes = useStyles();

    const [density, setDensity] = useState<number>(2);
    const [size, setSize] = useState<number>(4);

    const densityNumToString: ("normal" | "dense" | "low")[] = ["low", "normal", "dense"];

    function loadSector(sec: Sector) {
        setSelectedSector(sec);
    }

    function newSector() {
        const ship = randomShipGenerator();
        console.log(ship);

        const sectorOpts = {
            density: densityNumToString[density - 1],
            rings: size,
        };
        
        send("create", sectorOpts);
    }

    if (!Array.isArray(sectors)) {
        return <p>Sectors is not an array</p>;
    }

    return (
        <Container>
            <header className={classes.header}>
                <Title size="md" />

                <h1>Gamemaster help tool</h1>
            </header>

            <h1 className={classes.partHeader}>Select Sector</h1>
            <Grid container spacing={1} alignItems="center" justify="flex-start">
                {sectors.map((sec: Sector) => {
                    return (
                        <Grid item xs={3} key={sec.id}>
                            <Card classes={{ root: classes.sector }} onClick={() => loadSector(sec)}>
                                <h1>{sec.name}</h1>
                                <LabelValue label="Stars" value={sec.stars.length} />
                                <LabelValue label="Size" value={ringsToText[sec.rings]} />
                                <LabelValue
                                    label="Density"
                                    value={`${Math.round((sec.stars.length / sec.hexes.length) * 100)}%`}
                                />

                                <LabelValue label="Characters" value={sec.npcs.length} />

                                {sec.firebaseId && (
                                    <Icon className="cloudIcon">
                                        <CloudDoneIcon />
                                    </Icon>
                                )}
                            </Card>
                        </Grid>
                    );
                })}
                <Grid item xs={3}>
                    <Card classes={{ root: classes.sector }} className="newSector">
                        <h2>Star System Density</h2>
                        <Slider
                            value={density}
                            defaultValue={2}
                            step={1}
                            onChange={(e: any, val: number | number[]) => setDensity(val as number)}
                            marks={[
                                { value: 1, label: "Low" },
                                { value: 2, label: "Medium" },
                                { value: 3, label: "High" },
                            ]}
                            min={1}
                            max={3}
                            valueLabelDisplay="auto"
                        ></Slider>

                        <h2>Galaxy Size</h2>
                        <Slider
                            value={size}
                            defaultValue={4}
                            onChange={(e: any, val: number | number[]) => setSize(val as number)}
                            step={1}
                            marks={[
                                { value: 2, label: "Tiny" },
                                { value: 3, label: "Small" },
                                { value: 4, label: "Medium" },
                                { value: 5, label: "Large" },
                                { value: 6, label: "Huge" },
                            ]}
                            min={2}
                            max={6}
                        ></Slider>

                        {/* <Icon classes={{ root: classes.addIcon }}>
                            <AddIcon />
                        </Icon> */}

                        <Button startIcon={<AddIcon />} onClick={newSector} variant="contained" color="primary">
                            New Sector
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MainPage;
