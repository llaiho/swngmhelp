import { Character } from "../../interfaces/Npc";
import { Dispatch, SetStateAction } from "react";



export default interface CharacterCardProps {
    character: Character;
    // setCharacter: (value: Character | (Dispatch<SetStateAction<Character | undefined>>) | ((prevState: Character | undefined) => Character | undefined) | null | undefined) => void;
    updateCharacter: (char: Character) => void;
}
