// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdX2Enh3MnyUgkc_jWD5ALcfpRq6uLAE8",
  authDomain: "food-for-all-f5b23.firebaseapp.com",
  projectId: "food-for-all-f5b23",
  storageBucket: "food-for-all-f5b23.firebasestorage.app",
  messagingSenderId: "36199453599",
  appId: "1:36199453599:web:2d1cd53a7d00b1930763aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);