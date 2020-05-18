import React, { FC } from "react";
import { Button, IconButton } from "@material-ui/core";

import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";

export interface AttributeContainerProps {
    name: string;
    value: number;
    onEdit?: (name: string, value: number) => void;
}

const AttributeContainer: FC<AttributeContainerProps> = (props: AttributeContainerProps) => {
    let bonus = 0;
    if (props.value >= 14) bonus = +1;
    if (props.value >= 18) bonus = +2;
    if (props.value <= 7) bonus = -1;
    if (props.value <= 3) bonus = -2;

    const bonusClass = bonus > 0 ? "positive" : bonus < 0 ? "negative" : "";
    const bonusStr = `${bonus > 0 ? "+" : ""}${bonus !== 0 ? bonus : ""}`;

    const editMode = props.onEdit !== undefined;

    function plusOne() {
        if(editMode && props.onEdit) {
            props.onEdit(props.name, props.value + 1);
        }
    }

    function minusOne() {
        if(editMode && props.onEdit) {
            props.onEdit(props.name, props.value - 1);
        }
    }

    return (
        <span className="attribute-container">
            {props.name}: <b>{props.value}</b>
            {editMode && (
                <span className="edit-buttons">
                    <Button startIcon={<ExposurePlus1Icon />} variant="contained" color="primary" onClick={plusOne}></Button>    
                    <Button startIcon={<ExposureNeg1Icon />} variant="contained" color="primary" onClick={minusOne}></Button>    
                </span>
            )}
            <small className={bonusClass}>{bonusStr}</small>
        </span>
    );
};
export default AttributeContainer;
