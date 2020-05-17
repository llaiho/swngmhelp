

declare module joki {
    function createJoki(options: any): any;
    function createMockService(): any;
    namespace joki { };
    export = joki;
}


// export interface JokiInstance {
//     ask: (event: jokiEvent) => Promise;
//     on: (event: jokiEvent) => void;
//     trigger: (event: jokiEvent) => void,
//     listeners: () => any[],
//     broadcast: (event: jokiEvent) => void,

//     addService: (service: JokiService) => void,
//     removeService: (serviceId: string, id?: boolean) => void,
//     listServices: () => JokiService[],
//     initServices: () => void,
//     onInitialize: (event: jokiEvent) => void,

//     serviceUpdate,

//     options,

//     isJokiInstance: boolean;
// }


// export interface JokiEvent {

// }

// export interface JokiService {

// }