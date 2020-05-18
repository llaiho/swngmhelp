import { atom } from "../utils/Recoil";

const atomMainView = atom({
    key: 'mainView',
    default: "map"          // map, npc, 
});



export default atomMainView;