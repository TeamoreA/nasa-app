import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtUVeoXZoVHM-1bB01IU2agb4ehby8Y9Y",
  authDomain: "nasa-app2020.firebaseapp.com",
  databaseURL: "https://nasa-app2020.firebaseio.com",
  projectId: "nasa-app2020",
  storageBucket: "nasa-app2020.appspot.com",
  messagingSenderId: "827053928423",
  appId: "1:827053928423:web:524747e8c2c2add48dd742",
  measurementId: "G-NPPGNLV8J2"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const asteroidsCollection = db.collection("asteroids");

// export utils/refs
export { db, auth, usersCollection, asteroidsCollection };
