import React, { FC, useState } from "react";
import { makeStyles, Theme, createStyles, Container, Card, Button } from "@material-ui/core";

import "./data-view.scss";
import { randomShipGenerator } from "../generators/createShip";
import { Ship } from "../interfaces/Ship";

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
        }
    })
);

 
const ShipListView: FC = () => {
    const classes = useStyles();

    
    const [ships, setShips] = useState<Ship[]>([
        randomShipGenerator()
    ]);

//    console.log(ships);

    const addNewShipToList = () => {
        setShips((prevShips) => {
            const newShips = [...ships, randomShipGenerator()];
            return newShips;
        });
    }

/*
      const deleteShipFromList = () => {
        setShips((prevShips) => {
            const newShips = [...ships].slice(this.ship)
            return newShips;
        })
    }  
*/    




    return (
        <Container className="data-view">
            <header className={classes.header}>
                <h2>Ship List list</h2>
            </header>
        
        <h4 className = {classes.partHeader}>Ships</h4>

        <Card>
            {ships.map((ship) => {
                return (
                    <div>
                        <p>{ship.shipName}, {ship.shipBaseHull}</p>
                        <Button >Delete Ship</Button>
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
