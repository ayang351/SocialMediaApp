// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIEIdHCP_xpIJ3Iektys3R9uhQBlap12I",
  authDomain: "social-media-app-41ca8.firebaseapp.com",
  projectId: "social-media-app-41ca8",
  storageBucket: "social-media-app-41ca8.appspot.com",
  messagingSenderId: "814439535225",
  appId: "1:814439535225:web:255e301308cf1876693aa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//create variables that store authentication stuff

//auth will store ALL of the login information 
//the user puts that can be accessed at any time
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//initialize variable for the firestore database
export const database = getFirestore(app);