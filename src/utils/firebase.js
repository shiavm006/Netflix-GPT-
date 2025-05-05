// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "netflix-gpt-ff5ed.firebaseapp.com",
  projectId: "netflix-gpt-ff5ed",
  storageBucket: "netflix-gpt-ff5ed.firebasestorage.app",
  messagingSenderId: "648521269177",
  appId: "1:648521269177:web:f2ae3bc98e2e6900f2c068",
  measurementId: "G-78X9751636",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
