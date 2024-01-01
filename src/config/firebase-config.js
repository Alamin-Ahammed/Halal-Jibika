import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCVwlCzUFcKFC1DWgnnywmpibcqWYb7DZo",
  authDomain: "halal-jibika-ahammed.firebaseapp.com",
  projectId: "halal-jibika-ahammed",
  storageBucket: "halal-jibika-ahammed.appspot.com",
  messagingSenderId: "929505315241",
  appId: "1:929505315241:web:2c40cdc26696b329321cb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)