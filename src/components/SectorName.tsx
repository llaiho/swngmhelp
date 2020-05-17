import React, {FC, useState, useEffect} from 'react';
import sectorAtom from '../atoms/atomSector';
import { CubeSector } from '../interfaces/Sector';
import { useRecoilValue, useRecoilState } from '../utils/Recoil';
import { makeStyles, createStyles, Input, TextField } from '@material-ui/core';


const useStyles = makeStyles(createStyles({
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
            }
        },
        "& > h3": {
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
            fontStyle: "italic"
        }
    },
    inputField: {
        '& .MuiFormLabel-root': {
            color: "white",

        },
        "& .MuiInputBase-root": {
            color: "white",
            
        },

        "& .MuiInputBase-input": {
            fontSize: "2rem",
        }
        
    }

}))

const SectorName: FC = () => {

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [oldName, setOldName] = useState("");

    const classes = useStyles();
    const [sector, setSector] = useRecoilState<CubeSector>(sectorAtom);
    

    useEffect(() => {
        if(!editMode) {
            if(sector.name) {
                setName(sector.name);
            } else {
                setName("Unknown Sector");
            }
            
        }
        
    }, [sector, editMode]);

    function onInputChange(e: any) {
        const val  = e.target.value;
        setName(val);
    }

    function onKeyDown(e: any) {
        if(e.key === "Enter") {
            saveEdit();
            return;
        }
        if(e.key === "Escape") {
            cancelEdit();
            return;
        }
    }

    function saveEdit() {
        const nSec: CubeSector = {...sector};
        nSec.name = name;
        setSector(nSec);
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
            {editMode && <TextField variant="outlined" value={name} color="secondary" label="Sector name (Enter to save)" classes={{root: classes.inputField}} onChange={onInputChange} onKeyDown={onKeyDown} autoFocus />}
            <h3>{sector.id}</h3>
        </div>
    )


}

export default SectorName;