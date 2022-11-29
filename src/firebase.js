// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDCrwLuMP43vpq9TTpJzlFjtrVdq5i2T6Y",
  authDomain: "d-root-labs.firebaseapp.com",
  databaseURL: "https://d-root-labs-default-rtdb.firebaseio.com",
  projectId: "d-root-labs",
  storageBucket: "d-root-labs.appspot.com",
  messagingSenderId: "549618898759",
  appId: "1:549618898759:web:950e212682943d5dbf5e62",
  measurementId: "G-5JSYX81S0N",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
