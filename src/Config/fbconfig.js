import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// mon web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCghn4g4CGnXC6X6e8qL5FXBhVFpPSzmQE",
    authDomain: "oumoushop-ba43b.firebaseapp.com",
    projectId: "oumoushop-ba43b",
    storageBucket: "oumoushop-ba43b.appspot.com",
    messagingSenderId: "835176101004",
    appId: "1:835176101004:web:9cfb22eeb60213a69977a9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)
  
  export {auth, db,app, storage}