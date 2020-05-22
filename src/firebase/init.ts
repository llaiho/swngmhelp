import { getAllCharacters } from "./apiCharacters";
import { useSetRecoilState } from "../utils/Recoil";
import npcAtoms from "../atoms/npcAtoms";
import { useState, useEffect } from "react";
import { Character } from "../interfaces/Npc";
import sectorAtoms from "../atoms/sectorAtoms";
import { getAllSectors } from "./apiSector";
import { Sector } from "../interfaces/Sector";

export default async function initFirebase() {
    const chars = await getAllCharacters();

    console.log("CHARACTERS", chars);
}

export function useFirebase() {
    const [initializing, setInitializing] = useState(true);

    const setCharacters = useSetRecoilState(npcAtoms);
    const setSectors = useSetRecoilState(sectorAtoms);

    useEffect(() => {
        async function init() {
            
            // Load characters (npc:s mainly)
            const chars: Character[] = await getAllCharacters();
            setCharacters(chars);


            // Load Sectors
            const sectors: Sector[] = await getAllSectors();
            setSectors(sectors);
                        
            

            setInitializing(false);
        }

        init();
    }, []);

    return initializing;
}
