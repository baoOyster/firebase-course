// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTCVfTUpPeSCaQvcDGSbjZQ8jLTmWvMA4",
  authDomain: "fir-course-55eb8.firebaseapp.com",
  projectId: "fir-course-55eb8",
  storageBucket: "fir-course-55eb8.appspot.com",
  messagingSenderId: "337305774651",
  appId: "1:337305774651:web:21f5ae62c4a0b9bd24ca1e",
  measurementId: "G-88YS0QWMPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);