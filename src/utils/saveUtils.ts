import { FirebaseStorable } from "../interfaces/Firebase";
import { StarSystem, Planet, Star, PointOfInterest } from "../interfaces/Sector";


export interface StarSystemFirebase extends FirebaseStorable {
    [key: string]: any;
}

export function  convertStarSystem(star: StarSystem): StarSystemFirebase {
    const sfb: StarSystemFirebase = JSON.parse(JSON.stringify(star));
    return sfb;
}

