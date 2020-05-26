import { useCallback } from "react";
import { Character } from "../interfaces/Npc";
import { useAtom, useAtomValue } from "jokits-react";

export default function useSelectedCharacter(): [Character | undefined, (char: Character | undefined) => void] {
    const [character, update] = useAtom<Character | undefined>("SelectedCharacter", undefined);

    const change = useCallback(
        (char: Character | undefined) => {
            if (char !== undefined) {
                update(char);
            } else {
                update(undefined);
            }
        },
        [update]
    );

    return [character, change];
}

export function useSelectedCharacterValue(): Character | undefined {
    const character = useAtomValue<Character | undefined>("SelectedCharacter", undefined);

    return character;
}

export function useChangeSelectedCharacter(): (char: Character | undefined) => void {
    //TODO: Update this to useSetAtom when it is released
    const [character, update] = useAtom<Character | undefined>("SelectedCharacter", undefined);

    const change = useCallback(
        (char: Character | undefined) => {
            if (char !== undefined) {
                update(char);
            } else {
                update(undefined);
            }
        },
        [update]
    );

    return change;
}
