import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-D23MYfzWBP7od3Mu7LWubveyRD3uVp8",
  authDomain: "member-app-45820.firebaseapp.com",
  projectId: "member-app-45820",
  storageBucket: "member-app-45820.appspot.com",
  messagingSenderId: "856512268825",
  appId: "1:856512268825:web:02a4d909e5e1c8ed2ab888"
};

// Firebase app initialization
const app = initializeApp(firebaseConfig);

// Firestore initialization
const db = getFirestore(app);

// Authentication initialization
const auth = getAuth(app);

export { db, auth };
