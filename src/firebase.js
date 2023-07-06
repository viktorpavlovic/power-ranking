import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfa7sCmHdEgxrUtRLHE6O3vU413EExKcQ",
  authDomain: "power-ranking-82547.firebaseapp.com",
  projectId: "power-ranking-82547",
  storageBucket: "power-ranking-82547.appspot.com",
  messagingSenderId: "968720235498",
  appId: "1:968720235498:web:46872ec94a03c29e67d093",
  measurementId: "G-NLH54CVGEC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
