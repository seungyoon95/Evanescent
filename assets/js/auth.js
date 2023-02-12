// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
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
let userID;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        userID = user.uid;
        // console.log(userID);
        let signIn = document.getElementById("signInButton");
        let signUp = document.getElementById("signUpButton");
        signIn.remove();
        signUp.remove();

        let navList = document.getElementById("navList");

        let li_profile = document.createElement("li");
        let a_profile = document.createElement("a");
        a_profile.innerHTML = "Profile";
        a_profile.id = "button_profile";
        a_profile.class = "nav-link active";
        a_profile.href = "profile.html";
        li_profile.appendChild(a_profile);
        navList.appendChild(li_profile);

        let li_signOut = document.createElement("li");
        let a_signOut = document.createElement("a");
        a_signOut.innerHTML = "Sign Out";
        a_signOut.id = "button_signOut";
        a_signOut.href = "index.html";
        a_signOut.addEventListener("click", function () {
            signOut(auth).then(() => {
                console.log("Signing Out");
                window.location.href = "index.html";
            }).catch((error) => {
                // An error happened.
                console.log(error);
            });
        });
        li_signOut.appendChild(a_signOut);
        navList.appendChild(li_signOut);


    } else {
        // User is signed out
        let signOut = document.getElementById("button_signOut");
        signOut.remove();

        console.log("Not signed in");
    }
});