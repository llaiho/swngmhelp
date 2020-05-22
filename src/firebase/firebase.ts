
import * as Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyArDT6lVcrCkZjEKHKkfQ0vdYCPJlCSlIY",
    authDomain: "swngmtool.firebaseapp.com",
    databaseURL: "https://swngmtool.firebaseio.com",
    projectId: "swngmtool",
    storageBucket: "swngmtool.appspot.com",
    messagingSenderId: "915993174088",
    appId: "1:915993174088:web:9f0bb0bdb504bc6b29387d"
  };


const fire = Firebase.initializeApp(firebaseConfig);;
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










