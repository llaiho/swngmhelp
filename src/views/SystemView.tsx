

import React, { FC } from 'react';
import { useRecoilState, Atom, useSetRecoilState, useRecoilValue } from '../utils/Recoil';
import systemAtom from '../atoms/atomSystem';
import { StarSystem, Star, PrimaryPlanet, Tag, Planet, SecondaryPlanet, GeneralPlanet, PointOfInterest, FullStarSystem } from '../interfaces/Sector';

import { Button, Container, Card, makeStyles, createStyles } from '@material-ui/core';

import useKeyValueListStyle from '../styles/useKeyValueListStyle';

import './data-view.scss';
import FullStarSystemSelector from '../selectors/FullSystemSelector';

const useStyles = makeStyles(createStyles({
    starCard: {
        padding: "0.5rem"
    },
    header: {
        padding: "3rem 0",
        display: "flex",
        flexDirection: "row",

    },
    h2: {
        color: "white",
        fontSize: "2rem",
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    planetCard: {
        flex: "1 1 auto",
        minWidth: "300px",
        padding: "0.5rem",
        marginBottom: "1rem",
        marginRight: "1rem",
        "& h4": {
            marginTop: "1rem",
        }
    },
    poiCard: {
        flex: "0 0 auto",
        width: "32%",
        padding: "0.5rem",
        marginBottom: "1rem",
        marginRight: "1%",

    },
    partHeader: {
        margin: "2rem 0 0.5rem 0.5rem",
        paddingLeft: "0.5rem",
        position: "relative",
        color: "#002299",
        borderLeft: "solid 1rem rgba(255,255,255,0.5)",

        borderTopLeftRadius: "1rem 1rem",
        borderBottomLeftRadius: "1rem 1rem",
        textShadow: "-1px -1px 1px white, 1px -1px 1px white, 1px 1px 1px white, -1px 1px 1px white",


    }
}))

const SystemView: FC = () => {

    const system: FullStarSystem = useRecoilValue<FullStarSystem>(FullStarSystemSelector);
    const setSystem = useSetRecoilState(systemAtom);
    
    const classes = useStyles();
    const listStyle = useKeyValueListStyle();

    function deselect() {
        setSystem(null);
    }
    
    if(system === null) {
        return null;
    }

    console.log("SYSTEM", system);

    return (
        <Container className="data-view">

            <header className={classes.header}>
                <Button onClick={deselect} variant="contained" >Back</Button>
                <h2 className={classes.h2}>{system.name}</h2>
            </header>


            <h3 className={classes.partHeader}>Stars</h3>

            {system.star.map((star: Star) => (
                <Card key={star.id} classes={{ root: classes.starCard }}>
                    <dl className={listStyle.root}>
                        <dd>size</dd>
                        <dt>{star.size}</dt>

                        <dd>color</dd>
                        <dt>{star.color}</dt>
                    </dl>
                </Card>
            ))}

            <h3 className={classes.partHeader}>Planets</h3>

            <div className={classes.wrapper}>
            {system.planets.map((pl: Planet) => {

                if (pl.planetGenre === "primary") {
                    return <PrimaryPlanetCard key={pl.id} planet={pl} />;
                }
                if (pl.planetGenre === "secondary") {
                    return <SecondaryPlanetCard key={pl.id} planet={pl} />;
                }

                return <GeneralPlanetCard key={pl.id} planet={pl} />;

            })}
            </div>

            {system.POIs.length > 0 && (
                <>
                    <h3 className={classes.partHeader}>Points of Interest</h3>

                    <div className={classes.wrapper}>
                    {system.POIs.map((poi: PointOfInterest) => {
                        return (
                            <Card key={poi.id} classes={{ root: classes.poiCard }}>
                                <dl className={listStyle.root}>
                                    <dd>point</dd>
                                    <dt>{poi.point}</dt>

                                    <dd>occupied</dd>
                                    <dt>{poi.occupied}</dt>

                                    <dd>situation</dd>
                                    <dt>{poi.situation}</dt>
                                </dl>
                            </Card>
                        )
                    })}
                    </div>
                </>
            )}


        </Container>
    )
};

interface PlanetCardProps {
    planet: Planet
}

const PrimaryPlanetCard: FC<PlanetCardProps> = (props) => {

    const classes = useStyles();
    const listStyle = useKeyValueListStyle();

    if (props.planet.planetGenre !== "primary") {
        console.warn(`Planet ${props.planet.name} is not primary!`);
        return null;
    }

    const planet: PrimaryPlanet = props.planet as PrimaryPlanet;

    return (
        <Card classes={{ root: classes.planetCard }}>

            <dl className={listStyle.root}>
                <dd>PRIMARY PLANET</dd>
                <dt>{planet.name}</dt>
                <dd>atmosphere</dd>
                <dt>{planet.atmosphere}</dt>
                <dd>temperature</dd>
                <dt>{planet.temperature}</dt>
                <dd>population</dd>
                <dt>{planet.population}</dt>
                <dd>technology level</dd>
                <dt>{planet.techLevel}</dt>
            </dl>

            {planet.tags.size > 0 && (
                <>
                    <h4>Tags</h4>
                    {Array.from(planet.tags).map((tag: Tag, index: number) => (
                        <p key={index}>{tag.name}</p>
                    ))}
                </>
            )}


            <h4>Description</h4>
            {planet.description}
        </Card>
    )
}

const SecondaryPlanetCard: FC<PlanetCardProps> = (props) => {

    const classes = useStyles();
    const listStyle = useKeyValueListStyle();

    if (props.planet.planetGenre !== "secondary") {
        console.warn(`Planet ${props.planet.name} is not secondary!`);
        return null;
    }

    const planet: SecondaryPlanet = props.planet as SecondaryPlanet;

    return (
        <Card classes={{ root: classes.planetCard }}>
            <dl className={listStyle.root}>
                <dd>SECONDARY PLANET</dd>
                <dt>{planet.name}</dt>
                <dd>atmosphere</dd>
                <dt>{planet.atmosphere}</dt>
                <dd>temperature</dd>
                <dt>{planet.temperature}</dt>
                <dd>population</dd>
                <dt>{planet.population}</dt>
                <dd>technology level</dd>
                <dt>{planet.techLevel}</dt>
            </dl>

            {planet.tags.size > 0 && (
                <>
                    <h4>Tags</h4>
                    {Array.from(planet.tags).map((tag: Tag, index: number) => (
                        <p key={index}>{tag.name}</p>
                    ))}
                </>
            )}

            <h4>Description</h4>
            {planet.description}

            <h4>Relations to Primary</h4>
            <dl className={listStyle.root}>
                <dd>origins</dd>
                <dt>{planet.origin}</dt>
                <dd>current relationship</dd>
                <dt>{planet.currentRelationsToPrimary}</dt>
                <dd>contact point</dd>
                <dt>{planet.contactPoint}</dt>
            </dl>
        </Card>
    )
}

const GeneralPlanetCard: FC<PlanetCardProps> = (props) => {

    const classes = useStyles();
    const listStyle = useKeyValueListStyle();

    if (props.planet.planetGenre !== "general") {
        console.warn(`Planet ${props.planet.name} is not general!`);
        return null;
    }

    const planet: GeneralPlanet = props.planet as GeneralPlanet;

    return (
        <Card classes={{ root: classes.planetCard }}>
            <dl className={listStyle.root}>
                <dd>name</dd>
                <dt>{planet.name}</dt>
                <dd>type</dd>
                <dt>{planet.planetType}</dt>

            </dl>
        </Card>
    )
}


export default SystemView;