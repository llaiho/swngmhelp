import React, { FC, useState, useEffect } from "react";
import { TextField, OutlinedTextFieldProps } from "@material-ui/core";
import useDelay from "../utils/useDelay";

interface TextInputProps extends OutlinedTextFieldProps {
    dataKey: string;
    value: string;
    onDataSave: (key: string, value: string) => void;
    clickToEdit?: boolean;
}

const TextInput: FC<TextInputProps> = (props: TextInputProps) => {
    const [val, setVal] = useState<string>(props.value);
    const [origVal, setOrigVal] = useState<string>(props.value);

    const [editMode, setEditMode] = useState(props.clickToEdit === true ? false : true);

    const [start, stop] = useDelay();

    function onKeyDownEvent(e: any) {
        if (e.key === "Enter") {
            saveEdit();
            return;
        }
        if (e.key === "Escape") {
            cancelEdit();
            return;
        }
    }

    function onEdit(e: any) {
        const value = e.target.value;

        stop();

        start(() => {
            props.onDataSave(props.dataKey, value);
        }, 500);

        setVal(value);
    }

    function saveEdit() {
        
        props.onDataSave(props.dataKey, val);
        if(props.clickToEdit === true) {
            setEditMode(false);
        }
        
    }

    function cancelEdit() {
        
        props.onDataSave(props.dataKey, origVal);
        setVal(origVal);
        if(props.clickToEdit === true) {
            setEditMode(false);
        }
    }



    const { value, onDataSave, dataKey: datakey, clickToEdit,  ...rest } = props;


    if(!editMode) {
        return (
            <div className="text-field-viewer" onClick={() => setEditMode(true)}>
                {props.label && <label>{props.label}</label>}
                <p>{val}</p>
            </div>
        )
    }

    return <TextField value={val} onChange={onEdit} onBlur={saveEdit} onKeyDown={onKeyDownEvent} {...rest} />;
};

export default TextInput;
