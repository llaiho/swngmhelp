import { useCallback } from "react";
import { useAtom, useAtomValue } from "jokits-react";
import { Sector } from "../interfaces/Sector";

export default function useSelectedSector(): [Sector | undefined, (sector: Sector | undefined) => void] {
    const [sector, update] = useAtom<Sector | undefined>("SelectedSector", undefined);

    const [viewMode, setViewMode] = useAtom<string>("ViewMode", "main");

    const change = useCallback(
        (sect: Sector | undefined) => {
            if (sect !== undefined) {
                setViewMode("map");
                update(sect);
                
            } else {
                setViewMode("main");
                update(undefined);
                
            }
        },
        [update, setViewMode]
    );

    return [sector, change];
}

export function useSelectedSectorValue(): Sector | undefined {
    const sector = useAtomValue<Sector | undefined>("SelectedSector", undefined);

    return sector;
}

export function useChangeSelectedSector(): (sector: Sector | undefined) => void {
    //TODO: Update this to useSetAtom when it is released
    const [sector, update] = useAtom<Sector | undefined>("SelectedSector", undefined);
    const [viewMode, setViewMode] = useAtom<string>("ViewMode", "main");

    const change = useCallback(
        (sect: Sector | undefined) => {
            if (sect !== undefined) {
                setViewMode("map");
                update(sect);
            } else {
                setViewMode("main");
                update(undefined);
            }
        },
        [update, setViewMode]
    );

    return change;
}
