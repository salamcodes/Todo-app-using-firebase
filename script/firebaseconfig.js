import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import {getAuth ,GoogleAuthProvider ,GithubAuthProvider } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAlWFNwTnAIBW0X69wRIMKW28yK5pbbb8",
    authDomain: "crud-todo-app-f82e7.firebaseapp.com",
    projectId: "crud-todo-app-f82e7",
    storageBucket: "crud-todo-app-f82e7.firebasestorage.app",
    messagingSenderId: "920537530971",
    appId: "1:920537530971:web:2e260210952497d350f57e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const gitProvider = new GithubAuthProvider()