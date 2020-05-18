const Recoil = require('recoil');



// Create atom interfaces
export interface AtomOptions {
    key: string;
    default: any;
}

export interface Atom {
    key: string;
}

export function atom(options: AtomOptions): Atom {
    return Recoil.atom(options);
}





// Selector interfaces and wrapper


export interface SelectorGet {
    get: any;
}

export interface SelectorSet {
    (set:object, value: any): any;
}


export interface SelectorOptions {
    key: string;
    get: (opts: SelectorGet) => any;
    set?: SelectorSet;
    
}

export interface Selector {

}

export function selector(options: SelectorOptions): Selector {
    return Recoil.selector(options);
}

// Hooks
export interface RecoilUpdater<T> {
    (state: T): T
}
export function useRecoilState<T>(atom: Atom|Selector): [T, (value: T|null|undefined|((prevState: T) => T) ) => void] {
    return Recoil.useRecoilState(atom);
}

export function useRecoilValue<T>(atom: Atom|Selector): T {
    return Recoil.useRecoilValue(atom);
}

export function useSetRecoilState<T>(atom: Atom|Selector): any {
    return Recoil.useSetRecoilState(atom);
}


