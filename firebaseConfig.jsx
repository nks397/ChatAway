// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoGMu9I5pVQ_uhw3G4EGEiaqu_NdsegJ8",
  authDomain: "chat-app-eccb6.firebaseapp.com",
  projectId: "chat-app-eccb6",
  storageBucket: "chat-app-eccb6.appspot.com",
  messagingSenderId: "69977714339",
  appId: "1:69977714339:web:3e069f9040f0bbbb0d9916",
//   measurementId: "G-R8QFF6RL34"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage}
