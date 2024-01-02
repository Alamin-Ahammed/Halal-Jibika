import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCski20Y-kR9F0wBrMtux-LpBgLD0ACJDo",
  authDomain: "halal-jibika-ahammed-b1db6.firebaseapp.com",
  projectId: "halal-jibika-ahammed-b1db6",
  storageBucket: "halal-jibika-ahammed-b1db6.appspot.com",
  messagingSenderId: "167328258584",
  appId: "1:167328258584:web:982382639f394b70e7416d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)