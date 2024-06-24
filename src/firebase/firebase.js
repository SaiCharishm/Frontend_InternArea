// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7XYdwPpcpiLbhW6pRtJyv8ZOTnerPugE",
  authDomain: "internarea-9c487.firebaseapp.com",
  projectId: "internarea-9c487",
  storageBucket: "internarea-9c487.appspot.com",
  messagingSenderId: "1021108660088",
  appId: "1:1021108660088:web:ea6c721d1ab7f5279f4a8d",
  measurementId: "G-LE2L55PJHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider}