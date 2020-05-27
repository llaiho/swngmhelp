import React, { FC } from "react";
import { Button, ButtonGroup } from "@material-ui/core";

export interface ButtonOptionsProps {
    options: string[];
    onChange: (key: string, value: string) => void;
    value: any;
    dataKey: string;
}

const ButtonOptions: FC<ButtonOptionsProps> = (props: ButtonOptionsProps) => {
    
    function onClickHandler(val: string) {
        props.onChange(props.dataKey, val);
    }

    return (
        <ButtonGroup color="primary">
            {props.options.map((b: string) => {
                const vari = b === props.value ? "contained" : "outlined";
                return <Button key={b} variant={vari} onClick={() => onClickHandler(b)}>{b}</Button>;
                
                
            })}
        </ButtonGroup>
    );
};

export default ButtonOptions;
