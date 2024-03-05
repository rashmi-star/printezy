import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';



// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyBGDf6pDZiiiEWY7G-IxT0SPB8xFM6uTJA",
    authDomain: "printezy-57526.firebaseapp.com",
    databaseURL: "https://printezy-57526-default-rtdb.firebaseio.com",
    projectId: "printezy-57526",
    storageBucket: "printezy-57526.appspot.com",
    messagingSenderId: "241848651739",
    appId: "1:241848651739:web:8a470a2a5b6fac075d61fe",
    measurementId: "G-1L3DR2Y70P"
  };
  
const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export const FIREBASE_APP=initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const Firebase_Db=getDatabase(app);






