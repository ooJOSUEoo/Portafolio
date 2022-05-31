//esta es una copia del original de firebase-config.js

//usa tus credenciales de firebase y cambia el nombre del archivo a firebase-config.js



import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
    /*

        YOUR FIREBASE CONFIG GOES HERE
  
    */
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//Usar
//↓
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();


//exportar
//↓
export {
    db,
    storage,
    storageRef,
    firebase
}