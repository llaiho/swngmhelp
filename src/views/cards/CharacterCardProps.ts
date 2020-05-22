import { Character } from "../../interfaces/Npc";



export default interface CharacterCardProps {
    character: Character;
    setCharacter: (value: Character | ((prevState: Character | null) => Character | null) | null | undefined) => void;
}
