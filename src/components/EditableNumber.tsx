import React, {FC} from 'react';
import { makeStyles, Theme, createStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    numberEditorContainer: {
        display: "inline-flex",
        flexDirection: "row",
        width: "auto",
        alignItems: "center",
        justifyContent: "space-around",
        "& > button": {
            minWidth: "2rem",
            width: "2rem",
            padding: "0.25rem  0 0 0",
            margin: "0 0.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            letterSpacing: "2px"
            
        },
    },
}))

export interface EditableNumberProps {
    value: number;
    name: string;
    onEdit: (key: string, value: number) => void;
    step?: number;
    min?: number;
    max?: number;
    className?: string;
    postFix?: string|FC<any>|JSX.Element|undefined;
    
}

const EditableNumber: FC<EditableNumberProps> = (props: EditableNumberProps) => {
    const classes = useStyles();

    const minValue = props.min || 0;
    const maxValue = props.max || 100;

    const myStep = props.step || 1;

    function minusStep() {
        const st: number = myStep;
        props.onEdit(props.name, props.value - st);
    }

    function plusStep() {
        const st: number = myStep;
        props.onEdit(props.name, props.value + st);
    }

    const classNames = [classes.numberEditorContainer, props.className].join(" ");

    

    return (
        <div className={classNames}>
            <Button
                
                className="minusButton"
                disabled={props.value <= minValue}
                variant="contained"
                color="primary"
                onClick={minusStep}
            >-{myStep}</Button>
            {props.value}
            {props.postFix}
            <Button
                className="plusButton"
                disabled={props.value >= maxValue}
                variant="contained"
                color="primary"
                onClick={plusStep}
            >+{myStep}</Button>
        </div>
    );
};


export default EditableNumber;