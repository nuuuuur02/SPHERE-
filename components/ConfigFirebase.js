// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLBKKycMrVL0GQac93ND_E9mOKrTNxiAY",
  authDomain: "niideapepe-45402.firebaseapp.com",
  projectId: "niideapepe-45402",
  storageBucket: "niideapepe-45402.appspot.com",
  messagingSenderId: "682919017491",
  appId: "1:682919017491:web:e3906761ae37f2d59513e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize FireStore
export const db = getFirestore(app);
export const storagebd = getStorage(app);

// Initialize Auth-Firebase
export const auth = getAuth(app);
