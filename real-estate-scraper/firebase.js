// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "street-easy-scraper.firebaseapp.com",
  databaseURL: "https://street-easy-scraper-default-rtdb.firebaseio.com",
  projectId: "street-easy-scraper",
  storageBucket: "street-easy-scraper.appspot.com",
  messagingSenderId: "1026774728634",
  appId: "1:1026774728634:web:d76a3326fb26a9e376a783",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
