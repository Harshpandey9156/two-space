// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHvcAKM4HJN1x2kmYP2Sd7k6zL7DP5qnk",
  authDomain: "two-space-dating.firebaseapp.com",
  projectId: "two-space-dating",
  storageBucket: "two-space-dating.firebasestorage.app",
  messagingSenderId: "768385321845",
  appId: "1:768385321845:web:b2e9ff5778b03d19ae613c",
  measurementId: "G-MRVYTPCG1X"
  
};

console.log(firebaseConfig);


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
