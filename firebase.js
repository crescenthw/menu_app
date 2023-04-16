// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEa4kosqm3wYH2RYEmfF_uy0YsHGdtKbI",
  authDomain: "menuapp-d2119.firebaseapp.com",
  projectId: "menuapp-d2119",
  storageBucket: "menuapp-d2119.appspot.com",
  messagingSenderId: "717354285102",
  appId: "1:717354285102:web:ab508baa747498d14bc7bf",
  measurementId: "G-ZYRW1HBE1Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
