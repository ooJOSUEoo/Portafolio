// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject   } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGfJniqED6c4iGCLtTEjstZZOUzrrHvo0",
    authDomain: "protafoliojosue.firebaseapp.com",
    projectId: "protafoliojosue",
    storageBucket: "protafoliojosue.appspot.com",
    messagingSenderId: "158255161507",
    appId: "1:158255161507:web:b22abc2703d9f9320f1f16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);
const storageRef = ref(storage, "v3/");

export{
  storage,
  ref,
  storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject 
}