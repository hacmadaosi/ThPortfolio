// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnQb1xBvU06Ea8N7L7bnPLjxmcJlD9IUk",
  authDomain: "thportfolio-9ae4b.firebaseapp.com",
  projectId: "thportfolio-9ae4b",
  storageBucket: "thportfolio-9ae4b.firebasestorage.app",
  messagingSenderId: "516453994327",
  appId: "1:516453994327:web:4c67ee56d5ac3e54f23812",
  measurementId: "G-G9G60WPNX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
