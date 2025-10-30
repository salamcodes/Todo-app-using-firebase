import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth, provider, gitProvider } from "./firebaseconfig.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const googleBtn = document.querySelector("#google-btn");
const gitBtn = document.querySelector("#git-btn");
const fgtBtn = document.querySelector("#fgt-btn")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            window.location = "index.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
});

fgtBtn.addEventListener("click", () => {
    sendPasswordResetEmail(auth, prompt("Enter your Email"))
        .then(() => {
            alert("Email sent successfully !")
        })
        .catch((error) => {

            const errorMessage = error.message;
            console.log(errorMessage)
        });
});

googleBtn.addEventListener("click", () => {

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user)
            console.log(token)
            window.location = "index.html"

        }).catch((error) => {
            // Handle Errors here.

            const errorMessage = error.message;
            console.log(errorMessage)

        });

});

gitBtn.addEventListener("click", () => {
    signInWithPopup(auth, gitProvider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            console.log(user , token);
            window.location = "index.html";

        }).catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
           console.log(errorMessage , email)
        });

})