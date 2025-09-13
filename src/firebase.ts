// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3a-cVkwPrktiXBoN1lsRxpOIcOaTfXhw",
  authDomain: "pizzatinder.firebaseapp.com",
  projectId: "pizzatinder",
  storageBucket: "pizzatinder.firebasestorage.app",
  messagingSenderId: "178250955172",
  appId: "1:178250955172:web:0e0f8886a89f0bcef7e931"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;