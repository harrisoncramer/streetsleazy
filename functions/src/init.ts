import { config } from "dotenv";
import { initializeApp } from "firebase/app";

const init = () => {

config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "street-easy-scraper.firebaseapp.com",
  databaseURL: "https://street-easy-scraper-default-rtdb.firebaseio.com",
  projectId: "street-easy-scraper",
  storageBucket: "street-easy-scraper.appspot.com",
  messagingSenderId: "1026774728634",
  appId: "1:1026774728634:web:d76a3326fb26a9e376a783",
};

initializeApp(firebaseConfig);

}

export default init
