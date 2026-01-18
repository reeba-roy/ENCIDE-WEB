import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUmsGxpFnCo5HoSAmhR6cIqQQBExBBwRQ",
  authDomain: "encide-mace.firebaseapp.com",
  projectId: "encide-mace",
  storageBucket: "encide-mace.firebasestorage.app",
  messagingSenderId: "1061436778120",
  appId: "1:1061436778120:web:21ad93d522ad5dce93613d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
