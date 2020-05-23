import React, {FC} from 'react';
import { makeStyles, Theme, createStyles, Fab, CircularProgress } from '@material-ui/core';

import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import SaveIcon from "@material-ui/icons/Save";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';




export interface FabSaveProps {
    deactivated: boolean;
    saving: boolean;
    onClick: () => void;
}


const useFabStyle = makeStyles((theme: Theme) => createStyles({
    fabWrap: {
        position: "relative",
        margin: theme.spacing(1),
    },
    fabProgress: {
        color: "green",
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
}))

const FabSave: FC<FabSaveProps> = (props: FabSaveProps) => {

    const classes = useFabStyle();

    const statusIcon = props.saving ? <HourglassEmptyIcon /> : props.deactivated ? <DoneOutlineIcon /> : <SaveIcon />;
    return (
        <span className={classes.fabWrap}>
            <Fab onClick={props.onClick} color="primary" disabled={props.deactivated || props.saving}>
                {statusIcon}
            </Fab>
            {props.saving && <CircularProgress size={68} className={classes.fabProgress} />}
        </span>
    );
};

export default FabSave;