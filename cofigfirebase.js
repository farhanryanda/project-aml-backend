// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKRtixa6qJIwGfstzQq5NzsfwCxIPz4jk",
  authDomain: "project-aml.firebaseapp.com",
  projectId: "project-aml",
  storageBucket: "project-aml.appspot.com",
  messagingSenderId: "730173707127",
  appId: "1:730173707127:web:8e34553772dc83f9338772",
  measurementId: "G-K8HSFECL92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
