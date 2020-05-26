import React, { FC, useState } from "react";

import { IconButton, makeStyles, createStyles } from "@material-ui/core";

import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import RefreshIcon from "@material-ui/icons/Refresh";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import "./controls.scss";
import { useAtom } from "jokits-react";

const useArrowStyles = makeStyles(
    createStyles({
        arrowContainer: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            "& > button": {
                flex: "1 1 auto",
                width: "2rem",
                fontSize: "1.2rem",
                padding: 0,
                margin: 0,
                "&:first-child": {
                    flex: "3 3 auto",
                    minWidth: "100%",
                },
                "& svg": {
                    fontSize: "2rem",
                    color: "rgba(0,0,0,0.8)",
                },
            },
        },
    })
);

export interface MapControls {
    x: number;
    y: number;
    zoom: number;
}

export interface SectorMapControlsProps {
    controls: MapControls;
    onChange: (ncontrols: MapControls) => void;
}

const SectorMapControls: FC<SectorMapControlsProps> = (props: SectorMapControlsProps) => {
    const { zoom, x, y } = props.controls;

    const zoomLevels: number[] = [10, 25, 50, 75, 100, 150, 200];
    
    // function reroll() {
    //     setSector(null);
    // }

    // if (mapPosition === undefined|| !zoomLevel) {
    //     return null;
    // }

    function zoomIn() {
        if (zoom < zoomLevels.length - 1) {
            props.onChange({ ...props.controls, zoom: zoom + 1 });
            // setZoomLevel(zoomLevel + 1);
        }
    }

    function zoomOut() {
        if (zoom > 0) {
            props.onChange({ ...props.controls, zoom: zoom - 1 });
            // setZoomLevel(zoomLevel - 1);
        }
    }

    function panMap(direction: string) {
        const moveSpeed = 50;

        switch (direction) {
            case "up":
                props.onChange({ ...props.controls, y: y - moveSpeed });
                // setMapPosition([mapPosition[0], mapPosition[1] - moveSpeed]);
                break;
            case "down":
                props.onChange({ ...props.controls, y: y + moveSpeed });
                // setMapPosition([mapPosition[0], mapPosition[1] + moveSpeed]);
                break;
            case "right":
                props.onChange({ ...props.controls, x: x + moveSpeed });
                // setMapPosition([mapPosition[0] + moveSpeed, mapPosition[1]]);
                break;
            case "left":
                props.onChange({ ...props.controls, x: x - moveSpeed });
                // setMapPosition([mapPosition[0] - moveSpeed, mapPosition[1]]);
                break;
            default:
                break;
        }
    }

    return (
        <div className="sector-map-controls">
            <IconButton onClick={zoomIn}>
                <ZoomInIcon />
            </IconButton>
            <IconButton onClick={zoomOut}>
                <ZoomOutIcon />
            </IconButton>
            {/* <IconButton onClick={reroll}><RefreshIcon /></IconButton> */}

            <ArrowControls onClick={panMap} />
        </div>
    );
};

interface ArrowControlsProps {
    onClick: (direction: string) => void;
}

const ArrowControls: FC<ArrowControlsProps> = (props) => {
    const classes = useArrowStyles();

    return (
        <div className={classes.arrowContainer}>
            <IconButton onClick={() => props.onClick("up")}>
                <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton onClick={() => props.onClick("left")}>
                <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton onClick={() => props.onClick("right")}>
                <KeyboardArrowRightIcon />
            </IconButton>
            <IconButton onClick={() => props.onClick("down")}>
                <KeyboardArrowDownIcon />
            </IconButton>
        </div>
    );
};

export default SectorMapControls;
