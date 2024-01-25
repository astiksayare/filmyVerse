// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDsZ-Dck6MT1D1A9VWHUHujk5OWkq0d0p0",
  authDomain: "filmyverse-a3404.firebaseapp.com",
  projectId: "filmyverse-a3404",
  storageBucket: "filmyverse-a3404.appspot.com",
  messagingSenderId: "1056175021131",
  appId: "1:1056175021131:web:2202459bc61f4eae1881ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

export const moviesRef = collection(database, "movies");
export const reviewsRef = collection(database, "reviews");
export const usersRef = collection(database, "users");

export default app;
