import { JokiEvent, JokiAtom } from "jokits";
import { joki } from "jokits-react";

interface JokiEventRules {
    to?: string;
    from?: string;
    action?: string;
    data?: any;
}

export function eventIs(event: JokiEvent, rules: JokiEventRules): boolean {
    if (rules.to === undefined && rules.from === undefined && rules.action === undefined) return true;

    let matches = 0;

    if (rules.to && event.to && rules.to === event.to) matches++;
    if (rules.from && event.from && rules.from === event.from) matches++;
    if (rules.action && event.action && rules.action === event.action) matches++;
    if (rules.data && event.data && rules.data === event.data) matches++;

    return matches === Object.keys(rules).length;
}
