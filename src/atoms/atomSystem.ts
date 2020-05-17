import { atom } from "../utils/Recoil";

const systemAtom = atom({
    key: 'systemAtom',
    default: null
});

console.log("SystemAtom", systemAtom);


export default systemAtom;