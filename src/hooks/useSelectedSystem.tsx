import { useCallback } from "react";
import { useAtom, useAtomValue } from "jokits-react";
import { StarSystem } from "../interfaces/Sector";

export default function useSelectedStarSystem(): [
    StarSystem | undefined,
    (starSystem: StarSystem | undefined) => void
] {
    const [system, update] = useAtom<StarSystem | undefined>("SelectedStarSystem", undefined);

    const change = useCallback(
        (starSystem: StarSystem | undefined) => {
            if (starSystem !== undefined) {
                update(starSystem);
            } else {
                update(undefined);
            }
        },
        [update]
    );

    return [system, change];
}

export function useSelectedStarSystemValue(): StarSystem | undefined {
    const system = useAtomValue<StarSystem | undefined>("SelectedStarSystem", undefined);

    return system;
}

export function useChangeSelectedStarSystem(): (starSystem: StarSystem | undefined) => void {
    //TODO: Update this to useSetAtom when it is released
    const [system, update] = useAtom<StarSystem | undefined>("SelectedStarSystem", undefined);

    const change = useCallback(
        (starSystem: StarSystem | undefined) => {
            if (starSystem !== undefined) {
                update(starSystem);
            } else {
                update(undefined);
            }
        },
        [update]
    );

    return change;
}
