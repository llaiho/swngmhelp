import { PointOfInterest } from "../interfaces/Sector";
import { v4 } from "uuid";
import POIS, { PointOfInterestData } from "../data/Pois";
import { arnd } from "../utils/randUtils";



const createPOI = (poiType: "system"|"planet"|"city"): PointOfInterest => {

    const poiData = arnd(POIS.filter((p: PointOfInterestData) => p.type === poiType));

    const poi: PointOfInterest = {
        id: v4(),
        name: "",
        point: poiData.point,
        occupied: arnd(poiData.occupied),
        situation: arnd(poiData.situation),
        previousSituations: []
    };

    return poi;
}



export default createPOI;