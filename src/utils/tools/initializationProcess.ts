import { joki } from "jokits-react";
import { eventIs } from "../jokiTools";
import { JokiEvent } from "jokits";

const existingProcesses: Set<string> = new Set<string>();

export interface ProcessCycleActions {
    begin: (nameOrId: string) => void;
    done: (nameOrId: string) => void;
}

export function createProcess(processName: string, targetCount?: number) {
    if (existingProcesses.has(processName)) throw new Error(`Process ${processName} exists already!`);

    existingProcesses.add(processName);

    const processingUnitsRunning: Set<string> = new Set<string>();
    const processingUnitsDone: Set<string> = new Set<string>();

    let state: "INIT" | "INPROGRESS" | "DONE" = "INIT";

    function startProcess() {
        state = "INPROGRESS";
        return new Promise((resolve, reject) => {
            const cycle: ProcessCycleActions = {
                begin: (nameOrId: string) => {
                    if (state === "DONE") {
                        throw new Error(
                            `Process ${processName} was already finished when ${nameOrId} tried to start its cycle.`
                        );
                    }
                    processingUnitsRunning.add(nameOrId);
                },
                done: (nameOrId: string) => {
                    if (state === "DONE") {
                        throw new Error(
                            `Process ${processName} was already finished when ${nameOrId} tried to end it's cycle.`
                        );
                    }
                    if (processingUnitsRunning.has(nameOrId)) {
                        processingUnitsDone.add(nameOrId);
                        if (
                            processingUnitsDone.size === processingUnitsRunning.size ||
                            processingUnitsDone.size === targetCount
                        ) {
                            state = "DONE";
                            resolve(processingUnitsDone);
                        }
                    } else {
                        reject(`Process unit ${nameOrId} tried to be done before it even started.`);
                    }
                },
            };

            const procesStartEvent: JokiEvent = {
                from: processName,
                action: "startProcess",
                data: cycle,
            };

            joki.trigger(procesStartEvent);
        });
    }

    function endProcess(forceEnd = false) {
        if (state !== "DONE" && forceEnd !== true) {
            throw new Error(`Process is not finished yet!`);
        }
        existingProcesses.delete(processName);
    }

    return {
        startProcess,
        endProcess,
    };
}

export function isProcessEvent(event: JokiEvent): undefined | [string, ProcessCycleActions] {
    if (event.from && existingProcesses.has(event.from)) {
        if (event.action === "startProcess" && event.data) {
            return [event.from, event.data as ProcessCycleActions];
        }
    }
    return undefined;
}
