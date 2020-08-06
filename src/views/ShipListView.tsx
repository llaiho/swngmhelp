import React, { FC, useState } from "react";
import { makeStyles, Theme, createStyles, Container, Card, Button, Grid } from "@material-ui/core";

import "./data-view.scss";
import { randomShipGenerator } from "../generators/createShip";
import { Ship, ShipFitting, ShipDefense, ShipWeapon } from "../interfaces/Ship";
import { shipFittingsCostModifier } from "../data/ShipFittings";

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

        part: {
            margin: "2rem 0 0.5rem 0.5rem",
            paddingLeft: "0.5rem",
            position: "relative",
            color: theme.palette.primary.dark,
            fontFamily: theme.typography.fontFamily,
            fontSize: "1.6rem",
            // borderLeft: "solid 1rem rgba(255,255,255,0.5)",

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
            
        }
    })
);

 
export const ShipListView: FC = () => {
    const classes = useStyles();

    const [selectedShip, setSelectedShip] = useState<Ship|null>(null);

    
    const [ships, setShips] = useState<Ship[]>([
//        randomShipGenerator()
    ]);

//    console.log(ships);

    const addNewShipToList = () => {
        setShips((prevShips) => {
            const newShips = [...ships, randomShipGenerator()];
            return newShips;
        });
    }


      const deleteShipFromList = (shipId: string) => {
        setShips((prevShips) => {
            const newShips = prevShips.filter((s: Ship) => {
                return s.id !== shipId;
            });
            return newShips;
        });
    }  

    
    // if (selectedShip !== null) {
    //     return (
    //         <Container>
    //             <header className={classes.header}>
    //                 <h2>testing</h2>
    //             </header>
    //         </Container>
    //     );
    // }

    console.log("ship selected", selectedShip)
    if (selectedShip !== null) {
        return <ShipEditView ship={selectedShip} deselect={ () => setSelectedShip(null) } />
        
    }

    



    return (
        <Container className="data-view">
            <header className={classes.header}>
                <h2>Ship List</h2>
            </header>
        
        <h4 className = {classes.partHeader}>Ships</h4>

        <Card>
            {ships.map((ship) => {
                return (
                    <div key={ship.id}>
                        <p onClick={() => setSelectedShip(ship)}>{ship.shipName}, {ship.shipBaseHull.hullName} </p>
                        
                        <Button onClick={() => [deleteShipFromList(ship.id)]}>Delete Ship</Button>
                    </div>    
                )
            })} 
        </Card>


        <Card>
            <Button variant="contained" onClick = {addNewShipToList}>Add Ship</Button>

        </Card>





        </Container>
    );
};



export default ShipListView;

interface ShipEditViewProps {
    ship: Ship;
    deselect: () => void;
}

const ShipEditView: FC<ShipEditViewProps> = (props) => {
    const classes = useStyles();

    return <Container className="data-view">
        <header className={classes.header}>
            <h2>{props.ship.shipName}</h2>
        </header>

        <Card>
            <Grid container direction="row" justify="space-around"  alignItems="center" > 
                <Grid item xs={5}>
                    <h4 className={classes.partHeader}>Ship hull: {props.ship.shipBaseHull.hullName}</h4>

                </Grid>

                <Grid item xs={5}>
                    <h4 className={classes.part}>Ship size class: {props.ship.shipSizeClass}</h4>

                </Grid>
            
            
            </Grid>


        </Card>


        <Card>
            <Grid container direction="row" justify="space-around"  alignItems="center" > 
                <Grid item xs={2}>
                    <h4 className={classes.part}>Speed: {props.ship.shipSpeed}</h4>

                </Grid>

                <Grid item xs={2}>
                    <h4 className={classes.part}>Armor: {props.ship.shipArmor}</h4>

                </Grid>

                <Grid item xs={2}>
                    <h4 className={classes.part}>AC: {props.ship.shipAC}</h4>

                </Grid>            
                <Grid item xs={2}>
                    <h4 className={classes.part}>HP: {props.ship.shipCurrentHP}/{props.ship.shipMaxHP}</h4>

                </Grid>

            </Grid>


        </Card>

        <Card>
            <Grid container direction="row" justify="space-around"  alignItems="center" > 
                <Grid item xs={5}>
                    <h4 className={classes.part}>Crew min/max/current: {props.ship.shipMinCrew}/{props.ship.shipMaxCrew}/{props.ship.shipCurrentCrew}</h4>

                </Grid>


                <Grid item xs={2}>
                    <h4 className={classes.part}>Spike Drive: {props.ship.shipSpikeDrive}</h4>

                </Grid>            
                <Grid item xs={2}>
                    <h4 className={classes.part}>Spike Fuel: {props.ship.shipFuelForSpike}</h4>

                </Grid>

            </Grid>


        </Card>


        <Card>
            <Grid container direction="row" justify="space-around"  alignItems="center" > 
                <Grid item xs={5}>
                    <h4 className={classes.part}>Cargo Space: {props.ship.shipCargo} tons</h4>

                </Grid>

                <Grid item xs={5}>
                    <h4 className={classes.part}>Hidden Cargo Space: {props.ship.shipSmuglerCargo} tons</h4>

                </Grid>

        


            </Grid>


        </Card>


        <Card>
            <Grid container direction="row" justify="space-around"  alignItems="center" > 
                <Grid item xs={3}>
                    <h4 className={classes.part}>Power: {props.ship.shipBaseHull.hullPower}/{props.ship.shipFreePower} free</h4>

                </Grid>

                <Grid item xs={3}>
                    <h4 className={classes.part}>Mass: {props.ship.shipBaseHull.hullMass}/{props.ship.shipFreeMass} free</h4>

                </Grid>

                <Grid item xs={3}>
                    <h4 className={classes.part}>Hardpoints: {props.ship.shipBaseHull.hullHardpoints}/{props.ship.shipFreeHardpoints} free</h4>

                </Grid>            


            </Grid>


        </Card>


        <Card>
            <Grid container direction="row" justify="space-around"  alignItems="center" > 
                <Grid item xs={1}>
                    <h4 className={classes.partHeader}>Fittings: </h4>
                </Grid>
                <Grid item xs={10}>
                    <h4 className={classes.part}> {props.ship.shipAddedFittings.map((fit:ShipFitting) => <p>{fit.fittingName}</p>)}</h4>
                </Grid>
            </Grid>
        </Card>

        <Card>
            <Grid container direction="row" justify="space-around"  alignItems="center" > 
                <Grid item xs={1}>
                    <h4 className={classes.partHeader}>Weapons: </h4>
                </Grid>
                <Grid item xs={10}>
                    <h4 className={classes.part}> {props.ship.shipAddedWeapons.map((fit:ShipWeapon) => <p>{fit.weaponName}({fit.weaponDamage})</p>)}</h4>
                </Grid>                
            </Grid>
        </Card>

        <Card>
            <Grid container direction="row" justify="space-around"  alignItems="center" > 
                <Grid item xs={1}>
                    <h4 className={classes.partHeader}>Defenses: </h4>
                </Grid>
                <Grid item xs={10}>
                    <h4 className={classes.part}>{props.ship.shipAddedDefenses.map((fit:ShipDefense) => <p>{fit.defenseName}</p>)}</h4>
                </Grid>                
            </Grid>
        </Card>

        <Button variant="contained" onClick={props.deselect}>Back</Button>
    </Container>;
}

