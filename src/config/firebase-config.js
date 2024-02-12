// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7WdvJ1AICmK8dRSrO1r8UoOnyIHGBbzM",
  authDomain: "apitest-15a10.firebaseapp.com",
  projectId: "apitest-15a10",
  storageBucket: "apitest-15a10.appspot.com",
  messagingSenderId: "862005459328",
  appId: "1:862005459328:web:a443ba7ed426f50cafa965",
  measurementId: "G-9NT45PYJTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
//const analytics = getAnalytics(app);