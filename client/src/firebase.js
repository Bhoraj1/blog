// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f01b1.firebaseapp.com",
  projectId: "mern-blog-f01b1",
  storageBucket: "mern-blog-f01b1.firebasestorage.app",
  messagingSenderId: "79789306538",
  appId: "1:79789306538:web:7370db1251ebdca73d96d3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
