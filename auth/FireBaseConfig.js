// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGzC9zxDPrSNyR8hPS00RNwcNkrd5wwr8",
  authDomain: "exe201-8d936.firebaseapp.com",
  projectId: "exe201-8d936",
  storageBucket: "exe201-8d936.appspot.com",
  messagingSenderId: "233316104689",
  appId: "1:233316104689:web:43f8bb8f494934a414ac50"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);