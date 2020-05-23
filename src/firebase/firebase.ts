
import * as Firebase from 'firebase';
import firebaseConfig from './fireConfig';



const fire = Firebase.initializeApp(firebaseConfig);
const db = fire.firestore();

// db.collection('characters').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log("DOC", doc.id, doc.data());
//     })
// })




export {
    fire,
    db
}










