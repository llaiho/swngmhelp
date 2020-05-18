import { useState } from "react";




export default function useDelay(): [(cb: () => void, timerInMs: number) => void, () => void] {
    const [delayHandler, setDelayHandler] = useState<any>(null);

    function startDelay(cb: () => void, timerInMs: number) {
        const cl = setTimeout(() => {
            cb();
        }, timerInMs);
        setDelayHandler(cl);
    }

    function clearDelayTimer() {
        if (delayHandler !== null) {
            clearTimeout(delayHandler);
        }
        setDelayHandler(null);
    }

    return [startDelay, clearDelayTimer];
}
