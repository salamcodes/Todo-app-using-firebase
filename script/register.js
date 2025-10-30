import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
    event.preventDefault()
console.log(email.value);
console.log(password.value)
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            window.location= "login.html"
        })
        .catch((error) => {
           
            const errorMessage = error.message;
            console.log(errorMessage)
        });
})
