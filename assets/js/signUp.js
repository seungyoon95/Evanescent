// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("button_signUp").addEventListener("click", function () {
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email_address").value;
    const password = document.getElementById("pass").value;
    const confirmPassword = document.getElementById("confirm_pass").value;
    const streetAddress = document.getElementById("street_address").value;
    const postalCode = document.getElementById("postal_code").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const userID = user.uid;

            // add user to database
            const xhttp = new XMLHttpRequest();
            // Change this for hosted server app
            const endPointRoot = "http://localhost:8888/API/users/";

            let params = `?userID=${userID}
                &userFirstName=${firstName}
                &userLastName=${lastName}
                &userEmail=${email}
                &userAddress=${streetAddress}
                &userPostalCode=${postalCode}`;

            xhttp.open("POST", endPointRoot, true);
            xhttp.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhttp.send(params);
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(`User with ID:${userID} added to the database`);
                }
            };
            // ...
            alert("Sign up successful, please sign in now!");
            window.location.href = "signIn.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            if (
                firstName.trim() == "" ||
                lastName.trim() == "" ||
                email.trim() == "" ||
                password.trim() == "" ||
                confirmPassword.trim() == ""
            ) {
                alert("Fields cannot be empty.");
            } else if (!email.includes("@") || !email.includes(".")) {
                alert("Please enter a valid email address.");
            } else if (password.length < 8 || password.length > 20) {
                alert("Password must be between 8 and 20 characters long.");
            } else if (password != confirmPassword) {
                alert("Confirm password must match your password.");
            }
        });
});

document.getElementById("button_cancel").addEventListener("click", goToSignIn);

function goToSignIn() {
    window.location.href = "signIn.html";
}