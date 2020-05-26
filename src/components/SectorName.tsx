import React, { FC, useState, useEffect } from "react";

import { Sector } from "../interfaces/Sector";
import { makeStyles, createStyles, Input, TextField } from "@material-ui/core";
import { useAtomValue } from "jokits-react";

const useStyles = makeStyles(
    createStyles({
        sectorName: {
            position: "fixed",
            left: "1rem",
            bottom: "1rem",
            width: "auto",
            "& > h1": {
                fontSize: "3rem",
                fontWeight: "bold",
                color: "white",
                "&:hover": {
                    borderBottom: "solid 1px white",
                    cursor: "pointer",
                },
            },
            "& > h3": {
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                fontStyle: "italic",
            },
        },
        inputField: {
            "& .MuiFormLabel-root": {
                color: "white",
            },
            "& .MuiInputBase-root": {
                color: "white",
            },

            "& .MuiInputBase-input": {
                fontSize: "2rem",
            },
        },
    })
);

const SectorName: FC = () => {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [oldName, setOldName] = useState("");

    const classes = useStyles();

    const sector = useAtomValue<Sector | undefined>("SelectedSector", undefined);

    useEffect(() => {
        if (!editMode) {
            if (sector !== undefined && sector.name) {
                setName(sector.name);
            } else {
                setName("Unknown Sector");
            }
        }
    }, [sector, editMode]);

    if (sector === undefined) {
        return null;
    }

    function onInputChange(e: any) {
        const val = e.target.value;
        setName(val);
    }

    function onKeyDown(e: any) {
        if (e.key === "Enter") {
            saveEdit();
            return;
        }
        if (e.key === "Escape") {
            cancelEdit();
            return;
        }
    }

    function saveEdit() {
        // const nSec: Sector = {...sector};
        // nSec.name = name;
        // setSector(nSec);
        if (sector !== undefined) {
            sector.name = name;
        }

        setEditMode(false);
    }

    function cancelEdit() {
        setName(oldName);
        setEditMode(false);
    }

    function editModeOn() {
        setOldName(name);
        setEditMode(true);
    }

    return (
        <div className={classes.sectorName}>
            {!editMode && <h1 onClick={editModeOn}>{name}</h1>}
            {editMode && (
                <TextField
                    variant="outlined"
                    value={name}
                    color="secondary"
                    label="Sector name (Enter to save)"
                    classes={{ root: classes.inputField }}
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    autoFocus
                />
            )}
            <h3>{sector.id}</h3>
        </div>
    );
};

export default SectorName;
