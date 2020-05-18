import React, { FC, useState } from 'react';
import { useRecoilState } from '../utils/Recoil';
import sectorZoomLevel from '../atoms/atomZoomLevel';


import { IconButton, makeStyles, createStyles } from '@material-ui/core';

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import GetAppIcon from '@material-ui/icons/GetApp';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BackupIcon from '@material-ui/icons/Backup';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


import './controls.scss';
import sectorAtom from '../atoms/atomSector';
import { Sector, CubeSector } from '../interfaces/Sector';
import atomMapPosition from '../atoms/atomMapPosition';

const MainControls: FC = () => {

    const [sector, setSector] = useRecoilState<CubeSector>(sectorAtom);

    function saveToLocalStorage() {
        window.localStorage.setItem("SWN_Sector", JSON.stringify(sector));
    }

    function loadFromLocalStorage() {
        const strSec = window.localStorage.getItem("SWN_Sector");
        if (strSec) {
            const parsedSector: CubeSector = JSON.parse(strSec);
            setSector(parsedSector);
        } else {
            console.warn("No stored sector in localstorage");
        }
    }

    function clearLocalStorage() {
        window.localStorage.removeItem("SWN_Sector");
    }

    return (
        <div className="main-controls">

            <IconButton onClick={saveToLocalStorage}><SaveAltIcon /></IconButton>
            <IconButton onClick={loadFromLocalStorage}><FolderOpenIcon /></IconButton>


            {/* 
            <IconButton><BackupIcon /></IconButton>
            <IconButton><CloudDownloadIcon /></IconButton> */}

            <IconButton onClick={clearLocalStorage}><DeleteForeverIcon /></IconButton>


        </div>
    )

}


export default MainControls;



